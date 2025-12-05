import React from 'react';
import { PromptEditorProps, AspectRatio } from '../types';

const ASPECT_RATIOS: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];

export const PromptEditor: React.FC<PromptEditorProps> = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  isLoading,
  aspectRatio,
  setAspectRatio
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">
          Prompt
        </label>
        <div className="relative">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            className="w-full h-40 bg-black/40 border border-gray-700 rounded-xl p-4 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all resize-none text-base leading-relaxed scrollbar-thin"
            placeholder="Describe the image you want to generate..."
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-600">
            {prompt.length} chars
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Aspect Ratio
        </label>
        <div className="grid grid-cols-5 gap-2">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio}
              onClick={() => setAspectRatio(ratio)}
              disabled={isLoading}
              className={`
                py-2 px-1 rounded-lg text-sm font-medium transition-all duration-200 border
                ${aspectRatio === ratio 
                  ? 'bg-neon-blue/10 border-neon-blue text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.2)]' 
                  : 'bg-black/20 border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'}
              `}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className={`
          w-full py-4 rounded-xl font-bold text-lg tracking-wide uppercase transition-all duration-300
          flex items-center justify-center gap-3 overflow-hidden relative group
          ${isLoading || !prompt.trim()
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            : 'bg-gradient-to-r from-neon-blue to-blue-600 text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] border border-transparent'}
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>Initialize Generation</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </>
        )}
        
        {/* Animated sheen effect */}
        {!isLoading && prompt.trim() && (
          <div className="absolute top-0 -left-[100%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-sheen" />
        )}
      </button>
      
      <style>{`
        @keyframes sheen {
          100% { left: 200%; }
        }
        .animate-sheen {
          animation: sheen 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};