import os
from pathlib import Path

from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    GOOGLE_API_KEY: str = ""
    DATABASE_URL: str = ""
    API_PORT: str = "5005"

    model_config = {
        "env_file": os.path.join(BASE_DIR, ".env"),
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


settings = Settings()


if not settings.DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set or is empty")
