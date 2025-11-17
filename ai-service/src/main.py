from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas.inference import InferenceRequest, InferenceResponse
from .services.inference import run_inference

app = FastAPI(title="HydraAI AI Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"]
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/inference", response_model=InferenceResponse)
def inference_endpoint(payload: InferenceRequest) -> InferenceResponse:
    return run_inference(payload)
