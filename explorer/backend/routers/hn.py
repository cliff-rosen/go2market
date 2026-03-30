"""
Hacker News API Router — proxy for HN's Algolia and Firebase APIs.

No auth required. Two endpoints:
  - Algolia search (full-text, date-sorted)
  - Firebase lists (top, new, best stories)
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import httpx
import logging
from datetime import datetime

from schemas.common import ContentItem

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/hn", tags=["hn"])

ALGOLIA_BASE = "https://hn.algolia.com/api/v1"
FIREBASE_BASE = "https://hacker-news.firebaseio.com/v0"


def _hit_to_item(hit: dict) -> ContentItem:
    """Convert an Algolia hit to ContentItem."""
    created = hit.get("created_at", "")
    object_id = hit.get("objectID", "")
    story_id = hit.get("story_id") or object_id
    is_comment = hit.get("_tags", []) and "comment" in hit.get("_tags", [])

    return ContentItem(
        source="hn",
        platform_id=f"hn:{object_id}",
        url=hit.get("url") or f"https://news.ycombinator.com/item?id={object_id}",
        author=hit.get("author", ""),
        text=hit.get("comment_text") or hit.get("story_text") or "",
        title=hit.get("title"),
        community="HN",
        timestamp=created,
        context=hit.get("story_title") if is_comment else None,
        score=hit.get("points"),
        num_comments=hit.get("num_comments"),
    )


@router.get("/search")
async def search(
    q: str = Query(..., description="Search query"),
    sort: str = Query("relevance", description="Sort: relevance or date"),
    time_range: Optional[str] = Query(None, description="Filter: last_24h, past_week, past_month"),
    tags: Optional[str] = Query(None, description="Filter: story, comment, ask_hn, show_hn"),
    limit: int = Query(25, ge=1, le=100),
) -> dict:
    """Search HN via Algolia. Supports stories, comments, Ask HN, Show HN."""
    endpoint = "search" if sort == "relevance" else "search_by_date"
    params: dict = {"query": q, "hitsPerPage": limit}

    if tags:
        params["tags"] = tags

    if time_range:
        import time as _time
        now = int(_time.time())
        ranges = {
            "last_24h": now - 86400,
            "past_week": now - 604800,
            "past_month": now - 2592000,
        }
        if time_range in ranges:
            params["numericFilters"] = f"created_at_i>{ranges[time_range]}"

    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{ALGOLIA_BASE}/{endpoint}", params=params)
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail=f"Algolia error: {resp.text}")
        raw = resp.json()

    hits = raw.get("hits", [])
    items = [_hit_to_item(h) for h in hits]
    return {"raw": raw, "items": [i.model_dump() for i in items], "count": len(items)}


@router.get("/top")
async def top_stories(
    limit: int = Query(25, ge=1, le=100),
) -> dict:
    """Get current top stories from HN Firebase API."""
    return await _fetch_story_list("topstories", limit)


@router.get("/new")
async def new_stories(
    limit: int = Query(25, ge=1, le=100),
) -> dict:
    """Get newest stories from HN Firebase API."""
    return await _fetch_story_list("newstories", limit)


@router.get("/best")
async def best_stories(
    limit: int = Query(25, ge=1, le=100),
) -> dict:
    """Get best stories from HN Firebase API."""
    return await _fetch_story_list("beststories", limit)


@router.get("/item/{item_id}")
async def get_item(item_id: int) -> dict:
    """Get a single HN item (story or comment) with its kids."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{FIREBASE_BASE}/item/{item_id}.json")
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="Firebase error")
        item = resp.json()
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"raw": item}


async def _fetch_story_list(list_name: str, limit: int) -> dict:
    """Fetch a story ID list from Firebase, then hydrate the first N items."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{FIREBASE_BASE}/{list_name}.json")
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="Firebase error")
        ids = resp.json()[:limit]

        items = []
        for story_id in ids:
            r = await client.get(f"{FIREBASE_BASE}/item/{story_id}.json")
            if r.status_code == 200 and r.json():
                story = r.json()
                created = datetime.utcfromtimestamp(story.get("time", 0)).isoformat() + "Z"
                items.append(
                    ContentItem(
                        source="hn",
                        platform_id=f"hn:{story_id}",
                        url=story.get("url", f"https://news.ycombinator.com/item?id={story_id}"),
                        author=story.get("by", ""),
                        text=story.get("text", ""),
                        title=story.get("title"),
                        community="HN",
                        timestamp=created,
                        score=story.get("score"),
                        num_comments=story.get("descendants"),
                    ).model_dump()
                )

    return {"items": items, "count": len(items), "ids": ids}
