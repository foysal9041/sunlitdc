"use client";

import { useEffect } from "react";

/**
 * Tracks the pointer over any `.surface-card` and exposes its position as
 * --spot-x / --spot-y so the CSS can paint a soft spotlight under the cursor.
 * One delegated listener for the whole page; skipped on touch devices.
 */
export function CardSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".surface-card");
      if (!card) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
