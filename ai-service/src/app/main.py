from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import get_settings
from app.core.logging import logger
from app.routers import health, analyze
from app.services.yolo_loader import yolo_model

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager - load model on startup"""
    logger.info("Starting AI Service...")
    
    # Load YOLO model on startup
    try:
        yolo_model.load_model()
        logger.info("YOLO model loaded successfully")
    except Exception as e:
        logger.error(f"Failed to load YOLO model: {e}")
    
    yield
    
    logger.info("Shutting down AI Service...")


# Create FastAPI app
app = FastAPI(
    title="HydraAI Inspect - AI Service",
    description="YOLO-based vehicle damage detection service",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
origins = settings.CORS_ORIGINS.split(",") if settings.CORS_ORIGINS != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(analyze.router, tags=["Analysis"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "HydraAI Inspect - AI Service",
        "version": "1.0.0",
        "status": "running",
        "modelLoaded": yolo_model.is_loaded,
    }
