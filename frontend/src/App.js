import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, Wand2, Download, Loader2, Layers, PenTool, Box } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [controlType, setControlType] = useState("scribble");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adCompleted, setAdCompleted] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleAdClick = () => {
    window.open("https://smrturl.co/a568170", "_blank");
    // Simulate verification delay
    setTimeout(() => {
      setAdCompleted(true);
    }, 2000);
  };

  const handleSubmit = async () => {
    if (!adCompleted) {
      setError("Please complete the verification step first.");
      return;
    }
    if (!file || !prompt) {
      setError("Please provide both a file and a prompt");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);
    formData.append("control_type", controlType);

    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const response = await axios.post(`${apiUrl}/generate-render`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const imageData = response.data.image_data || response.data.image_url;
      setGeneratedImage(imageData);
    } catch (error) {
      console.error("Error generating render:", error);
      setError(error.response?.data?.detail || "Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${generatedImage}`;
      link.download = 'architectural-render.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] opacity-5 bg-cover bg-center fixed pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-6 border border-blue-500/20 backdrop-blur-sm">
            <Wand2 className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              AI Architect
            </h1>
          </div>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Transform sketches into photorealistic architectural visualizations using advanced AI.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* INPUT SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-5/12 space-y-6"
          >
            {/* Upload Card */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 backdrop-blur-xl hover:border-neutral-700 transition-colors duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 border border-blue-500/20">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <h2 className="text-xl font-semibold text-white">Upload Source</h2>
              </div>

              <div className="relative group">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className={`
                  border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                  ${file ? 'border-blue-500/50 bg-blue-500/5' : 'border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50'}
                `}>
                  {file ? (
                    <div className="relative z-10">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt="Preview" 
                        className="w-full h-48 object-contain rounded-lg shadow-2xl mb-4" 
                      />
                      <div className="flex items-center justify-center text-blue-400 text-sm font-medium">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        {file.name}
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-neutral-400 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-neutral-300 font-medium">Click or drop sketch here</p>
                      <p className="text-neutral-500 text-sm mt-2">Supports JPG, PNG</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls Card */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-4 border border-purple-500/20">
                  <span className="text-purple-400 font-bold">2</span>
                </div>
                <h2 className="text-xl font-semibold text-white">Configuration</h2>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'scribble', icon: PenTool, label: 'Sketch' },
                  { id: 'canny', icon: Layers, label: 'CAD' },
                  { id: 'depth', icon: Box, label: 'Massing' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setControlType(mode.id)}
                    className={`
                      p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2
                      ${controlType === mode.id 
                        ? 'bg-white text-black border-white shadow-lg shadow-white/10 scale-105' 
                        : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:border-neutral-600'}
                    `}
                  >
                    <mode.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{mode.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-neutral-400 ml-1">Style Prompt</label>
                <textarea 
                  className="w-full p-4 bg-neutral-950 border border-neutral-800 rounded-xl h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-neutral-200 placeholder-neutral-600 resize-none"
                  placeholder="Describe the materials, lighting, and atmosphere..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center"
              >
                <span className="mr-2">⚠️</span> {error}
              </motion.div>
            )}
            
            {!adCompleted ? (
              <button 
                onClick={handleAdClick}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-5 rounded-2xl hover:from-yellow-500 hover:to-orange-500 transition-all font-semibold shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>🔓</span> Complete Verification to Unlock Generator
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={loading || !file || !prompt}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1 active:translate-y-0"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-3 w-5 h-5" />
                    Rendering...
                  </div>
                ) : "Generate Visualization"}
              </button>
            )}
          </motion.div>

          {/* OUTPUT SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-2 backdrop-blur-xl h-full min-h-[600px] flex flex-col relative overflow-hidden group">
              
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex-1 flex items-center justify-center rounded-2xl border border-neutral-800/50 bg-neutral-950/50 m-2 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center z-10"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-pulse" />
                        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">AI is dreaming...</h3>
                      <p className="text-neutral-500">Analyzing geometry and applying materials</p>
                    </motion.div>
                  ) : generatedImage ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative w-full h-full group/image"
                    >
                      <img 
                        src={`data:image/png;base64,${generatedImage}`}
                        alt="AI Generated Render" 
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <button
                          onClick={handleDownload}
                          className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
                        >
                          <Download className="w-5 h-5" />
                          Download High-Res
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-neutral-600"
                    >
                      <div className="w-24 h-24 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-6 rotate-3">
                        <Wand2 className="w-10 h-10 opacity-20" />
                      </div>
                      <p className="font-medium text-lg">Ready to visualize</p>
                      <p className="text-sm opacity-50 mt-2">Upload a sketch to begin</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default App;
