import React, { useEffect, useRef } from 'react';

interface Props {
  isActive: boolean;
  volume: number; // 0 to 1
}

export const AudioVisualizer: React.FC<Props> = ({ isActive, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (!isActive) return;

      time += 0.05;
      
      // Base radius plus volume reactivity
      const baseRadius = 30;
      const reactiveRadius = baseRadius + (volume * 50);

      // Draw Core
      const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, reactiveRadius);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.4, '#38bdf8');
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, reactiveRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw Rings
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const ringRadius = reactiveRadius + 15 + (i * 15) + (Math.sin(time + i) * 5);
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw Waveform particles
      const particleCount = 12;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time;
        const dist = reactiveRadius + 40 + (Math.sin(time * 2 + i) * 10);
        const px = centerX + Math.cos(angle) * dist;
        const py = centerY + Math.sin(angle) * dist;
        
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive, volume]);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={300} 
      className={`w-full h-64 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};