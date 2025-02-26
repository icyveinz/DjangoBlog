import os
from pydantic import BaseModel

class Settings(BaseModel):
    secret_key: str
    database_url: str

    @classmethod
    def load(cls) -> "Settings":
        return cls(
            secret_key=os.getenv("SECRET_KEY"),
            database_url=os.getenv("DATABASE_URL"),
        )

# Load settings manually
settings = Settings.load()

# Usage example
print(settings.secret_key)
print(settings.database_url)

