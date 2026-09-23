import React from 'react';

export default function MaximumBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 3D Modern White Luminous Mesh Backdrop */}
      <div className="absolute inset-0 mesh-gradient-bg opacity-90" />

      {/* Subtle 3D Geometric Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(to right, #071A36 1px, transparent 1px), linear-gradient(to bottom, #071A36 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          transform: 'perspective(1000px) rotateX(25deg) translateY(-80px) scale(1.15)',
          transformOrigin: 'top center',
        }}
      />

      {/* Subtle Royal Navy Lighting Orbs */}
      <div 
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-15 dark:opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(7, 26, 54, 0.2) 0%, rgba(7, 26, 54, 0.05) 65%, transparent 100%)'
        }}
      />
      
      <div 
        className="absolute top-[40%] -left-[10%] w-[550px] h-[550px] rounded-full blur-[140px] opacity-10 dark:opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(7, 26, 54, 0.15) 0%, transparent 70%)'
        }}
      />
    </div>
  );
}
