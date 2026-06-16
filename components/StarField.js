'use client';
import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      opacity: Math.random() * 0.7 + 0.1,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const shootingStars = [];
    let frame = 0;

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.75,
        y: Math.random() * canvas.height * 0.45,
        len: Math.random() * 90 + 50,
        vx: Math.random() * 3 + 2.5,
        vy: Math.random() * 1.5 + 0.8,
        opacity: 0,
        fadeIn: true,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => {
        s.opacity += s.twinkleSpeed * s.twinkleDir;
        if (s.opacity >= 0.85) { s.opacity = 0.85; s.twinkleDir = -1; }
        if (s.opacity <= 0.05) { s.opacity = 0.05; s.twinkleDir = 1; }

        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,240,228,${s.opacity})`;
        ctx.fill();
      });

      if (frame % 220 === 0) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];

        if (ss.fadeIn) {
          ss.opacity += 0.06;
          if (ss.opacity >= 0.9) { ss.opacity = 0.9; ss.fadeIn = false; }
        } else {
          ss.opacity -= 0.018;
        }

        const tailX = ss.x - ss.vx * (ss.len / ss.vx);
        const tailY = ss.y - ss.vy * (ss.len / ss.vx);
        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${ss.opacity})`);
        grad.addColorStop(0.3, `rgba(245,240,228,${ss.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(245,240,228,0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.stroke();

        ss.x += ss.vx;
        ss.y += ss.vy;

        if (ss.opacity <= 0 || ss.x > canvas.width + 100 || ss.y > canvas.height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
