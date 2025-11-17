# AI Model Notes

- Core model: custom YOLOv8 trained to detect defects on inspected objects.
- Training dataset combines internal assets and open-source datasets, normalized to 640x640 resolution.
- `.pt` files are excluded from git. Use a bootstrap script (TODO) to download from S3/B2.
- Track model versions under `ai-service/src/models/model-manifest.json` so the backend knows the active hash.
- Capture experiments or additional hyperparameters here to keep Catalyst stakeholders in sync.
