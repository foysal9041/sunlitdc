"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Pulse {
  a: number;
  b: number;
  t: number;
  speed: number;
  warm: boolean;
}

const LINK_DIST = 150;

/**
 * Ambient "fiber network" backdrop: drifting nodes joined by thin links, with
 * small light pulses (cyan and sun-amber) travelling along them. The cursor
 * lights up nearby links. Pauses off-screen and renders one static frame when
 * the visitor prefers reduced motion.
 */
export function FiberCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;
    let lastSpawn = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(22, Math.min(64, Math.round((w * h) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.2 + Math.random() * 1.6,
      }));
      pulses.length = 0;
    };

    const draw = (now: number) => {
      const dark = document.documentElement.classList.contains("dark");
      const line = dark ? "90,219,233" : "47,99,255";
      const dot = dark ? "167,236,243" : "47,99,255";

      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d > LINK_DIST) continue;
          links.push([i, j]);
          const mx = (nodes[i].x + nodes[j].x) / 2 - mouse.x;
          const my = (nodes[i].y + nodes[j].y) / 2 - mouse.y;
          const near = Math.max(0, 1 - Math.hypot(mx, my) / 170);
          const alpha = (1 - d / LINK_DIST) * (dark ? 0.32 : 0.26) + near * 0.4;
          ctx.strokeStyle = `rgba(${line},${alpha})`;
          ctx.lineWidth = 0.7 + near * 0.9;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${dot},${dark ? 0.7 : 0.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) {
        if (now - lastSpawn > 520 && links.length && pulses.length < 14) {
          const [a, b] = links[Math.floor(Math.random() * links.length)];
          pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.012, warm: Math.random() < 0.28 });
          lastSpawn = now;
        }
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.t += p.speed;
          if (p.t >= 1) {
            pulses.splice(i, 1);
            continue;
          }
          const A = nodes[p.a];
          const B = nodes[p.b];
          const x = A.x + (B.x - A.x) * p.t;
          const y = A.y + (B.y - A.y) * p.t;
          const rgb = p.warm ? "255,185,56" : dark ? "90,219,233" : "47,99,255";
          const g = ctx.createRadialGradient(x, y, 0, x, y, 11);
          g.addColorStop(0, `rgba(${rgb},0.95)`);
          g.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 11, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
