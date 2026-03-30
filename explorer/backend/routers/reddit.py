"""
Reddit API Router — proxy for Reddit's OAuth2 API.

Handles token acquisition (client_credentials flow) and exposes
search + subreddit browsing endpoints.
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import httpx
import logging
from datetime import datetime

from config import settings
from schemas.common import ContentItem

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/reddit", tags=["reddit"])

# Module-level token cache
_token: Optional[str] = None
_token_expires: float = 0


async def _get_token() -> str:
    """Acquire or reuse a Reddit OAuth2 access token (client_credentials)."""
    global _token, _token_expires
    import time

    if _token and time.time() < _token_expires - 60:
        return _token

    if not settings.REDDIT_CLIENT_ID or not settings.REDDIT_CLIENT_SECRET:
        raise HTTPException(
            status_code=503,
            detail="Reddit credentials not configured. Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET in .env",
        )

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "https://www.reddit.com/api/v1/access_token",
            data={"grant_type": "client_credentials"},
            auth=(settings.REDDIT_CLIENT_ID, settings.REDDIT_CLIENT_SECRET),
            headers={"User-Agent": settings.REDDIT_USER_AGENT},
        )
        if resp.status_code != 200:
            logger.error(f"Reddit token error: {resp.status_code} {resp.text}")
            raise HTTPException(status_code=502, detail="Failed to authenticate with Reddit")

        body = resp.json()
        _token = body["access_token"]
        _token_expires = time.time() + body.get("expires_in", 3600)
        return _token


async def _reddit_get(path: str, params: dict | None = None) -> dict:
    """Make an authenticated GET to oauth.reddit.com."""
    token = await _get_token()
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"https://oauth.reddit.com{path}",
            params=params,
            headers={
                "Authorization": f"Bearer {token}",
                "User-Agent": settings.REDDIT_USER_AGENT,
            },
        )
        if resp.status_code != 200:
            logger.error(f"Reddit API error: {resp.status_code} {resp.text}")
            raise HTTPException(status_code=resp.status_code, detail=f"Reddit API error: {resp.text}")
        return resp.json()


def _post_to_item(post: dict, subreddit: str = "") -> ContentItem:
    """Convert a Reddit post (t3) data dict to ContentItem."""
    d = post["data"] if "data" in post else post
    created = datetime.utcfromtimestamp(d.get("created_utc", 0)).isoformat() + "Z"
    sr = d.get("subreddit", subreddit)
    return ContentItem(
        source="reddit",
        platform_id=f"reddit:r/{sr}:{d.get('id', '')}",
        url=f"https://reddit.com{d.get('permalink', '')}",
        author=d.get("author", "[deleted]"),
        text=d.get("selftext", "") or d.get("body", ""),
        title=d.get("title"),
        community=f"r/{sr}",
        timestamp=created,
        context=d.get("link_title"),
        score=d.get("score", 0),
        num_comments=d.get("num_comments", 0),
    )


@router.get("/subreddits/search")
async def search_subreddits(
    q: str = Query(..., description="Topic or keyword to find subreddits for"),
    sort: str = Query("relevance", description="Sort: relevance or activity"),
    limit: int = Query(25, ge=1, le=100),
) -> dict:
    """Discover subreddits matching a topic. Returns name, subscribers, description, activity."""
    raw = await _reddit_get("/subreddits/search", {
        "q": q,
        "sort": sort,
        "limit": limit,
        "sr_detail": "true",
    })
    children = raw.get("data", {}).get("children", [])
    subreddits = []
    for c in children:
        d = c.get("data", {})
        subreddits.append({
            "name": d.get("display_name", ""),
            "title": d.get("title", ""),
            "description": (d.get("public_description") or "")[:300],
            "subscribers": d.get("subscribers", 0),
            "active_users": d.get("accounts_active", 0),
            "created_utc": d.get("created_utc", 0),
            "url": f"https://reddit.com{d.get('url', '')}",
            "over18": d.get("over18", False),
        })
    return {"raw": raw, "subreddits": subreddits, "count": len(subreddits)}


@router.get("/search")
async def search(
    q: str = Query(..., description="Search query"),
    subreddit: Optional[str] = Query(None, description="Limit to subreddit (without r/)"),
    sort: str = Query("relevance", description="Sort: relevance, hot, top, new, comments"),
    time_filter: str = Query("week", description="Time: hour, day, week, month, year, all"),
    limit: int = Query(25, ge=1, le=100),
) -> dict:
    """Search Reddit posts by keyword, optionally scoped to a subreddit."""
    path = f"/r/{subreddit}/search" if subreddit else "/search"
    params = {
        "q": q,
        "sort": sort,
        "t": time_filter,
        "limit": limit,
        "restrict_sr": "true" if subreddit else "false",
        "type": "link",
    }
    raw = await _reddit_get(path, params)
    children = raw.get("data", {}).get("children", [])
    items = [_post_to_item(c) for c in children]
    return {"raw": raw, "items": [i.model_dump() for i in items], "count": len(items)}


@router.get("/subreddit/{subreddit}/new")
async def subreddit_new(
    subreddit: str,
    limit: int = Query(25, ge=1, le=100),
) -> dict:
    """Get newest posts from a subreddit."""
    raw = await _reddit_get(f"/r/{subreddit}/new", {"limit": limit})
    children = raw.get("data", {}).get("children", [])
    items = [_post_to_item(c, subreddit) for c in children]
    return {"raw": raw, "items": [i.model_dump() for i in items], "count": len(items)}


@router.get("/subreddit/{subreddit}/hot")
async def subreddit_hot(
    subreddit: str,
    limit: int = Query(25, ge=1, le=100),
) -> dict:
    """Get hot posts from a subreddit."""
    raw = await _reddit_get(f"/r/{subreddit}/hot", {"limit": limit})
    children = raw.get("data", {}).get("children", [])
    items = [_post_to_item(c, subreddit) for c in children]
    return {"raw": raw, "items": [i.model_dump() for i in items], "count": len(items)}


@router.get("/comments/{post_id}")
async def get_comments(
    post_id: str,
    subreddit: str = Query(..., description="Subreddit the post belongs to"),
    limit: int = Query(50, ge=1, le=200),
) -> dict:
    """Get comment tree for a post."""
    raw = await _reddit_get(
        f"/r/{subreddit}/comments/{post_id}",
        {"limit": limit, "depth": 3},
    )
    return {"raw": raw}
