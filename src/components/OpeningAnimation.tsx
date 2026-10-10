import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1.8 seconds dwell time for a punchy, memorable, non-intrusive intro
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 500); // 500ms fade transition
      return () => clearTimeout(exitTimer);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1E1B2E] transition-all duration-500 overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Animated Gradient Mesh & Rings */}
      <div
        aria-hidden="true"
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#7C3AED]/30 via-[#F43F5E]/20 to-[#FBBF24]/20 blur-3xl animate-pulse-soft pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 rounded-full border border-purple-500/20 animate-ping opacity-25 pointer-events-none"
        style={{ animationDuration: '3s' }}
      />
      <div
        aria-hidden="true"
        className="absolute w-96 h-96 rounded-full border border-rose-500/15 animate-ping opacity-20 pointer-events-none"
        style={{ animationDuration: '4s' }}
      />

      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 text-xs font-semibold text-gray-400 hover:text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
      >
        <span>Skip</span>
        <ArrowRight className="w-3 h-3" />
      </button>

      {/* Center Hero Logo & Tagline Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* 3D Pop & Bounce Logo Container */}
        <div
          className="relative mb-5"
          style={{
            perspective: '1000px',
          }}
        >
          {/* Outer Glowing Halo */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#7C3AED] via-[#F43F5E] to-[#FBBF24] rounded-3xl blur-xl opacity-70 animate-pulse" />

          {/* 3D Logo Cube / Card with Bounce & Tilt */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#F43F5E] p-0.5 shadow-2xl flex items-center justify-center text-white"
            style={{
              animation: 'logoBounce 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#E11D48] flex items-center justify-center border border-white/25">
              <span className="font-display font-black text-4xl sm:text-5xl tracking-tight text-white drop-shadow-md">
                L
              </span>
            </div>

            {/* Sparkle badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FBBF24] text-[#1E1B2E] flex items-center justify-center shadow-lg animate-bounce">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Brand Name Text with Gradient */}
        <h1
          className="font-display font-black text-4xl sm:text-5xl tracking-tight text-white mb-2"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.3s both',
          }}
        >
          LOCALY
          <span className="text-[#F43F5E]">.</span>
        </h1>

        {/* Stylish Tagline */}
        <p
          className="text-sm sm:text-base font-medium tracking-wide text-gray-300"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.5s both',
          }}
        >
          Your City, Your World.
        </p>

        {/* City Subtitle indicator */}
        <div
          className="mt-4 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] text-purple-200 font-medium"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.7s both',
          }}
        >
          Chhatrapati Sambhajinagar · Maharashtra
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-32 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7C3AED] via-[#F43F5E] to-[#FBBF24] rounded-full transition-all ease-linear"
            style={{
              width: isFadingOut ? '100%' : '85%',
              transitionDuration: '1.5s',
            }}
          />
        </div>

      </div>

      {/* Inline styles for keyframe bounce animations */}
      <style>{`
        @keyframes logoBounce {
          0% {
            opacity: 0;
            transform: scale(0.3) rotateX(35deg) rotateY(-35deg) translateY(40px);
          }
          60% {
            opacity: 1;
            transform: scale(1.1) rotateX(-10deg) rotateY(10deg) translateY(-8px);
          }
          85% {
            transform: scale(0.96) rotateX(4deg) rotateY(-4deg) translateY(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg) rotateY(0deg) translateY(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
