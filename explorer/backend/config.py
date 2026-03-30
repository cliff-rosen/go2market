from pydantic_settings import BaseSettings
from pathlib import Path
from dotenv import load_dotenv
import os

_backend_dir = Path(__file__).resolve().parent
load_dotenv(_backend_dir / ".env", override=True)


class Settings(BaseSettings):
    APP_NAME: str = "Community API Explorer"

    # Reddit OAuth2 — register at https://www.reddit.com/prefs/apps
    REDDIT_CLIENT_ID: str = os.getenv("REDDIT_CLIENT_ID", "")
    REDDIT_CLIENT_SECRET: str = os.getenv("REDDIT_CLIENT_SECRET", "")
    REDDIT_USER_AGENT: str = os.getenv(
        "REDDIT_USER_AGENT", "CommunityExplorer/0.1 by go2market"
    )

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:5174"]

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"


settings = Settings()
