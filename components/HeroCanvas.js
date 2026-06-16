'use client';
import { useEffect, useRef } from 'react';

const NODE_COUNT = 58;
const CONNECT_DIST = 0.72; // chord distance on unit sphere

function randSpherePoint() {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return [Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)];
}

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let rotY = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // nodes: [bx, by, bz, pulsePhase, pulseSpeed]
    const nodes = Array.from({ length: NODE_COUNT }, () => {
      const [bx, by, bz] = randSpherePoint();
      return { bx, by, bz, phase: Math.random() * Math.PI * 2, phaseSpeed: Math.random() * 0.018 + 0.006 };
    });

    // pre-compute connections
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isMobile = canvas.width < 640;
      const cx = isMobile ? canvas.width * 0.5 : canvas.width * 0.74;
      const cy = canvas.height * 0.5;
      const r = isMobile
        ? Math.min(canvas.width, canvas.height) * 0.36
        : Math.min(canvas.height * 0.52, canvas.width * 0.32);

      // globe grid lines
      const gridAlpha = 0.055;
      // latitude rings
      for (const lat of [-0.6, -0.3, 0, 0.3, 0.6]) {
        const ringR = Math.sqrt(1 - lat * lat);
        ctx.beginPath();
        let started = false;
        for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.04) {
          const p = project(ringR * Math.cos(a), lat, ringR * Math.sin(a), cx, cy, r);
          if (p.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(14,13,10,${gridAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      // meridians
      for (let lon = 0; lon < Math.PI * 2; lon += Math.PI / 5) {
        ctx.beginPath();
        let started = false;
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2 + 0.05; lat += 0.04) {
          const p = project(Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon), cx, cy, r);
          if (p.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(14,13,10,${gridAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // project nodes
      const proj = nodes.map(n => project(n.bx, n.by, n.bz, cx, cy, r));

      // connections
      connections.forEach(([i, j]) => {
        const a = proj[i], b = proj[j];
        const minZ = Math.min(a.z, b.z);
        if (minZ < -0.15) return;
        const alpha = Math.max(0, Math.min(a.z, b.z) + 0.3) * 0.22;

        // arc: pull midpoint slightly outward
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const dx = mx - cx, dy = my - cy;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const cpx = mx + (dx / d) * 10, cpy = my + (dy / d) * 10;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);
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
        const pulse = 0.65 + Math.sin(n.phase) * 0.35;
        const nr = (1.2 + depth * 1.8) * pulse;
        const alpha = depth * 0.7;

        // glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, nr * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,13,10,${alpha * 0.06})`;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, nr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,13,10,${alpha * 0.85})`;
        ctx.fill();
      });

      rotY += 0.0008;
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
