from typing import List, Dict, Any
import numpy as np
from PIL import Image
import io
import requests
from app.services.yolo_loader import yolo_model
from app.core.config import get_settings
from app.core.logging import logger

settings = get_settings()


class YOLOInference:
    """YOLO inference service"""
    
    def __init__(self):
        self.model = yolo_model.model
        self.confidence_threshold = settings.CONFIDENCE_THRESHOLD
    
    async def process_images(self, images: List[Any]) -> List[Dict]:
        """
        Process multiple images through YOLO
        
        Args:
            images: List of image files or URLs
            
        Returns:
            List of detection results
        """
        all_detections = []
        
        for idx, image in enumerate(images):
            try:
                # Load image
                img = await self._load_image(image)
                
                # Run inference
                results = self.model(img, conf=self.confidence_threshold)
                
                # Parse results
                detections = self._parse_results(results[0], image_index=idx)
                all_detections.extend(detections)
                
            except Exception as e:
                logger.error(f"Error processing image {idx}: {e}")
                continue
        
        return all_detections
    
    async def _load_image(self, image: Any) -> Image.Image:
        """Load image from file or URL"""
        if isinstance(image, str):
            # URL
            response = requests.get(image)
            return Image.open(io.BytesIO(response.content))
        else:
            # File upload
            contents = await image.read()
            return Image.open(io.BytesIO(contents))
    
    def _parse_results(self, result, image_index: int) -> List[Dict]:
        """Parse YOLO results into structured format"""
        detections = []
        
        if result.boxes is None or len(result.boxes) == 0:
            return detections
        
        for box in result.boxes:
            # Get bounding box coordinates
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
            
            # Get class and confidence
            class_id = int(box.cls[0].cpu().numpy())
            confidence = float(box.conf[0].cpu().numpy())
            class_name = result.names[class_id]
            
            detection = {
                "class": class_name,
                "confidence": confidence,
                "bbox": {
                    "x": float(x1),
                    "y": float(y1),
                    "width": float(x2 - x1),
                    "height": float(y2 - y1),
                },
                "imageIndex": image_index,
            }
            
            detections.append(detection)
        
        return detections


# Global instance
yolo_inference = YOLOInference()
