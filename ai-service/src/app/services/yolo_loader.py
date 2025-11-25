import torch
from ultralytics import YOLO
from app.core.config import get_settings
from app.core.logging import logger
from pathlib import Path

settings = get_settings()


class YOLOModel:
    """Singleton YOLO model loader"""
    _instance = None
    _model = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def load_model(self):
        """Load YOLO model from disk"""
        if self._model is not None:
            logger.info("Model already loaded")
            return self._model
        
        model_path = Path(settings.YOLO_MODEL_PATH)
        
        if not model_path.exists():
            logger.error(f"Model file not found: {model_path}")
            raise FileNotFoundError(f"YOLO model not found at {model_path}")
        
        logger.info(f"Loading YOLO model from {model_path}")
        
        try:
            self._model = YOLO(str(model_path))
            logger.info(f"Model loaded successfully. Device: {self._model.device}")
            return self._model
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            raise
    
    @property
    def model(self):
        """Get the loaded model"""
        if self._model is None:
            return self.load_model()
        return self._model
    
    @property
    def is_loaded(self) -> bool:
        """Check if model is loaded"""
        return self._model is not None


# Global instance
yolo_model = YOLOModel()
