'use client';
import { useEffect, useRef } from 'react';

const NODE_COUNT = 42;
const CONNECT_DIST = 0.75;

function randSpherePoint() {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return [Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)];
}

export default function SpaceOrb() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let rotY = 0;

    const dpr = window.devicePixelRatio || 1;
    const SIZE = canvas.offsetWidth;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const nodes = Array.from({ length: NODE_COUNT }, () => {
      const [bx, by, bz] = randSpherePoint();
      return { bx, by, bz, phase: Math.random() * Math.PI * 2, phaseSpeed: Math.random() * 0.016 + 0.005 };
    });

    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].bx - nodes[j].bx;
        const dy = nodes[i].by - nodes[j].by;
        const dz = nodes[i].bz - nodes[j].bz;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT_DIST) {
          connections.push([i, j]);
        }
      }
    }

    const project = (bx, by, bz, cx, cy, r) => {
      const cos = Math.cos(rotY), sin = Math.sin(rotY);
      const rx = bx * cos + bz * sin;
      const rz = -bx * sin + bz * cos;
      return { x: cx + rx * r, y: cy + by * r, z: rz };
    };

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const cx = SIZE / 2, cy = SIZE / 2, r = SIZE * 0.38;

      // subtle radial glow behind globe
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.1);
      glow.addColorStop(0, 'rgba(14,13,10,0.04)');
      glow.addColorStop(1, 'rgba(14,13,10,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // grid lines
      const gridA = 0.07;
      for (const lat of [-0.5, 0, 0.5]) {
        const ringR = Math.sqrt(1 - lat * lat);
        ctx.beginPath();
        let started = false;
        for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.04) {
          const p = project(ringR * Math.cos(a), lat, ringR * Math.sin(a), cx, cy, r);
          if (p.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(14,13,10,${gridA})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      for (let lon = 0; lon < Math.PI * 2; lon += Math.PI / 4) {
        ctx.beginPath();
        let started = false;
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2 + 0.05; lat += 0.04) {
          const p = project(Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon), cx, cy, r);
          if (p.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(14,13,10,${gridA})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      const proj = nodes.map(n => project(n.bx, n.by, n.bz, cx, cy, r));

      // connections
      connections.forEach(([i, j]) => {
        const a = proj[i], b = proj[j];
        if (Math.min(a.z, b.z) < -0.15) return;
        const alpha = Math.max(0, Math.min(a.z, b.z) + 0.3) * 0.28;
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const dx = mx - cx, dy = my - cy;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx + (dx / d) * 8, my + (dy / d) * 8, b.x, b.y);
        ctx.strokeStyle = `rgba(14,13,10,${alpha})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      });

      // nodes
      nodes.forEach((n, i) => {
        const p = proj[i];
        if (p.z < -0.15) return;
        n.phase += n.phaseSpeed;
        const depth = (p.z + 1) / 2;
        const pulse = 0.7 + Math.sin(n.phase) * 0.3;
        const nr = (1.0 + depth * 1.6) * pulse;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nr * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,13,10,${depth * 0.06})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, nr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,13,10,${depth * 0.75})`;
        ctx.fill();
      });

      rotY += 0.0008;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', aspectRatio: '1', display: 'block', maxWidth: '320px' }}
    />
  );
}
