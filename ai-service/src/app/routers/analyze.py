from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Optional
from app.services.yolo_inference import yolo_inference
from app.services.scoring import scoring_service
from app.core.config import get_settings
from app.core.logging import logger

router = APIRouter()
settings = get_settings()


@router.post("/analyze")
async def analyze_images(
    inspectionId: str = Form(...),
    plate: str = Form(...),
    vin: str = Form(...),
    vehicleLabel: Optional[str] = Form(None),
    images: List[UploadFile] = File(None),
    imageUrls: List[str] = Form(None),
):
    """
    Analyze vehicle images for damage detection
    
    Accepts either uploaded files or image URLs
    """
    try:
        # Collect all images (files + URLs)
        all_images = []
        
        if images:
            all_images.extend(images)
        
        if imageUrls:
            all_images.extend(imageUrls)
        
        if not all_images:
            raise HTTPException(status_code=400, detail="No images provided")
        
        if len(all_images) > settings.MAX_IMAGES_PER_REQUEST:
            raise HTTPException(
                status_code=400,
                detail=f"Too many images. Maximum {settings.MAX_IMAGES_PER_REQUEST} allowed"
            )
        
        logger.info(f"Processing {len(all_images)} images for inspection {inspectionId}")
        
        # Run YOLO inference
        detections = await yolo_inference.process_images(all_images)
        
        logger.info(f"Found {len(detections)} damages")
        
        # Calculate metrics
        avg_confidence = (
            sum(d["confidence"] for d in detections) / len(detections)
            if detections
            else 0.0
        )
        
        score = scoring_service.calculate_score(detections)
        
        # Build damage results with severity
        damages = [
            {
                "class": d["class"],
                "severity": scoring_service.calculate_severity(d["class"], d["confidence"]),
                "confidence": d["confidence"],
                "bbox": d["bbox"],
            }
            for d in detections
        ]
        
        # Build VCT metadata
        vct_metadata = scoring_service.build_vct_metadata(
            inspection_id=inspectionId,
            plate=plate,
            vin=vin,
            vehicle_label=vehicleLabel or "",
            detections=detections,
            score=score,
        )
        
        return {
            "inspectionId": inspectionId,
            "plate": plate,
            "vin": vin,
            "totalDamages": len(detections),
            "avgConfidence": round(avg_confidence, 3),
            "score": score,
            "damages": damages,
            "vctMetadata": vct_metadata,
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing images: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
