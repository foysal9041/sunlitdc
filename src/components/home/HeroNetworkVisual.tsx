import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getHomeDictionary } from "@/i18n/dictionaries/home";

interface PillNode {
  id: string;
  label: string;
  x: number;
  y: number;
  emphasis?: boolean;
}

const pills: PillNode[] = [
  { id: "fiber", label: "Fiber Network", x: 50, y: 8 },
  { id: "smart-home", label: "Smart Home", x: 23, y: 21 },
  { id: "monitoring", label: "24/7 Monitoring", x: 77, y: 21 },
  { id: "secure", label: "Secure Network", x: 13, y: 50 },
  { id: "business", label: "Business Internet", x: 87, y: 50 },
  { id: "real-ip", label: "Real IP", x: 23, y: 79 },
  { id: "bdix", label: "BDIX Access", x: 77, y: 79 },
  { id: "core", label: "Network Core", x: 50, y: 95, emphasis: true },
];

// Direct links between select nodes, layered on top of the center spokes —
// Fiber, Secure and Business Internet form their own small connected mesh.
const meshLinks: [string, string][] = [
  ["fiber", "secure"],
  ["fiber", "business"],
  ["secure", "business"],
];

function findPill(id: string) {
  return pills.find((p) => p.id === id)!;
}

export function HeroNetworkVisual({ locale }: { locale: Locale }) {
  const pillLabels = getHomeDictionary(locale).hero.pills;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[600px] py-6">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-electric-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-8 rounded-full bg-cyan-400/10 blur-[80px]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34e3f2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2f63ff" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="44" fill="none" stroke="#0a1130" strokeOpacity="0.07" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#0a1130" strokeOpacity="0.07" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="#0a1130" strokeOpacity="0.08" />

        {pills.map((pill, i) =>
          pill.emphasis ? (
            <line
              key={pill.id}
              x1="50"
              y1="50"
              x2={pill.x}
              y2={pill.y}
              stroke="#2f63ff"
              strokeOpacity="0.55"
              strokeWidth={0.6}
            />
          ) : (
            <line
              key={pill.id}
              x1="50"
              y1="50"
              x2={pill.x}
              y2={pill.y}
              stroke="url(#heroLine)"
              strokeWidth={0.35}
              strokeDasharray="1.6 1.8"
              strokeDashoffset={30}
              className="animate-dash"
              style={{ animationDelay: `${i * 0.18}s`, animationDuration: "4s" }}
            />
          )
        )}

        {/* Direct mesh links between Fiber, Secure and Business Internet —
            a small interconnected triangle layered over the center spokes. */}
        {meshLinks.map(([a, b], i) => {
          const from = findPill(a);
          const to = findPill(b);
          return (
            <line
              key={`mesh-${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#5c85ff"
              strokeOpacity="0.3"
              strokeWidth={0.3}
              strokeDasharray="1.2 1.6"
              strokeDashoffset={20}
              className="animate-dash"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: "3.6s" }}
            />
          );
        })}
        {meshLinks.map(([a, b], i) => {
          const from = findPill(a);
          const to = findPill(b);
          return (
            <circle key={`mesh-pulse-${a}-${b}`} r={0.8} fill="#5c85ff" style={{ filter: "drop-shadow(0 0 2px #5c85ff)" }}>
              <animateMotion
                path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                dur="2.8s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}

        {/* Traveling light pulses — data flowing outward through fiber, like the
            reference site's animated links, on every connection including the core. */}
        {pills.map((pill, i) => (
          <circle
            key={`pulse-${pill.id}`}
            r={pill.emphasis ? 1.5 : 1}
            fill={pill.emphasis ? "#7cedf5" : "#34e3f2"}
            style={{ filter: "drop-shadow(0 0 2.5px #7cedf5)" }}
          >
            <animateMotion
              path={`M 50 50 L ${pill.x} ${pill.y}`}
              dur={pill.emphasis ? "1.6s" : "2.4s"}
              begin={`${i * 0.28}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {pills.map((pill, i) => (
        <div
          key={pill.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
          style={{ left: `${pill.x}%`, top: `${pill.y}%`, animationDelay: `${i * 0.35}s`, animationDuration: "5.5s" }}
        >
          <span className="glass whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold text-navy-950 shadow-sm sm:px-3.5 sm:py-1.5 sm:text-xs">
            {pillLabels[pill.id as keyof typeof pillLabels] ?? pill.label}
          </span>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 sm:w-44">
        <div className="glass relative flex items-center justify-center rounded-2xl px-5 py-4 shadow-[0_0_50px_-12px_rgba(47,99,255,0.45)]">
          <span
            className="absolute -right-1 -top-1 h-3 w-3 animate-led-blink rounded-full bg-emerald-400 text-emerald-400"
            aria-hidden="true"
          />
          <Image
            src="/logo.png"
            alt="Sunlit Network"
            width={512}
            height={199}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
