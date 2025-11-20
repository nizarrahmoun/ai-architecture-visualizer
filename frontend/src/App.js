import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, Wand2, Download, Loader2, Layers, PenTool, Box, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

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
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000/api";
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
    <div className="min-h-screen bg-italian-cream text-italian-charcoal selection:bg-italian-gold/30 font-sans">
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/marble.png')] mix-blend-multiply"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 py-12 relative z-10">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-20 border-b border-italian-charcoal/10 pb-8"
        >
          <div>
            <h1 className="text-6xl font-display font-bold text-italian-charcoal mb-2 tracking-tight">
              STUDIO <span className="text-italian-terracotta">AI</span>
            </h1>
            <p className="text-italian-charcoal/60 font-serif italic text-xl">
              L'arte dell'architettura digitale
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium tracking-widest uppercase text-italian-charcoal/40">Est. 2025</p>
            <p className="text-sm font-medium tracking-widest uppercase text-italian-charcoal/40">Milano • Roma • Virtual</p>
          </div>
        </motion.header>
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* INPUT SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-4/12 space-y-10"
          >
            {/* Step 1: Upload */}
            <section>
              <div className="flex items-center mb-6">
                <span className="font-display text-4xl text-italian-terracotta/20 mr-4">01</span>
                <h2 className="text-2xl font-serif font-medium text-italian-charcoal">The Foundation</h2>
              </div>

              <div className="relative group">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className={`
                  border border-italian-charcoal/20 rounded-sm p-10 text-center transition-all duration-500
                  ${file ? 'bg-white shadow-xl shadow-italian-charcoal/5' : 'bg-transparent hover:bg-white/50'}
                `}>
                  {file ? (
                    <div className="relative z-10">
                      <div className="p-2 bg-white shadow-sm inline-block transform -rotate-2 mb-4">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="Preview" 
                          className="w-full h-40 object-cover grayscale contrast-125" 
                        />
                      </div>
                      <div className="flex items-center justify-center text-italian-charcoal text-sm font-medium tracking-wide uppercase">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-italian-olive" />
                        {file.name}
                      </div>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="w-16 h-16 border border-italian-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-italian-terracotta/50 transition-colors duration-500">
                        <Upload className="w-6 h-6 text-italian-charcoal/40 group-hover:text-italian-terracotta transition-colors" />
                      </div>
                      <p className="text-italian-charcoal font-serif text-lg italic">Upload sketch or plan</p>
                      <p className="text-italian-charcoal/40 text-xs mt-2 uppercase tracking-widest">JPG • PNG • WEBP</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Step 2: Configuration */}
            <section>
              <div className="flex items-center mb-6">
                <span className="font-display text-4xl text-italian-terracotta/20 mr-4">02</span>
                <h2 className="text-2xl font-serif font-medium text-italian-charcoal">The Vision</h2>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { id: 'scribble', icon: PenTool, label: 'Schizzo' },
                  { id: 'canny', icon: Layers, label: 'Tecnico' },
                  { id: 'depth', icon: Box, label: 'Volume' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setControlType(mode.id)}
                    className={`
                      py-4 px-2 border transition-all duration-500 flex flex-col items-center justify-center gap-3
                      ${controlType === mode.id 
                        ? 'bg-italian-charcoal text-white border-italian-charcoal' 
                        : 'bg-transparent border-italian-charcoal/20 text-italian-charcoal/60 hover:border-italian-charcoal/40'}
                    `}
                  >
                    <mode.icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-xs font-medium uppercase tracking-widest">{mode.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <textarea 
                  className="w-full p-6 bg-white border-l-2 border-italian-charcoal/10 focus:border-italian-terracotta outline-none transition-all text-italian-charcoal placeholder-italian-charcoal/30 resize-none font-serif text-lg leading-relaxed min-h-[160px]"
                  placeholder="Describe the materials, lighting, and atmosphere..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="absolute top-0 right-0 p-2">
                  <PenTool className="w-4 h-4 text-italian-charcoal/20" />
                </div>
              </div>
            </section>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}
            
            <div className="pt-4">
              {!adCompleted ? (
                <button 
                  onClick={handleAdClick}
                  className="group w-full bg-italian-gold text-white py-6 px-8 hover:bg-italian-gold/90 transition-all duration-500 flex items-center justify-between shadow-xl shadow-italian-gold/20"
                >
                  <span className="font-display font-bold text-lg tracking-widest uppercase flex items-center gap-3">
                    <Lock className="w-5 h-5" />
                    Unlock Studio
                  </span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={loading || !file || !prompt}
                  className="group w-full bg-italian-charcoal text-white py-6 px-8 hover:bg-italian-terracotta transition-all duration-500 flex items-center justify-between shadow-2xl shadow-italian-charcoal/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-display font-bold text-lg tracking-widest uppercase">
                    {loading ? "Rendering..." : "Generate Masterpiece"}
                  </span>
                  {loading ? (
                    <Loader2 className="animate-spin w-6 h-6" />
                  ) : (
                    <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  )}
                </button>
              )}
            </div>
          </motion.div>

          {/* OUTPUT SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-8/12"
          >
            <div className="h-full min-h-[700px] bg-white p-4 shadow-2xl shadow-italian-charcoal/5 relative">
              
              {/* Frame details */}
              <div className="absolute top-0 left-0 w-full h-full border border-italian-charcoal/5 pointer-events-none m-4 box-border"></div>
              <div className="absolute bottom-8 right-8 z-20">
                <span className="font-display text-6xl text-italian-charcoal/5 font-bold">03</span>
              </div>

              <div className="w-full h-full bg-italian-marble/30 flex items-center justify-center overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center z-10"
                    >
                      <div className="w-32 h-32 border border-italian-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <div className="absolute inset-0 border-t-2 border-italian-terracotta rounded-full animate-spin"></div>
                        <span className="font-serif italic text-italian-charcoal/40">AI</span>
                      </div>
                      <h3 className="text-2xl font-display text-italian-charcoal mb-2">Crafting Vision</h3>
                      <p className="text-italian-charcoal/50 font-serif italic">Applying materials, light, and shadow...</p>
                    </motion.div>
                  ) : generatedImage ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative w-full h-full group/image"
                    >
                      <img 
                        src={`data:image/png;base64,${generatedImage}`}
                        alt="AI Generated Render" 
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-italian-charcoal/80 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                        <button
                          onClick={handleDownload}
                          className="bg-white text-italian-charcoal px-10 py-5 font-display font-bold tracking-widest uppercase hover:bg-italian-terracotta hover:text-white transition-colors duration-300 flex items-center gap-4"
                        >
                          <Download className="w-5 h-5" />
                          Download Render
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="mb-6 opacity-20">
                        <Layers className="w-24 h-24 mx-auto text-italian-charcoal" strokeWidth={0.5} />
                      </div>
                      <h3 className="text-3xl font-display text-italian-charcoal/40 mb-2">The Canvas is Empty</h3>
                      <p className="text-italian-charcoal/30 font-serif italic">Upload a sketch to begin the transformation</p>
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
