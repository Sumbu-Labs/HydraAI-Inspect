from fastapi import APIRouter
from app.services.yolo_loader import yolo_model

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "modelLoaded": yolo_model.is_loaded,
    }
