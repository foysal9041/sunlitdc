"use client";

import { useEffect, useRef, useState } from "react";
import type { PerformanceMetric } from "@/types";
import { formatNumber } from "@/lib/utils";

export function MetricBar({ metric }: { metric: PerformanceMetric }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(Math.min((metric.value / metric.max) * 100, 100));
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [metric]);

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{metric.label}</span>
        <span className="text-lg font-bold text-navy-950 dark:text-white">
          {metric.display ?? (
            <>
              {formatNumber(metric.value)}
              <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">{metric.unit}</span>
            </>
          )}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-linear-to-r from-electric-500 to-cyan-400 transition-[width] duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
