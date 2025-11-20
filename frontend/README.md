# AI Architecture Visualizer - Frontend

React frontend for the AI Architectural Visualizer.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

## Features

- Upload architectural sketches, CAD drawings, or 3D massing models
- Choose between three ControlNet modes:
  - **Scribble**: For hand-drawn sketches
  - **Canny**: For clean CAD lines
  - **Depth**: For 3D volumetric studies
- Enter custom prompts to describe materials, lighting, and atmosphere
- View and download photorealistic renders

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repo at [vercel.com](https://vercel.com)

### Netlify

1. Build the app: `npm run build`
2. Drag the `build` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## Configuration

The backend API URL is hardcoded to `http://localhost:8000`. For production:

1. Create a `.env` file:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

2. Update `App.js`:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
   const response = await axios.post(`${API_URL}/generate-render`, formData);
   ```
