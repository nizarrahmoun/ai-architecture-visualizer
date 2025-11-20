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

## 🚢 Deployment on Vercel

This project is configured for a **monorepo deployment** on Vercel.

1.  **Install Vercel CLI** (optional, or use the web dashboard):
    ```bash
    npm install -g vercel
    ```

2.  **Deploy**:
    Run the following command from the root directory:
    ```bash
    vercel
    ```

3.  **Environment Variables**:
    In your Vercel Project Settings, add the following environment variables:
    - `NVIDIA_API_KEY`: Your NVIDIA API key.
    - `REACT_APP_API_URL`: Set this to `/api` (or your full production URL + `/api`).

    *Note: The `vercel.json` file automatically configures the routing so that `/api/*` requests are handled by the Python backend and all other requests are served by the React frontend.*

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
