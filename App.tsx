import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptEditor } from './components/PromptEditor';
import { ImageResult } from './components/ImageResult';
import { generateImage } from './services/geminiService';
import { AspectRatio, GenerationState } from './types';

const INITIAL_PROMPT = "Crea una imagen con relación de aspecto 16:9 estilo futurista. En el fondo oscuro con un patrón de maya hexagonal, en primer plano y a la izquierda de la imagen un robot femenino representando una IA de colores blanco, negro y azules fluorescentes. al lado derecho de la imagen hay algunos patrones circulares tecnológicos superpuestos de color azul semitransparente simulando ser una pantalla holográfica.";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(INITIAL_PROMPT);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setGenerationState('loading');
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await generateImage(prompt, aspectRatio);
      if (base64Image) {
        setGeneratedImage(base64Image);
        setGenerationState('success');
      } else {
        throw new Error("No image data received from the model.");
      }
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || "An unexpected error occurred.");
      setGenerationState('error');
    }
  }, [prompt, aspectRatio]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-200">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <section className="bg-neon-surface border border-gray-800 rounded-2xl p-6 shadow-2xl shadow-black/50">
              <h2 className="text-xl font-bold mb-4 text-neon-blue flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                Configuration
              </h2>
              
              <PromptEditor 
                prompt={prompt} 
                setPrompt={setPrompt} 
                onGenerate={handleGenerate}
                isLoading={generationState === 'loading'}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
              />
              
              {error && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </section>

            <section className="bg-neon-surface/50 border border-gray-800/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-400 mb-2">Tips for better results</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-500">
                <li>Be descriptive about lighting (e.g., "neon", "cinematic lighting").</li>
                <li>Specify the style (e.g., "photorealistic", "cyberpunk", "3d render").</li>
                <li>Mention the composition (e.g., "wide angle", "close up").</li>
              </ul>
            </section>
          </div>

          {/* Right Column: Preview */}
          <div className="flex flex-col h-full order-1 lg:order-2">
            <ImageResult 
              imageData={generatedImage} 
              state={generationState} 
              aspectRatio={aspectRatio}
            />
          </div>
          
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6 text-center text-gray-600 text-sm mt-auto">
        <p>Powered by Google Gemini 2.5 Flash Image</p>
      </footer>
    </div>
  );
};

export default App;