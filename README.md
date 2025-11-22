# Studio AI - Italian Architecture Visualizer 🏛️✨

A world-class architectural visualization tool featuring a premium "Italian Architecture" aesthetic. Transform sketches into photorealistic renders using NVIDIA's advanced AI models (Flux.1 / SDXL).

![Studio AI](https://img.shields.io/badge/Studio-AI-D4AF37) ![NVIDIA](https://img.shields.io/badge/NVIDIA-AI-76B900) ![React](https://img.shields.io/badge/React-18-61DAFB) ![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)

## 🎨 Design Philosophy

The frontend is designed with a "World Class Italian Architecture" theme:
- **Typography**: Cinzel (Display), Cormorant Garamond (Body), Montserrat (UI).
- **Palette**: Italian Cream, Marble, Olive, Terracotta, Gold, Charcoal.
- **UX**: Smooth Framer Motion animations, marble textures, and a premium editorial layout.

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  React Frontend │─────▶│  FastAPI Backend │─────▶│   NVIDIA API    │
│  (Vercel Static)│      │ (Vercel Function)│      │  (Flux / SDXL)  │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- NVIDIA API Key ([Get it here](https://build.nvidia.com/explore/discover))

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
# Create a .env file in backend/ with:
# NVIDIA_API_KEY=nvapi-xxxxxxxx...

# Run server
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000` (API at `/api`)

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs at: `http://localhost:3000`

## 🚢 Deployment

### Frontend: Netlify

1.  **Deploy via Netlify CLI**:
    ```bash
    # Install Netlify CLI
    npm install -g netlify-cli

    # Login to Netlify
    netlify login

    # Deploy from root directory
    netlify deploy --prod
    ```

2.  **Deploy via Netlify Dashboard**:
    - Go to [netlify.com](https://netlify.com) and connect your GitHub repository
    - Build settings are auto-configured via `netlify.toml`
    - Add environment variable: `REACT_APP_API_URL` (set to your backend URL + `/api`)

### Backend: Render.com

1.  **Create a Web Service** on [render.com](https://render.com):
    - Connect your GitHub repository
    - **Root Directory**: `backend`
    - **Build Command**: `pip install -r requirements.txt`
    - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2.  **Add Environment Variable**:
    - `NVIDIA_API_KEY`: Your NVIDIA API key

3.  **Update `netlify.toml`**:
    - Replace `https://your-backend-url.onrender.com` with your actual Render backend URL

### Alternative Backend: Railway.app

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
cd backend
railway up
```

## 📖 Usage

1. **Upload** your architectural sketch/drawing.
2. **Select** the control mode (Scribble, Technical, Volume).
3. **Describe** your vision (materials, lighting, atmosphere).
4. **Unlock** the generator (Ad-supported gate).
5. **Generate** and download your masterpiece.

## 🛠️ Tech Stack

**Backend:**
- FastAPI
- NVIDIA AI Endpoints (Flux.1-Kontext / Stable Diffusion XL)
- Python Multipart

**Frontend:**
- React 18
- Tailwind CSS (Custom Italian Theme)
- Framer Motion
- Lucide React

## 📜 License

MIT License
