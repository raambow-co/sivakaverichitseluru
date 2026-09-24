import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Ultra-Realistic Volumetric 3D Gold Coin with physical thickness,
 * fluted milled ridges, dual high-relief minted faces, specular light sweeps,
 * and responsive scaling for mobile and desktop screens.
 */
function Volumetric3DCoin({
  size = 80,
  mobileSize = 42,
  thickness = 14,
  positionClasses = 'top-[4%] right-[8%]',
  tumbleAnimation = 'coinTumble1 14s linear infinite',
  floatAnimation = 'coinFloat1 6s ease-in-out infinite alternate',
  parallaxFactor = 0.06,
  mousePos = { x: 0, y: 0 },
  frontImg = '/assets/coins/coin_rupee.jpg',
  backImg = '/assets/coins/coin_lakshmi.jpg',
  title = 'Siva Kaveri 24K Gold Coin',
  zIndex = 15,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [sparkleActive, setSparkleActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeSize = isMobile ? mobileSize : size;
  const activeThickness = isMobile ? Math.max(6, Math.round(thickness * 0.6)) : thickness;
  const halfThickness = activeThickness / 2;

  // Responsive mouse parallax offset
  const offsetX = mousePos.x * parallaxFactor * (isMobile ? 20 : 45);
  const offsetY = mousePos.y * parallaxFactor * (isMobile ? 20 : 45);

  // Number of 3D rim extrusion slices to simulate solid cylindrical milled edge
  const edgeSlices = isMobile ? 5 : 7;
  const sliceOffsets = Array.from({ length: edgeSlices }, (_, i) => {
    return -halfThickness + (i * (activeThickness / (edgeSlices - 1)));
  });

  const handleInteraction = () => {
    setSparkleActive(true);
    setTimeout(() => setSparkleActive(false), 1200);
  };

  return (
    <div
      className={`absolute select-none pointer-events-auto transition-transform duration-300 ease-out ${positionClasses} block`}
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
          width: activeSize,
          height: activeSize,
          perspective: '1400px',
        }}
        className="relative group cursor-pointer"
      >
        {/* Interactive Sparkle Burst */}
        {sparkleActive && (
          <div className="absolute -top-3 -right-3 z-40 pointer-events-none animate-ping">
            <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-300 drop-shadow-[0_0_12px_rgba(255,215,0,0.95)]" />
          </div>
        )}

        {/* 3D Tumbling Cylinder Medallion */}
        <div
          className="w-full h-full relative rounded-full preserve-3d transition-transform duration-500"
          style={{
            animation: isHovered ? 'coinTumble1 2.5s linear infinite' : tumbleAnimation,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 10px 20px rgba(197, 155, 39, 0.4)) drop-shadow(0 4px 8px rgba(4, 14, 30, 0.35))',
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
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.6)',
              }}
            />
          ))}

          {/* ================= OBVERSE FACE (+Z Front Face: Rupee Emblem) ================= */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden backface-hidden"
            style={{
              transform: `translateZ(${halfThickness}px)`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.45), 0 0 12px rgba(255,215,0,0.4)',
            }}
          >
            {/* 24K Minted High-Relief Image Texture */}
            <img
              src={frontImg}
              alt="24K Gold Coin Obverse"
              className="w-full h-full object-cover rounded-full"
              loading="eager"
            />

            {/* Specular Radial Gold Sheen Overlay */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, rgba(255,223,128,0.4) 40%, rgba(139,94,0,0.8) 100%)',
              }}
            />

            {/* Outer Concentric Fluted Gold Bezel Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-300/80 pointer-events-none shadow-inner" />
            <div className="absolute inset-1 rounded-full border border-yellow-200/50 pointer-events-none" />

            {/* Specular Glint Reflection Sweeper */}
            <div
              className="absolute -inset-full rounded-full opacity-35 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
                animation: 'coinShimmerSweep 5s ease-in-out infinite',
              }}
            />
          </div>

          {/* ================= REVERSE FACE (-Z Back Face: Goddess Lakshmi) ================= */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden backface-hidden"
            style={{
              transform: `rotateY(180deg) translateZ(${halfThickness}px)`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.45), 0 0 12px rgba(255,215,0,0.4)',
            }}
          >
            {/* 24K Minted High-Relief Image Texture */}
            <img
              src={backImg}
              alt="24K Gold Coin Reverse"
              className="w-full h-full object-cover rounded-full"
              loading="eager"
            />

            {/* Specular Radial Gold Sheen Overlay */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                background: 'radial-gradient(circle at 65% 30%, rgba(255,255,255,0.9) 0%, rgba(255,223,128,0.4) 40%, rgba(139,94,0,0.8) 100%)',
              }}
            />

            {/* Outer Concentric Fluted Gold Bezel Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-300/80 pointer-events-none shadow-inner" />
            <div className="absolute inset-1 rounded-full border border-yellow-200/50 pointer-events-none" />

            {/* Specular Glint Reflection Sweeper */}
            <div
              className="absolute -inset-full rounded-full opacity-35 pointer-events-none"
              style={{
                background: 'linear-gradient(225deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
                animation: 'coinShimmerSweep 5s ease-in-out infinite 2.5s',
              }}
            />
          </div>
        </div>
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
   * 5 Volumetric 3D Gold Coins positioned in atmospheric safe peripheral zones:
   * - Fully responsive on both mobile and desktop screens.
   * - Compact scaled dimensions on mobile so they never obstruct text or buttons.
   */
  const coins = [
    {
      id: 'coin-top-right',
      size: 78,
      mobileSize: 44,
      thickness: 14,
      positionClasses: 'top-2 right-2 sm:top-6 sm:right-8 lg:top-8 lg:right-12',
      tumbleAnimation: 'coinTumble1 13s linear infinite',
      floatAnimation: 'coinFloat1 6.2s ease-in-out infinite alternate',
      parallaxFactor: 0.08,
      frontImg: '/assets/coins/coin_rupee.jpg',
      backImg: '/assets/coins/coin_lakshmi.jpg',
      title: 'Siva Kaveri Rupee Medallion',
      zIndex: 15,
    },
    {
      id: 'coin-card-flank-right',
      size: 88,
      mobileSize: 46,
      thickness: 16,
      positionClasses: 'top-[36%] -right-1 sm:top-[42%] sm:right-2 lg:right-4 xl:right-8',
      tumbleAnimation: 'coinTumble2 15s linear infinite',
      floatAnimation: 'coinFloat2 7.5s ease-in-out infinite alternate',
      parallaxFactor: 0.1,
      frontImg: '/assets/coins/coin_lakshmi.jpg',
      backImg: '/assets/coins/coin_rupee.jpg',
      title: '24K Goddess Lakshmi Fine Gold Medallion',
      zIndex: 15,
    },
    {
      id: 'coin-bottom-right',
      size: 74,
      mobileSize: 42,
      thickness: 13,
      positionClasses: 'bottom-8 right-3 sm:bottom-12 sm:right-8 lg:bottom-16 lg:right-14',
      tumbleAnimation: 'coinTumble3 12s linear infinite',
      floatAnimation: 'coinFloat3 6.8s ease-in-out infinite alternate',
      parallaxFactor: 0.07,
      frontImg: '/assets/coins/coin_rupee.jpg',
      backImg: '/assets/coins/coin_lakshmi.jpg',
      title: 'Siva Kaveri Chits 1998 Gold Coin',
      zIndex: 25,
    },
    {
      id: 'coin-top-left-gutter',
      size: 66,
      mobileSize: 38,
      thickness: 12,
      positionClasses: 'top-3 left-2 sm:top-8 sm:left-16 lg:top-10 lg:left-24 xl:left-32',
      tumbleAnimation: 'coinTumble4 10s linear infinite',
      floatAnimation: 'coinFloat4 5.6s ease-in-out infinite alternate',
      parallaxFactor: 0.06,
      frontImg: '/assets/coins/coin_lakshmi.jpg',
      backImg: '/assets/coins/coin_rupee.jpg',
      title: 'Lakshmi Wealth Coin',
      zIndex: 15,
    },
    {
      id: 'coin-bottom-left-gutter',
      size: 70,
      mobileSize: 40,
      thickness: 13,
      positionClasses: 'bottom-8 left-3 sm:bottom-12 sm:left-6 lg:bottom-16 lg:left-10',
      tumbleAnimation: 'coinTumble5 14s linear infinite',
      floatAnimation: 'coinFloat5 6.5s ease-in-out infinite alternate',
      parallaxFactor: 0.07,
      frontImg: '/assets/coins/coin_rupee.jpg',
      backImg: '/assets/coins/coin_lakshmi.jpg',
      title: 'Chit Growth Gold Coin',
      zIndex: 25,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute top-20 sm:top-28 bottom-0 left-0 right-0 overflow-visible pointer-events-none hero-coin-container z-20"
      aria-hidden="true"
    >
      {coins.map((coin) => (
        <Volumetric3DCoin
          key={coin.id}
          size={coin.size}
          mobileSize={coin.mobileSize}
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
        />
      ))}
    </div>
  );
}
