# AI Architecture Visualizer 🏗️✨

Transform architectural sketches into photorealistic renders using **Stable Diffusion with ControlNet**.

![Architecture Visualizer](https://img.shields.io/badge/AI-Architecture-blue) ![Python](https://img.shields.io/badge/Python-3.11-green) ![React](https://img.shields.io/badge/React-18-61DAFB)

## 🎯 Overview

This SaaS application uses cutting-edge AI technology (ControlNet + Stable Diffusion XL) to generate professional architectural visualizations from:
- Hand-drawn sketches
- CAD line drawings (DXF/DWG exports)
- 3D massing models
- Conceptual diagrams

**Key Features:**
- 🎨 Three ControlNet modes (Scribble, Canny, Depth)
- 🚀 Fast cloud-based inference via Replicate API
- 💡 Smart prompt engineering for architectural quality
- 📱 Modern, responsive UI with real-time preview
- 📥 Download high-resolution renders

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  React Frontend │─────▶│  FastAPI Backend │─────▶│  Replicate API  │
│  (Port 3000)    │      │   (Port 8000)    │      │  (ControlNet)   │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Replicate API account ([Get token here](https://replicate.com/account/api-tokens))

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env and add your REPLICATE_API_TOKEN

# Run server
python main.py
```

Backend runs at: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs at: `http://localhost:3000`

## 📖 Usage

1. **Upload** your architectural sketch/drawing
2. **Select** the appropriate ControlNet mode:
   - **Scribble**: Hand-drawn sketches and loose drawings
   - **Canny**: Clean CAD lines and technical drawings
   - **Depth**: 3D massing models and volumetric studies
3. **Describe** your desired style (materials, lighting, atmosphere)
4. **Generate** and download your photorealistic render

### Example Prompts

```
✅ "Modern minimalist villa, white concrete facade, floor-to-ceiling windows, 
    sunset lighting, landscaped garden with infinity pool"

✅ "Traditional Japanese house, natural wood exterior, sliding shoji screens, 
    zen garden with gravel and rocks, soft morning light"

✅ "Contemporary office building, glass and steel construction, LED accent 
    lighting, urban plaza with water features, blue hour photography"
```

## 🎨 ControlNet Modes Explained

| Mode | Best For | Use Case |
|------|----------|----------|
| **Scribble** | Hand sketches | Quick concept drawings, napkin sketches |
| **Canny** | CAD drawings | Precise architectural plans, technical drawings |
| **Depth** | 3D models | Massing studies, volumetric block models |

## 📡 API Reference

### `POST /generate-render`

Generate architectural render from sketch.

**Request:**
```bash
curl -X POST http://localhost:8000/generate-render \
  -F "file=@sketch.jpg" \
  -F "prompt=modern glass villa with pool" \
  -F "control_type=scribble"
```

**Response:**
```json
{
  "status": "success",
  "image_url": "https://replicate.delivery/...",
  "prompt_used": "modern glass villa with pool, architectural photography..."
}
```

**Parameters:**
- `file` (required): Image file (jpg, png)
- `prompt` (required): Style description
- `control_type` (optional): `scribble` | `canny` | `depth` (default: `scribble`)

## 🚢 Deployment

### Backend: Render.com

1. Create new **Web Service**
2. Connect GitHub repository
3. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variable: `REPLICATE_API_TOKEN`
5. Deploy! 🎉

### Backend: Google Cloud Run

```bash
cd backend

# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT/arch-visualizer
gcloud run deploy arch-visualizer \
  --image gcr.io/YOUR_PROJECT/arch-visualizer \
  --platform managed \
  --region us-central1 \
  --set-env-vars REPLICATE_API_TOKEN=your_token
```

### Frontend: Vercel

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or connect GitHub repo at vercel.com
```

### Frontend: Netlify

```bash
cd frontend

# Build
npm run build

# Deploy
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 🔧 Advanced Configuration

### Custom ControlNet Models

Edit `backend/main.py` to use different models:

```python
# For ultra-realistic architectural renders
output = replicate.run(
    "jagilley/controlnet-canny:aff48af9c68d162388d230a2ab003f68d2638d88307bdaf1c2f1ac95079c9613",
    input={...}
)

# For artistic interpretations
output = replicate.run(
    "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
    input={...}
)
```

### Enhanced Prompt Engineering

Modify the prompt enhancement in `main.py`:

```python
enhanced_prompt = (
    f"{prompt}, "
    f"architectural photography, professional render, "
    f"8k resolution, unreal engine 5, octane render, "
    f"volumetric lighting, raytracing, hyperrealistic, "
    f"award-winning architecture, archviz, "
    f"({style_keywords}:1.2)"  # Boost specific keywords
)
```

### Production Environment Variables

Create `.env` file:

```bash
# Backend
REPLICATE_API_TOKEN=r8_xxx
ALLOWED_ORIGINS=https://yourfrontend.vercel.app
MAX_FILE_SIZE=10485760  # 10MB

# Frontend
REACT_APP_API_URL=https://your-backend.onrender.com
```

## 💰 Cost Estimation

Using Replicate API:
- **Cost**: ~$0.006 per image generation
- **Speed**: 20-30 seconds per render
- **Free tier**: $10 credit (≈1,600 renders)

For production:
- **Low volume** (< 1000/month): Replicate API
- **High volume** (> 10,000/month): Self-hosted GPU (RunPod, Lambda Labs)

## 🛠️ Tech Stack

**Backend:**
- FastAPI (Python web framework)
- Replicate (AI model inference)
- python-multipart (File upload handling)

**Frontend:**
- React 18
- Axios (HTTP client)
- Tailwind CSS (Styling)

**AI/ML:**
- Stable Diffusion XL
- ControlNet (Scribble/Canny/Depth)
- Replicate API

## 📝 Troubleshooting

### "Failed to generate image"
- ✅ Check `REPLICATE_API_TOKEN` is set correctly
- ✅ Ensure you have Replicate credits
- ✅ Try a different ControlNet mode

### CORS errors
- ✅ Check backend `allow_origins` includes your frontend URL
- ✅ Verify backend is running on port 8000

### Slow generation
- ⏱️ Normal: 20-30 seconds per render
- 🚀 Use smaller images (< 2MB) for faster processing
- 💡 Consider caching common requests

## 🎓 Learning Resources

- [ControlNet Paper](https://arxiv.org/abs/2302.05543)
- [Stable Diffusion Guide](https://stable-diffusion-art.com/controlnet/)
- [Architectural Prompting](https://www.reddit.com/r/StableDiffusion/wiki/architectural-rendering/)

## 📜 License

MIT License - feel free to use for commercial projects!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 🌟 Show Your Support

If this helped you build your architectural visualizer, give it a star! ⭐

---

**Built with ❤️ for architects and designers**
