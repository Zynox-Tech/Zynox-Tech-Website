'use client';

import { useEffect, useRef, useState } from 'react';

interface OrbNode {
  id: number;
  label: string;
  color: string;
  glowColor: string;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  pulsePhase: number;
  layer: number; // 0 = inner ring, 1 = outer ring
}

interface DataParticle {
  srcId: number;
  tgtId: number;
  progress: number;
  speed: number;
  color: string;
}

const NODES: Pick<OrbNode, 'label' | 'color' | 'glowColor' | 'layer'>[] = [
  { label: 'React',       color: '#61DAFB', glowColor: 'rgba(97,218,251,0.4)',   layer: 0 },
  { label: 'TypeScript',  color: '#3178C6', glowColor: 'rgba(49,120,198,0.45)',  layer: 0 },
  { label: 'Node.js',     color: '#68A063', glowColor: 'rgba(104,160,99,0.4)',   layer: 0 },
  { label: 'Swift',       color: '#F05138', glowColor: 'rgba(240,81,56,0.4)',    layer: 0 },
  { label: 'Next.js',     color: '#E0E0E0', glowColor: 'rgba(224,224,224,0.25)', layer: 1 },
  { label: 'Rust',        color: '#F5A623', glowColor: 'rgba(245,166,35,0.4)',   layer: 1 },
  { label: 'PostgreSQL',  color: '#4DA6FF', glowColor: 'rgba(77,166,255,0.4)',   layer: 1 },
  { label: 'Unity',       color: '#C961F2', glowColor: 'rgba(201,97,242,0.4)',   layer: 1 },
  { label: 'Docker',      color: '#2496ED', glowColor: 'rgba(36,150,237,0.4)',   layer: 1 },
];

// Connections: index pairs
const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 0],          // inner ring square
  [4, 5], [5, 6], [6, 7], [7, 8], [8, 4],  // outer ring pentagon
  [0, 4], [1, 5], [2, 6], [3, 7],           // cross-layer spokes
];

export default function TechOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const nodesRef  = useRef<OrbNode[]>([]);
  const ptclRef   = useRef<DataParticle[]>([]);
  const timeRef   = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      init(w, h);
    };

    const init = (w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const base = Math.min(w, h) * 0.5; // base radius = 50% of shortest side
      const innerR = base * 0.42;
      const outerR = base * 0.78;

      nodesRef.current = NODES.map((n, i) => {
        const isInner = n.layer === 0;
        const count   = isInner ? 4 : 5;
        const idx     = isInner ? i : i - 4;
        const angle   = (idx / count) * Math.PI * 2 + (isInner ? 0 : Math.PI / 5);
        const speed   = isInner
          ? 0.00028 * (i % 2 === 0 ? 1 : -1)
          : 0.00018 * (i % 2 === 0 ? -1 : 1);
        return {
          ...n,
          id: i,
          orbitAngle:  angle,
          orbitRadius: isInner ? innerR : outerR,
          orbitSpeed:  speed,
          pulsePhase:  Math.random() * Math.PI * 2,
        };
      });
    };

    resize();
    window.addEventListener('resize', resize);

    let spawnClock = 0;

    const spawnParticle = () => {
      if (ptclRef.current.length >= 18) return;
      const [a, b] = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      const src = nodesRef.current[a];
      if (!src) return;
      ptclRef.current.push({
        srcId:    a,
        tgtId:    b,
        progress: 0,
        speed:    0.006 + Math.random() * 0.005,
        color:    src.color,
      });
    };

    const getNodePos = (id: number, w: number, h: number) => {
      const n = nodesRef.current[id];
      return {
        x: w / 2 + Math.cos(n.orbitAngle) * n.orbitRadius,
        y: h / 2 + Math.sin(n.orbitAngle) * n.orbitRadius,
      };
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Advance orbits
      nodesRef.current.forEach(n => {
        n.orbitAngle += n.orbitSpeed * 60;
      });

      // Spawn particles
      spawnClock += 0.016;
      if (spawnClock > 0.4) { spawnParticle(); spawnClock = 0; }

      // ── Draw orbit tracks ──
      [0.42, 0.78].forEach((frac, li) => {
        const base = Math.min(w, h) * 0.5;
        const r = base * frac;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = li === 0 ? 'rgba(79,140,255,0.08)' : 'rgba(201,97,242,0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ── Draw connections ──
      CONNECTIONS.forEach(([a, b]) => {
        const posA = getNodePos(a, w, h);
        const posB = getNodePos(b, w, h);
        const nA = nodesRef.current[a];
        const nB = nodesRef.current[b];
        const g = ctx.createLinearGradient(posA.x, posA.y, posB.x, posB.y);
        g.addColorStop(0, nA.color + '28');
        g.addColorStop(1, nB.color + '28');
        ctx.beginPath();
        ctx.moveTo(posA.x, posA.y);
        ctx.lineTo(posB.x, posB.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // ── Central core glow ──
      const coreSize = Math.min(w, h) * 0.075;
      const glowR = coreSize * 2.5;
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      coreGlow.addColorStop(0, 'rgba(79,140,255,0.18)');
      coreGlow.addColorStop(0.5, 'rgba(201,97,242,0.07)');
      coreGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // ── Central hexagon ──
      const slowRot  = t * 0.18; // slow continuous rotation
      const pulse    = 1 + Math.sin(t * 1.8) * 0.04;
      const hs       = coreSize * pulse;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(slowRot);

      // ── Multi-layer outer glow ──
      const hGlow1 = ctx.createRadialGradient(0, 0, 0, 0, 0, hs * 3.2);
      hGlow1.addColorStop(0,   'rgba(79,140,255,0.28)');
      hGlow1.addColorStop(0.5, 'rgba(201,97,242,0.12)');
      hGlow1.addColorStop(1,   'transparent');
      ctx.fillStyle = hGlow1;
      ctx.beginPath();
      ctx.arc(0, 0, hs * 3.2, 0, Math.PI * 2);
      ctx.fill();

      // ── Rotating outer ring ──
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 - Math.PI / 6;
        k === 0 ? ctx.moveTo(Math.cos(a)*hs*1.55, Math.sin(a)*hs*1.55)
                : ctx.lineTo(Math.cos(a)*hs*1.55, Math.sin(a)*hs*1.55);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(79,140,255,0.18)';
      ctx.lineWidth   = 0.8;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── Hex body ──
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 - Math.PI / 6;
        k === 0 ? ctx.moveTo(Math.cos(a)*hs, Math.sin(a)*hs)
                : ctx.lineTo(Math.cos(a)*hs, Math.sin(a)*hs);
      }
      ctx.closePath();
      const hFill = ctx.createLinearGradient(-hs, -hs, hs, hs);
      hFill.addColorStop(0, '#3a75ff');
      hFill.addColorStop(0.5, '#7B5FFF');
      hFill.addColorStop(1, '#C961F2');
      ctx.fillStyle = hFill;
      ctx.fill();

      // ── Shimmer sweep across face ──
      const sweep = ((Math.sin(t * 0.9) + 1) / 2); // 0→1 oscillate
      const swX   = -hs + sweep * hs * 2.4;
      const shimmer = ctx.createLinearGradient(swX - hs*0.6, 0, swX + hs*0.6, 0);
      shimmer.addColorStop(0,   'rgba(255,255,255,0)');
      shimmer.addColorStop(0.5, 'rgba(255,255,255,0.15)');
      shimmer.addColorStop(1,   'rgba(255,255,255,0)');
      // clip to hex shape before drawing shimmer
      ctx.save();
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 - Math.PI / 6;
        k === 0 ? ctx.moveTo(Math.cos(a)*hs, Math.sin(a)*hs)
                : ctx.lineTo(Math.cos(a)*hs, Math.sin(a)*hs);
      }
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = shimmer;
      ctx.fillRect(-hs, -hs, hs * 2, hs * 2);
      ctx.restore();

      // ── Hex border with glow ──
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 - Math.PI / 6;
        k === 0 ? ctx.moveTo(Math.cos(a)*hs, Math.sin(a)*hs)
                : ctx.lineTo(Math.cos(a)*hs, Math.sin(a)*hs);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(160,200,255,0.45)';
      ctx.lineWidth   = 1.2;
      ctx.stroke();

      // ── Draw O symbol — animated neon brand logo ──
      ctx.rotate(-slowRot); // keep logo upright while hex rotates

      const R_outer = hs * 0.44;
      const R_inner = hs * 0.28;
      const R_dot   = hs * 0.14;

      const breathe = 0.75 + Math.sin(t * 2.2) * 0.15;
      
      const drawLogoO = (offsetX = 0, offsetY = 0, colorOverride?: string, dotColorOverride?: string) => {
        // Draw the outer white ring with hole
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, R_outer, 0, Math.PI * 2, false);
        ctx.arc(offsetX, offsetY, R_inner, 0, Math.PI * 2, true);
        ctx.fillStyle = colorOverride || `rgba(255, 255, 255, ${breathe})`;
        ctx.fill();

        // Draw the center beige dot
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, R_dot, 0, Math.PI * 2);
        ctx.fillStyle = dotColorOverride || '#C4B5A5';
        ctx.fill();
      };

      // ── Shadow/glow for the base O ──
      ctx.shadowColor = 'rgba(140, 180, 255, 0.5)';
      ctx.shadowBlur  = hs * 0.18;
      drawLogoO();
      ctx.shadowBlur = 0;

      // ── Traveling light racing around the O ──
      const raceSpeed = 0.6; // cycles per second
      const angleStart = (t * raceSpeed * Math.PI * 2) % (Math.PI * 2);
      const trailLength = 0.8; // length of trail in radians
      
      ctx.save();
      ctx.beginPath();
      // Define path for the ring to clip the racing trail
      ctx.arc(0, 0, Math.max(0, R_outer + 1), 0, Math.PI * 2, false);
      ctx.arc(0, 0, Math.max(0, R_inner - 1), 0, Math.PI * 2, true);
      ctx.clip();
      
      // Draw racing trail gradient
      const grad = ctx.createLinearGradient(
        Math.cos(angleStart - trailLength) * R_outer, Math.sin(angleStart - trailLength) * R_outer,
        Math.cos(angleStart) * R_outer, Math.sin(angleStart) * R_outer
      );
      grad.addColorStop(0, 'rgba(100, 160, 255, 0)');
      grad.addColorStop(1, 'rgba(180, 220, 255, 0.7)');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = Math.max(0.1, (R_outer - R_inner) + 2);
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0, (R_outer + R_inner) / 2), angleStart - trailLength, angleStart);
      ctx.stroke();
      
      // Racing dot head
      const dotX = Math.cos(angleStart) * (R_outer + R_inner) / 2;
      const dotY = Math.sin(angleStart) * (R_outer + R_inner) / 2;
      const dotR = (R_outer - R_inner) * 0.7;
      
      const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, Math.max(0, dotR * 2.2));
      dotGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      dotGlow.addColorStop(0.3, 'rgba(140, 200, 255, 0.8)');
      dotGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = dotGlow;
      ctx.beginPath();
      ctx.arc(dotX, dotY, Math.max(0, dotR * 2.2), 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();

      // ── Chromatic glitch effect (fires every ~4s) ──
      const glitchPhase = (t * 0.25) % 1;
      if (glitchPhase > 0.88) {
        const glitchIntensity = Math.sin((glitchPhase - 0.88) / 0.12 * Math.PI);
        const offset = hs * 0.05 * glitchIntensity;
        ctx.save();
        ctx.globalAlpha = 0.55 * glitchIntensity;
        
        // Red offset
        drawLogoO(offset, 0, 'rgba(255, 60, 60, 0.8)', 'rgba(255, 100, 100, 0.8)');
        // Cyan offset
        drawLogoO(-offset, 0, 'rgba(60, 200, 255, 0.8)', 'rgba(100, 220, 255, 0.8)');
        
        ctx.restore();
      }

      ctx.restore();

      // ── Draw nodes ──
      nodesRef.current.forEach(node => {
        const pos = getNodePos(node.id, w, h);
        const nodeR = Math.min(w, h) * (node.layer === 0 ? 0.052 : 0.048);
        const pulse2 = 1 + Math.sin(t * 1.6 + node.pulsePhase) * 0.055;
        const r = nodeR * pulse2;

        // glow halo
        const halo = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r * 2.4);
        halo.addColorStop(0, node.glowColor);
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // circle bg
        const bg = ctx.createRadialGradient(pos.x - r*0.25, pos.y - r*0.25, 0, pos.x, pos.y, r);
        bg.addColorStop(0, '#1C2029');
        bg.addColorStop(1, '#0D0F14');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.strokeStyle = node.color + 'AA';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // label
        ctx.fillStyle = node.color;
        const fs = Math.max(8, Math.round(r * 0.52));
        ctx.font = `600 ${fs}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const label = node.label.length > 6 ? node.label.slice(0, 5) + '.' : node.label;
        ctx.fillText(label, pos.x, pos.y);
      });

      // ── Draw data particles ──
      ptclRef.current = ptclRef.current.filter(p => {
        p.progress += p.speed;
        if (p.progress >= 1) return false;

        const srcPos = getNodePos(p.srcId, w, h);
        const tgtPos = getNodePos(p.tgtId, w, h);
        const px = srcPos.x + (tgtPos.x - srcPos.x) * p.progress;
        const py = srcPos.y + (tgtPos.y - srcPos.y) * p.progress;

        const alpha = p.progress < 0.12 ? p.progress / 0.12
                    : p.progress > 0.88 ? (1 - p.progress) / 0.12
                    : 1;

        const pGlow = ctx.createRadialGradient(px, py, 0, px, py, 5);
        pGlow.addColorStop(0, p.color);
        pGlow.addColorStop(1, 'transparent');
        ctx.globalAlpha = alpha * 0.85;
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  );
}
