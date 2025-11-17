from ..schemas.inference import InferenceRequest, InferenceResponse


def run_inference(payload: InferenceRequest) -> InferenceResponse:
    # TODO: load YOLOv8 and run inference.
    return InferenceResponse(
        score=0.95,
        labels=["demo"],
        artifact_url=payload.artifact_url
    )
