FROM python:3.11-slim
WORKDIR /app
COPY ai-service /app
RUN pip install --no-cache-dir -e .
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
