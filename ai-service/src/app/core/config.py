from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # Model Configuration
    YOLO_MODEL_PATH: str = "./models/car_damage_yolo.pt"
    CONFIDENCE_THRESHOLD: float = 0.4
    MAX_IMAGES_PER_REQUEST: int = 6
    
    # Server Configuration
    CORS_ORIGINS: str = "*"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings()
