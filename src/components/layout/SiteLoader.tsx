"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SEEN_KEY = "sunlit-loader-seen";
const SHOW_MS = 2300;
const FADE_MS = 650;

// Runs before first paint so returning visitors in the same session never see the overlay flash.
const SKIP_SCRIPT = `try{if(sessionStorage.getItem("${SEEN_KEY}")){document.documentElement.classList.add("loader-seen");document.documentElement.dataset.ready="1"}}catch(e){}document.documentElement.classList.add("js")`;

export function SiteLoader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // Already shown this session: CSS (html.loader-seen) hides the overlay.
    if (root.classList.contains("loader-seen")) return;
    root.style.overflow = "hidden";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = window.setTimeout(() => {
      setDone(true);
      root.dataset.ready = "1";
    }, reduce ? 300 : SHOW_MS);
    const t2 = window.setTimeout(
      () => {
        setGone(true);
        root.style.overflow = "";
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
      },
      (reduce ? 300 : SHOW_MS) + FADE_MS
    );
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      root.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
      <div className={`site-loader${done ? " is-done" : ""}`} role="status" aria-live="polite" aria-label="Loading">
        <span className="site-loader__mark">
          <Image src="/logo.png" alt="Sunlit Network" width={512} height={199} priority className="h-auto w-full" />
        </span>

        <svg className="site-loader__path" viewBox="0 0 240 90" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="loaderFlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1fc9dd" />
              <stop offset="55%" stopColor="#5c85ff" />
              <stop offset="100%" stopColor="#2f63ff" />
            </linearGradient>
          </defs>
          <path
            className="site-loader__line"
            d="M12 66 L52 66 L74 30 L110 30 L132 66 L168 66 L190 22 L228 22"
            fill="none"
            stroke="url(#loaderFlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[
            [52, 66, 4, 0.5],
            [110, 30, 4, 0.9],
            [168, 66, 4, 1.25],
            [228, 22, 6, 1.6],
          ].map(([cx, cy, r, delay]) => (
            <circle
              key={`${cx}-${cy}`}
              className="site-loader__node"
              cx={cx}
              cy={cy}
              r={r}
              fill={r === 6 ? "#5c85ff" : "#fff"}
              stroke="#5c85ff"
              strokeWidth="1.5"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </svg>

        <span className="site-loader__caption">Connecting Khulna</span>
        <span className="site-loader__bar" aria-hidden="true" />
      </div>
    </>
  );
}
