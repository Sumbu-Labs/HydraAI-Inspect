from pydantic import BaseModel, HttpUrl


class InferenceRequest(BaseModel):
    artifact_url: HttpUrl


class InferenceResponse(BaseModel):
    score: float
    labels: list[str]
    artifact_url: HttpUrl
