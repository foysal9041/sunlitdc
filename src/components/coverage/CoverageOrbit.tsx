import Image from "next/image";
import type { PublicDistrictCoverage } from "@/lib/coverage";
import type { Locale } from "@/i18n/config";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";

/**
 * Stylised relative positions for known Khulna Division districts — a rough
 * map layout for visual orientation only, not tied to real GPS/PoP
 * coordinates (those stay private in the admin panel). Laid out on an even
 * hexagon (60° apart, fixed radius) so labels always have consistent
 * breathing room and never crowd each other, while still roughly matching
 * each district's real compass direction relative to the others. Any
 * district not listed here falls back to the same even radial spacing so
 * the visualization keeps working as new districts are added.
 */
const HEX_RADIUS = 40;

function hexPoint(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 50 + HEX_RADIUS * Math.cos(rad), y: 50 + HEX_RADIUS * Math.sin(rad) };
}

const DISTRICT_POSITIONS: Record<string, { x: number; y: number }> = {
  Chuadanga: hexPoint(-90), // north
  Jhenaidah: hexPoint(-30), // northeast
  Narail: hexPoint(30), // southeast
  Khulna: hexPoint(90), // south
  Satkhira: hexPoint(150), // southwest
  Jashore: hexPoint(210), // northwest
};

function positionFor(district: string, index: number, total: number) {
  const curated = DISTRICT_POSITIONS[district];
  if (curated) return curated;

  const angle = (index / total) * 360 - 90;
  return hexPoint(angle);
}

export function CoverageOrbit({ districts, locale }: { districts: PublicDistrictCoverage[]; locale: Locale }) {
  const t = getPagesDictionary(locale).coverage;
  const total = Math.max(districts.length, 1);
  const positions = districts.map((d, i) => ({ ...positionFor(d.district, i, total), d }));

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[600px]">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-electric-500/10 blur-[100px]" />

      {/* Rotating radar sweep beam */}
      <div className="pointer-events-none absolute inset-[8%] overflow-hidden rounded-full">
        <div
          className="absolute inset-0 animate-radar-spin"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(47,99,255,0.28) 0deg, rgba(47,99,255,0) 55deg, transparent 360deg)",
          }}
        />
      </div>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="orbitLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1fc9dd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2f63ff" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Abstract region silhouette — a stylised map outline, not a literal one */}
        <path
          d="M18 34 C 9 44, 10 57, 19 66 C 14 79, 23 91, 40 93 C 57 96, 74 89, 82 75 C 92 70, 93 54, 85 44 C 91 30, 80 16, 62 13 C 46 7, 26 11, 18 24 Z"
          fill="rgba(47,99,255,0.06)"
          stroke="rgba(47,99,255,0.3)"
          strokeWidth={0.5}
        />

        <circle cx="50" cy="50" r="44" fill="none" stroke="#0a1130" strokeOpacity="0.07" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="#0a1130" strokeOpacity="0.08" />

        {positions.map(({ x, y, d }, i) => (
          <line
            key={d.district}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="url(#orbitLine)"
            strokeWidth={0.4}
            strokeDasharray="2 2.4"
            strokeDashoffset={40}
            className="animate-dash"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "4.5s" }}
          />
        ))}

        {/* Traveling light pulses — data flowing out to every district, on every line */}
        {positions.map(({ x, y, d }, i) => (
          <circle key={`pulse-${d.district}`} r={1} fill="#2f63ff" style={{ filter: "drop-shadow(0 0 2.5px #2f63ff)" }}>
            <animateMotion path={`M 50 50 L ${x} ${y}`} dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* Expanding ripple rings from the hub */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 sm:h-28 sm:w-28">
        <span className="absolute inset-0 animate-ripple rounded-full border border-electric-400/50" style={{ animationDelay: "0s" }} />
        <span className="absolute inset-0 animate-ripple rounded-full border border-electric-400/50" style={{ animationDelay: "1s" }} />
        <span className="absolute inset-0 animate-ripple rounded-full border border-electric-400/50" style={{ animationDelay: "2s" }} />
      </div>

      <div className="glass absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 p-3 shadow-[0_0_60px_-10px_rgba(47,99,255,0.4)] sm:h-28 sm:w-28">
        <Image src="/logo.png" alt="Sunlit Network" width={512} height={199} className="h-auto w-full object-contain" priority />
      </div>

      {positions.map(({ x, y, d }, i) => (
        <div
          key={d.district}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <span className="relative flex h-3 w-3">
            <span
              className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-electric-500 opacity-60"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-electric-500" />
            <span
              className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-led-blink rounded-full bg-emerald-400 text-emerald-400"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          </span>
          <span className="whitespace-nowrap rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 px-1.5 py-0.5 text-[10px] shadow-sm sm:px-2.5 sm:py-1 sm:text-xs">
            <span className="font-semibold text-navy-950 dark:text-white">{d.districtLabel}</span>
            <span className="ml-1 text-electric-600 dark:text-cyan-300 sm:ml-1.5">
              {d.areaCount} {d.areaCount === 1 ? t.area : t.areas}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
