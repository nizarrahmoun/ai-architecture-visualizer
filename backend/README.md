# AI Architecture Visualizer - Backend

FastAPI backend for the AI Architectural Visualizer using Stable Diffusion with ControlNet.

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure API Token:**
   - Copy `.env.example` to `.env`
   - Get your Replicate API token from https://replicate.com/account/api-tokens
   - Add it to `.env`:
     ```
     REPLICATE_API_TOKEN=your_actual_token_here
     ```

3. **Run the server:**
   ```bash
   python main.py
   ```
   
   Or with uvicorn:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Endpoints

### `POST /generate-render`

Generate an architectural render from a sketch.

**Parameters:**
- `file` (file): The sketch/drawing image
- `prompt` (string): Description of the desired style
- `control_type` (string, optional): Type of ControlNet (`scribble`, `canny`, `depth`)

**Response:**
```json
{
  "status": "success",
  "image_url": "https://...",
  "prompt_used": "Enhanced prompt..."
}
```

## Deployment

### Option 1: Render.com
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `REPLICATE_API_TOKEN`

### Option 2: Google Cloud Run
1. Create `Dockerfile`:
   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
   ```
2. Deploy: `gcloud run deploy`

## ControlNet Models

- **scribble**: Best for hand-drawn sketches
- **canny**: Best for clean CAD lines
- **depth**: Best for 3D massing models
