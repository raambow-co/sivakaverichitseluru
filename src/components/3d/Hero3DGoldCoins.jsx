import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Ultra-Realistic Volumetric 3D Gold Coin with physical thickness,
 * fluted milled ridges, dual high-relief minted faces, specular light sweeps,
 * and physics-based floating animations.
 */
function Volumetric3DCoin({
  size = 80,
  thickness = 14, // 14px 3D physical rim depth
  positionClasses = 'top-[4%] right-[8%]',
  tumbleAnimation = 'coinTumble1 14s linear infinite',
  floatAnimation = 'coinFloat1 6s ease-in-out infinite alternate',
  parallaxFactor = 0.06,
  mousePos = { x: 0, y: 0 },
  frontImg = '/assets/coins/coin_rupee.jpg',
  backImg = '/assets/coins/coin_lakshmi.jpg',
  title = 'Siva Kaveri 24K Gold Coin',
  zIndex = 15,
  hideOnMobile = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [sparkleActive, setSparkleActive] = useState(false);

  // Responsive mouse parallax offset
  const offsetX = mousePos.x * parallaxFactor * 45;
  const offsetY = mousePos.y * parallaxFactor * 45;

  const halfThickness = thickness / 2;

  // Number of 3D rim extrusion slices to simulate solid cylindrical milled edge
  const edgeSlices = 7;
  const sliceOffsets = Array.from({ length: edgeSlices }, (_, i) => {
    return -halfThickness + (i * (thickness / (edgeSlices - 1)));
  });

  const handleInteraction = () => {
    setSparkleActive(true);
    setTimeout(() => setSparkleActive(false), 1200);
  };

  return (
    <div
      className={`absolute select-none pointer-events-auto transition-transform duration-300 ease-out ${positionClasses} ${
        hideOnMobile ? 'hidden md:block' : 'block'
      }`}
      style={{
        zIndex,
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        handleInteraction();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteraction}
      title={title}
    >
      {/* Floating Bobbing Physics Wrapper */}
      <div
        style={{
          animation: floatAnimation,
          width: size,
          height: size,
          perspective: '1400px',
        }}
        className="relative group cursor-pointer"
      >
        {/* Interactive Sparkle Burst */}
        {sparkleActive && (
          <div className="absolute -top-4 -right-4 z-40 pointer-events-none animate-ping">
            <Sparkles className="w-7 h-7 text-yellow-300 drop-shadow-[0_0_12px_rgba(255,215,0,0.95)]" />
          </div>
        )}

        {/* 3D Tumbling Cylinder Medallion */}
        <div
          className="w-full h-full relative rounded-full preserve-3d transition-transform duration-500"
          style={{
            animation: isHovered ? 'coinTumble1 2.5s linear infinite' : tumbleAnimation,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 16px 28px rgba(197, 155, 39, 0.45)) drop-shadow(0 6px 12px rgba(4, 14, 30, 0.4))',
          }}
        >
          {/* ================= 3D CYLINDRICAL MILLED EDGE LAYERS (Physical Thickness) ================= */}
          {sliceOffsets.map((z, idx) => (
            <div
              key={idx}
              className="absolute inset-0 rounded-full border border-amber-800/60 pointer-events-none"
              style={{
                transform: `translateZ(${z}px)`,
                background: `repeating-linear-gradient(
                  ${idx % 2 === 0 ? '90deg' : '95deg'},
                  #684B05 0px,
                  #9A7416 1.5px,
                  #FFE29F 3px,
                  #C59B27 4.5px,
                  #684B05 6px
                )`,
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)',
              }}
            />
          ))}

          {/* ================= FRONT COIN FACE (+Z) ================= */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden overflow-hidden border-2 border-yellow-200"
            style={{
              backfaceVisibility: 'hidden',
              transform: `translateZ(${halfThickness + 0.5}px)`,
              boxShadow: 'inset 0 0 8px rgba(104, 75, 5, 0.8), inset 0 2px 5px rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Minted Relief Artwork */}
            <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-700">
              <img
                src={frontImg}
                alt="24K Gold Coin Face"
                className="w-full h-full object-cover scale-[1.03] select-none pointer-events-none"
                loading="eager"
              />

              {/* Specular Radial Bevel Highlight Overlay */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, rgba(255,215,0,0.1) 40%, rgba(0,0,0,0.3) 100%)',
                }}
              />

              {/* Moving Metallic Shimmer Light Sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -rotate-45 transform -translate-x-full animate-coin-shimmer" />
              </div>
            </div>
          </div>

          {/* ================= BACK COIN FACE (-Z, Rotated 180deg) ================= */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden border-2 border-yellow-200"
            style={{
              backfaceVisibility: 'hidden',
              transform: `rotateY(180deg) translateZ(${halfThickness + 0.5}px)`,
              boxShadow: 'inset 0 0 8px rgba(104, 75, 5, 0.8), inset 0 2px 5px rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Reverse Minted Relief Artwork */}
            <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-700">
              <img
                src={backImg}
                alt="24K Gold Coin Reverse"
                className="w-full h-full object-cover scale-[1.03] select-none pointer-events-none"
                loading="eager"
              />

              {/* Specular Radial Bevel Highlight Overlay */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, rgba(255,215,0,0.1) 40%, rgba(0,0,0,0.3) 100%)',
                }}
              />

              {/* Moving Metallic Shimmer Light Sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -rotate-45 transform -translate-x-full animate-coin-shimmer" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic 3D Ground Shadow Underneath */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-5/6 h-4 rounded-full bg-navy-deep/30 dark:bg-black/60 blur-md pointer-events-none"
          style={{
            animation: 'coinShadowPulse 6s ease-in-out infinite alternate',
          }}
        />
      </div>
    </div>
  );
}

export default function Hero3DGoldCoins() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  /**
   * 5 Medium-Sized 3D Gold Coins positioned strictly in non-overlapping atmospheric zones:
   * - Never intersects the heading, paragraphs, CTA buttons, or metric cards.
   * - 3D volumetric fluted cylinder thickness (12px to 16px).
   * - Distinct sizes (88px, 78px, 74px, 68px, 62px).
   */
  /**
   * 5 Medium-Sized 3D Gold Coins positioned strictly below the 80px fixed navbar
   * and in non-overlapping peripheral zones outside of all text and button blocks:
   * - Volumetric fluted cylinder thickness (12px to 16px).
   * - Distinct sizes (88px, 76px, 74px, 68px, 62px).
   */
  const coins = [
    {
      id: 'coin-top-right',
      size: 76,
      thickness: 14,
      positionClasses: 'top-3 right-4 sm:top-6 sm:right-8 lg:top-8 lg:right-12',
      tumbleAnimation: 'coinTumble1 13s linear infinite',
      floatAnimation: 'coinFloat1 6.2s ease-in-out infinite alternate',
      parallaxFactor: 0.08,
      frontImg: '/assets/coins/coin_rupee.jpg',
      backImg: '/assets/coins/coin_lakshmi.jpg',
      title: 'Siva Kaveri Rupee Medallion',
      zIndex: 15,
      hideOnMobile: true, // Clean on mobile
    },
    {
      id: 'coin-card-flank-right',
      size: 88, // Flagship Medium-Large
      thickness: 16,
      positionClasses: 'top-[42%] -right-2 sm:right-2 lg:right-4 xl:right-8',
      tumbleAnimation: 'coinTumble2 15s linear infinite',
      floatAnimation: 'coinFloat2 7.5s ease-in-out infinite alternate',
      parallaxFactor: 0.1,
      frontImg: '/assets/coins/coin_lakshmi.jpg',
      backImg: '/assets/coins/coin_rupee.jpg',
      title: '24K Goddess Lakshmi Fine Gold Medallion',
      zIndex: 15,
      hideOnMobile: true,
    },
    {
      id: 'coin-bottom-right',
      size: 74,
      thickness: 13,
      positionClasses: '-bottom-2 right-3 sm:bottom-0 sm:right-8 lg:bottom-2 lg:right-14',
      tumbleAnimation: 'coinTumble3 12s linear infinite',
      floatAnimation: 'coinFloat3 6.8s ease-in-out infinite alternate',
      parallaxFactor: 0.07,
      frontImg: '/assets/coins/coin_rupee.jpg',
      backImg: '/assets/coins/coin_lakshmi.jpg',
      title: 'Siva Kaveri Chits 1998 Gold Coin',
      zIndex: 25,
      hideOnMobile: false,
    },
    {
      id: 'coin-top-left-gutter',
      size: 64,
      thickness: 12,
      positionClasses: 'top-5 left-10 sm:top-8 sm:left-16 lg:top-10 lg:left-24 xl:left-32',
      tumbleAnimation: 'coinTumble4 10s linear infinite',
      floatAnimation: 'coinFloat4 5.6s ease-in-out infinite alternate',
      parallaxFactor: 0.06,
      frontImg: '/assets/coins/coin_lakshmi.jpg',
      backImg: '/assets/coins/coin_rupee.jpg',
      title: 'Lakshmi Wealth Coin',
      zIndex: 15,
      hideOnMobile: true,
    },
    {
      id: 'coin-bottom-left-gutter',
      size: 68,
      thickness: 13,
      positionClasses: '-bottom-3 left-3 sm:bottom-0 sm:left-6 lg:bottom-2 lg:left-10',
      tumbleAnimation: 'coinTumble5 14s linear infinite',
      floatAnimation: 'coinFloat5 6.5s ease-in-out infinite alternate',
      parallaxFactor: 0.07,
      frontImg: '/assets/coins/coin_rupee.jpg',
      backImg: '/assets/coins/coin_lakshmi.jpg',
      title: 'Chit Growth Gold Coin',
      zIndex: 25,
      hideOnMobile: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute top-20 sm:top-24 -bottom-16 left-0 right-0 overflow-visible pointer-events-none hero-coin-container z-20"
      aria-hidden="true"
    >
      {coins.map((coin) => (
        <Volumetric3DCoin
          key={coin.id}
          size={coin.size}
          thickness={coin.thickness}
          positionClasses={coin.positionClasses}
          tumbleAnimation={coin.tumbleAnimation}
          floatAnimation={coin.floatAnimation}
          parallaxFactor={coin.parallaxFactor}
          mousePos={mousePos}
          frontImg={coin.frontImg}
          backImg={coin.backImg}
          title={coin.title}
          zIndex={coin.zIndex}
          hideOnMobile={coin.hideOnMobile}
        />
      ))}
    </div>
  );
}
