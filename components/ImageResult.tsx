import React from 'react';
import { ImageResultProps } from '../types';

export const ImageResult: React.FC<ImageResultProps> = ({ imageData, state, aspectRatio }) => {
  // Calculate style for aspect ratio container
  const getAspectRatioPadding = () => {
    switch(aspectRatio) {
      case '1:1': return 'pt-[100%]';
      case '16:9': return 'pt-[56.25%]';
      case '9:16': return 'pt-[177.77%]';
      case '4:3': return 'pt-[75%]';
      case '3:4': return 'pt-[133.33%]';
      default: return 'pt-[56.25%]';
    }
  };

  return (
    <div className="bg-neon-dark border border-gray-800 rounded-2xl p-2 relative overflow-hidden h-full flex flex-col justify-center">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue/30 rounded-tl-xl z-10"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue/30 rounded-tr-xl z-10"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-blue/30 rounded-bl-xl z-10"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-blue/30 rounded-br-xl z-10"></div>

      <div className="relative w-full rounded-xl overflow-hidden bg-black/50 shadow-inner">
        {state === 'idle' && (
          <div className={`${getAspectRatioPadding()} relative w-full`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              <p className="font-mono text-sm tracking-widest">WAITING FOR INPUT...</p>
            </div>
          </div>
        )}

        {state === 'loading' && (
          <div className={`${getAspectRatioPadding()} relative w-full`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-neon-blue/20 border-t-neon-blue rounded-full animate-spin mb-6"></div>
              <div className="text-neon-blue font-mono text-xs animate-pulse">GENERATING NEURAL PATTERNS</div>
            </div>
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent h-[10%] w-full animate-scan pointer-events-none"></div>
          </div>
        )}

        {state === 'error' && (
           <div className={`${getAspectRatioPadding()} relative w-full`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 bg-red-900/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <p className="font-bold">GENERATION FAILED</p>
            </div>
          </div>
        )}

        {state === 'success' && imageData && (
          <div className="relative group">
            <img 
              src={imageData} 
              alt="Generated AI Art" 
              className="w-full h-auto object-contain animate-fade-in"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <a 
                href={imageData} 
                download={`neongen-${Date.now()}.png`}
                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-neon-blue transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download
              </a>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};