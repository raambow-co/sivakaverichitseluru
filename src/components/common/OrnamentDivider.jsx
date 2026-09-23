import React from 'react';

export default function OrnamentDivider({ className = "", light = false }) {
  return (
    <div className={`flex items-center justify-center my-6 gap-3 ${className}`}>
      <div className={`h-[1px] w-16 sm:w-28 bg-gradient-to-r ${light ? 'from-transparent via-gold/40 to-gold' : 'from-transparent via-gold-dark/30 to-gold'}`} />
      
      {/* Center Godavari Flourish */}
      <div className="flex items-center gap-1.5 text-gold">
        <span className="w-1.5 h-1.5 rounded-full bg-gold/70 rotate-45 inline-block" />
        <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor" className="opacity-90">
          <path d="M12 2 L14 7 L19 7 L15 11 L17 16 L12 13 L7 16 L9 11 L5 7 L10 7 Z" />
        </svg>
        <span className="w-1.5 h-1.5 rounded-full bg-gold/70 rotate-45 inline-block" />
      </div>

      <div className={`h-[1px] w-16 sm:w-28 bg-gradient-to-l ${light ? 'from-transparent via-gold/40 to-gold' : 'from-transparent via-gold-dark/30 to-gold'}`} />
    </div>
  );
}
