import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
  variant?: "dark" | "light"; // "dark" = for dark bg (white text), "light" = for light bg (dark text)
}

export default function Logo({ size = "md", className = "", showText = true, variant = "dark" }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const textColorClass = variant === "dark" ? "text-white" : "text-[#0D0D0D]";
  const subTextColorClass = variant === "dark" ? "text-white/70" : "text-[#68665F]";

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Modern SVG Logo Icon with Gradient & Glowing Aura */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {/* Ambient Backlight Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E44D26] via-[#FF7347] to-[#1B52CC] rounded-xl opacity-75 blur-xs group-hover:opacity-100 transition duration-300"></div>

        {/* Core Logo Emblem Container */}
        <div className="relative w-full h-full bg-[#0D0D0D] rounded-xl p-1.5 flex items-center justify-center border border-white/20 shadow-lg overflow-hidden">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#E44D26_1px,transparent_1px)] [background-size:6px_6px] opacity-20"></div>

          {/* SVG Code Terminal Diamond Mark */}
          <svg className="w-full h-full text-white relative z-10" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7347" />
                <stop offset="100%" stopColor="#E44D26" />
              </linearGradient>
            </defs>

            {/* Left Bracket < */}
            <path
              d="M11 9L5 16L11 23"
              stroke="url(#logoGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Bracket > */}
            <path
              d="M21 9L27 16L21 23"
              stroke="url(#logoGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Forward Slash / */}
            <path
              d="M17 7L13 25"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-black ${textColorClass} ${textSizes[size]} tracking-tight uppercase leading-none flex items-center gap-1 drop-shadow-sm`}>
            CODE<span className="text-[#E44D26]">CAMPUS</span>
            <span className="w-1.5 h-1.5 bg-[#E44D26] rounded-full inline-block animate-pulse"></span>
          </span>
          <span className={`text-[9px] font-mono ${subTextColorClass} tracking-[0.2em] font-semibold uppercase leading-none mt-0.5 hidden sm:block`}>
            ALGORITHM ARENA
          </span>
        </div>
      )}
    </div>
  );
}
