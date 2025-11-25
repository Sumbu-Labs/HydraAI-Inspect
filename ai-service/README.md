# HydraAI Inspect - AI Service

FastAPI microservice for vehicle damage detection using YOLOv8.

## 🚀 Features

- YOLOv8 inference for damage detection
- Damage severity scoring
- VCT (Vehicle Condition Token) metadata generation
- Async image processing
- Health monitoring

## 🛠️ Setup

### Prerequisites

- Python 3.10+
- YOLOv8 model file (`car_damage_yolo.pt`) placed in `models/` directory

### Installation

```bash
# Install dependencies
pip install .

# Copy environment file
cp .env.example .env
```

### Environment Variables

```env
YOLO_MODEL_PATH=./models/car_damage_yolo.pt
MAX_IMAGES_PER_REQUEST=6
CONFIDENCE_THRESHOLD=0.4
CORS_ORIGINS=*
LOG_LEVEL=INFO
```

## 🏃 Running

### Development

```bash
uvicorn app.main:app --reload --port 8000
```

### Docker

```bash
docker build -t hydra-ai-service .
docker run -p 8000:8000 -v $(pwd)/models:/app/models hydra-ai-service
```

## 📡 API Endpoints

### Health Check
`GET /health`
Returns service status and model loaded state.

### Analyze
`POST /analyze`
Multipart form data:
- `inspectionId`: string
- `plate`: string
- `vin`: string
- `images`: file[] (optional)
- `imageUrls`: string[] (optional)

Returns JSON with detections, scores, and VCT metadata.
