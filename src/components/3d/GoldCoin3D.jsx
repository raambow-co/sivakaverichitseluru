import React from 'react';

export default function GoldCoin3D({ size = 80, className = "" }) {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size, perspective: '800px' }}
    >
      <div 
        className="w-full h-full rounded-full relative coin-3d-wrap shadow-3d-gold flex items-center justify-center p-1"
        style={{
          background: 'linear-gradient(135deg, #FFE29F 0%, #D4AF37 35%, #8A6409 75%, #F5D77F 100%)',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4), 0 12px 28px rgba(197, 155, 39, 0.4)',
        }}
      >
        {/* Inner Ring with Authentic Logo */}
        <div 
          className="w-full h-full rounded-full border border-yellow-200/80 flex items-center justify-center overflow-hidden bg-amber-600 shadow-inner relative"
        >
          <img
            src="/assets/coins/coin_rupee.jpg"
            alt="SKC Gold Medallion"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none rounded-full" />
        </div>
      </div>
    </div>
  );
}
