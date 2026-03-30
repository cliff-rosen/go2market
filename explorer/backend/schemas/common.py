from pydantic import BaseModel
from typing import Optional


class ContentItem(BaseModel):
    """Normalized content item matching the format from outreach-conversation-first.md"""
    source: str
    platform_id: str
    url: str
    author: str
    text: str
    title: Optional[str] = None
    community: str
    timestamp: str
    context: Optional[str] = None
    score: Optional[int] = None
    num_comments: Optional[int] = None
