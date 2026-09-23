import React from 'react';

export default function HeritageFrame({ children, className = "", innerClassName = "", glow = false }) {
  return (
    <div className={`relative p-1 rounded-2xl bg-gradient-to-b from-gold/40 via-gold-dark/20 to-gold/40 transition-all duration-300 ${glow ? 'shadow-gold-glow' : ''} ${className}`}>
      {/* Corner Flourishes */}
      <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-gold rounded-tl-lg pointer-events-none z-10" />
      <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-gold rounded-tr-lg pointer-events-none z-10" />
      <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-gold rounded-bl-lg pointer-events-none z-10" />
      <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-gold rounded-br-lg pointer-events-none z-10" />

      {/* Inner Container */}
      <div className={`relative rounded-xl overflow-hidden bg-white dark:bg-navy-dark ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
