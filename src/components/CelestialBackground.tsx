import React, { useEffect, useRef } from 'react';

interface CelestialBackgroundProps {
  intensity?: number; // 0.5 to 2.0
  themeColor?: string; // e.g. '#38bdf8' or '#f59e0b'
}

export const CelestialBackground: React.FC<CelestialBackgroundProps> = ({
  intensity = 1.0,
  themeColor = '#38bdf8',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Stars & celestial particles
    const particleCount = Math.floor(120 * intensity);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3 * intensity,
      speedY: (Math.random() - 0.5) * 0.3 * intensity,
      alpha: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      isGolden: Math.random() > 0.65,
    }));

    // Bajoran Glyphs floating in space
    const glyphSymbols = ['P', 'T', 'O', 'B', 'K', 'V', 'D', 'S', 'A'];
    const floatingGlyphs = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      symbol: glyphSymbols[Math.floor(Math.random() * glyphSymbols.length)],
      size: Math.random() * 16 + 12,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      speedY: -Math.random() * 0.2 - 0.1,
      alpha: Math.random() * 0.25 + 0.05,
    }));

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#0a101d');
      bgGrad.addColorStop(0.5, '#060911');
      bgGrad.addColorStop(1, '#020408');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Celestial Temple / Wormhole subtle spiral vortex
      const vortexX = width / 2;
      const vortexY = height * 0.42;
      const vortexGrad = ctx.createRadialGradient(
        vortexX,
        vortexY,
        10,
        vortexX,
        vortexY,
        width * 0.45
      );
      vortexGrad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
      vortexGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.08)');
      vortexGrad.addColorStop(0.7, 'rgba(139, 92, 246, 0.04)');
      vortexGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = vortexGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw light rays from the celestial center
      ctx.save();
      ctx.translate(vortexX, vortexY);
      ctx.rotate(time * 0.05);
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const angle = (i * Math.PI) / 3;
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, width * 0.5, angle - 0.15, angle + 0.15);
        ctx.closePath();
        const rayGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.5);
        rayGrad.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
        rayGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.02)');
        rayGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // Render star particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha + Math.sin(time * 5 * p.pulseSpeed) * 0.2;
        ctx.fillStyle = p.isGolden
          ? `rgba(245, 158, 11, ${Math.max(0.05, currentAlpha)})`
          : `rgba(186, 230, 253, ${Math.max(0.05, currentAlpha)})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render floating Bajoran glyphs
      floatingGlyphs.forEach((g) => {
        g.y += g.speedY;
        g.rotation += g.rotSpeed;
        if (g.y < -30) {
          g.y = height + 20;
          g.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rotation);
        ctx.font = `600 ${g.size}px 'Cinzel', serif`;
        ctx.fillStyle = `rgba(217, 119, 6, ${g.alpha * 0.8})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`☥ ${g.symbol}`, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, themeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90 transition-opacity duration-1000"
    />
  );
};
