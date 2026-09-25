import React, { useEffect, useRef } from 'react';

export default function GoldCoinsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate gold dust particles & floating coins
    const particleCount = 35;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        isCoin: Math.random() > 0.75,
        coinRadius: Math.random() * 6 + 4,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.rotSpeed;

        // Wrap around top to bottom
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.isCoin) {
          // Draw subtle mini gold coin
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(Math.cos(p.angle * 2), 1); // 3D flipping effect

          const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.coinRadius);
          grad.addColorStop(0, '#FFF5D6');
          grad.addColorStop(0.4, '#D4AF57');
          grad.addColorStop(1, '#8C671C');

          ctx.fillStyle = grad;
          ctx.globalAlpha = p.opacity * 0.65;
          ctx.beginPath();
          ctx.arc(0, 0, p.coinRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#F3EEDB';
          ctx.lineWidth = 0.7;
          ctx.stroke();

          // Center currency mark
          ctx.fillStyle = '#4A3408';
          ctx.font = `${Math.floor(p.coinRadius * 0.9)}px Cinzel, serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('₹', 0, 0);

          ctx.restore();
        } else {
          // Draw sparkling gold dust particle
          ctx.save();
          const dustGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
          dustGrad.addColorStop(0, 'rgba(255, 245, 214, 0.9)');
          dustGrad.addColorStop(0.5, 'rgba(212, 175, 87, 0.6)');
          dustGrad.addColorStop(1, 'rgba(184, 142, 56, 0)');

          ctx.fillStyle = dustGrad;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
}
