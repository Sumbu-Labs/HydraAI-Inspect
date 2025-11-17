from src.schemas.inference import InferenceRequest
from src.services.inference import run_inference


def test_run_inference_returns_placeholder():
    payload = InferenceRequest(artifact_url="https://example.com/artifact.jpg")
    result = run_inference(payload)
    assert result.score == 0.95
