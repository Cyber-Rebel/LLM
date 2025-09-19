import React, { useEffect, useState } from "react";

const PixelLoader = ({ bars = 32, speed = 120 }) => {
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (progress < bars) {
      const timer = setTimeout(() => setProgress(progress + 1), speed);
      return () => clearTimeout(timer);
    } else {
      // Reset after completion for continuous loop
      const resetTimer = setTimeout(() => setProgress(0), 1000);
      return () => clearTimeout(resetTimer);
    }
  }, [progress, bars, speed]);

  // Add glitch effect occasionally
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Calculate loading percentage
  const percentage = Math.round((progress / bars) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Futuristic Header */}
      <div className="text-center mb-8">
        <div className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 
          text-4xl sm:text-6xl lg:text-8xl font-black tracking-wider mb-4
          ${glitch ? 'animate-pulse filter blur-[1px]' : ''} cyber-glitch`}>
          {percentage}%
        </div>
        <div className="text-cyan-300 text-xs sm:text-sm lg:text-base tracking-[0.2em] uppercase opacity-80">
          INITIALIZING NEURAL NETWORK
        </div>
      </div>

      {/* Loading Bar Container */}
      <div className="flex justify-center items-center mb-6">
        <div className="relative w-full max-w-lg">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
          
          {/* Main Container */}
          <div className="relative bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 sm:p-4">
            {/* Progress Bar */}
            <div className="flex gap-[1px] sm:gap-[2px] h-4 sm:h-6 lg:h-8">
              {[...Array(bars)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 transition-all duration-200 ease-out transform
                    ${i < progress 
                      ? `bg-gradient-to-t ${
                          i < progress * 0.3 
                            ? 'from-cyan-600 to-cyan-400' 
                            : i < progress * 0.7 
                            ? 'from-cyan-500 to-cyan-300'
                            : 'from-purple-500 to-cyan-400'
                        } shadow-lg shadow-cyan-500/50 scale-y-110`
                      : 'bg-gray-800/50 scale-y-100'
                    }
                    ${glitch && i < progress ? 'animate-pulse' : ''}
                  `}
                  style={{
                    boxShadow: i < progress ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none',
                  }}
                />
              ))}
            </div>
            
            {/* Progress Line Effect */}
            <div className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex justify-center items-center space-x-4 sm:space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs sm:text-sm font-mono">SYSTEM ONLINE</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <span className="text-cyan-400 text-xs sm:text-sm font-mono">LOADING...</span>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes cyber-glitch {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
        
        .cyber-glitch {
          animation: ${glitch ? 'cyber-glitch 0.3s ease-in-out' : 'none'};
        }
        
        @media (max-width: 640px) {
          .cyber-glitch {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PixelLoader;
