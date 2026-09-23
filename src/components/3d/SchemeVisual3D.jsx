import React, { useState, useRef } from 'react';

const SCHEME_VISUAL_MAP = {
  'skc-1l': {
    image: '/assets/schemes/gold_pot_3d.png',
    alt: '3D Swarna Kalash Gold Pot Floating in Air',
    accentColor: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.35)',
  },
  'skc-5l': {
    image: '/assets/schemes/business_store_3d.png',
    alt: '3D MSME Retail Boutique Floating in Air',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.3)',
  },
  'skc-10l': {
    image: '/assets/schemes/education_books_3d.png',
    alt: '3D Graduation Cap and Academic Library Floating in Air',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.35)',
  },
  'skc-20l': {
    image: '/assets/schemes/luxury_car_3d.png',
    alt: '3D Luxury Sedan Car Floating in Air',
    accentColor: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.35)',
  },
  'skc-50l': {
    image: '/assets/schemes/large_business_3d.png',
    alt: '3D Corporate Towers and Golden Business Typography Floating in Air',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
  }
};

export default function SchemeVisual3D({ schemeId }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef(null);

  const visual = SCHEME_VISUAL_MAP[schemeId] || SCHEME_VISUAL_MAP['skc-5l'];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle 3D tilt (max +/- 8 degrees for natural float)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative w-full h-full min-h-[440px] sm:min-h-[500px] flex flex-col items-center justify-center select-none cursor-pointer group"
      style={{ perspective: '1200px' }}
    >
      {/* Soft Ambient Floating Light Aura (No box/container) */}
      <div 
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full pointer-events-none transition-all duration-700 blur-3xl -z-10"
        style={{
          background: `radial-gradient(circle, ${visual.glowColor} 0%, transparent 70%)`,
          opacity: isHovered ? 0.75 : 0.4,
          transform: `scale(${isHovered ? 1.2 : 1})`,
        }}
      />

      {/* Pure 3D Floating Asset in Open Air */}
      <div 
        className="relative w-full flex flex-col items-center justify-center preserve-3d transition-transform duration-300 ease-out animate-float-3d"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isClicked ? 0.96 : isHovered ? 1.05 : 1})`,
        }}
      >
        
        {/* The 3D Floating Object (Transparent, isolated, crisp) */}
        <div 
          className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)] transition-transform duration-500"
          style={{
            transform: 'translateZ(20px)'
          }}
        >
          <img 
            src={visual.image} 
            alt={visual.alt}
            className="w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out"
            loading="eager"
          />
        </div>

        {/* Soft Floor Contact Shadow (Synchronously breathing with float) */}
        <div 
          className="relative mt-2 flex flex-col items-center justify-center pointer-events-none transition-all duration-300"
          style={{
            transform: `scale(${isHovered ? 1.15 : 1})`,
          }}
        >
          <div className="w-48 sm:w-56 h-5 rounded-[50%] bg-black/35 dark:bg-black/60 blur-xl animate-shadow-3d" />
          <div 
            className="w-32 sm:w-40 h-3 rounded-[50%] blur-md -mt-3 animate-shadow-3d"
            style={{ backgroundColor: `${visual.accentColor}44` }}
          />
        </div>

      </div>

    </div>
  );
}
