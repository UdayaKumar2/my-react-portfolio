import React, { useState } from 'react';
import { Code2, Database, Layers, Network, Terminal } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

interface HeroFallbackVisualProps {
  reason?: 'loading' | 'unavailable';
}

export function HeroFallbackVisual({ reason = 'loading' }: HeroFallbackVisualProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      aria-label="Architectural Software Stack Visual"
      className="relative w-full h-full min-h-[380px] lg:min-h-[540px] rounded-2xl border border-slate-800/80 bg-[#10182A] overflow-hidden flex items-center justify-center p-6"
    >
      {/* Subtle architectural radial gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.14), transparent 55%), radial-gradient(circle at 75% 70%, rgba(139, 92, 246, 0.14), transparent 55%)',
        }}
      />

      {/* Crisp schematic SVG node layout + 3D Portrait */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 max-w-md w-full">
        {!imgError && (
          <div className="w-36 sm:w-44 aspect-[3/4] rounded-xl overflow-hidden border border-[#38BDF8]/40 shadow-2xl bg-[#080B16] shrink-0">
            <img
              src={PROFILE_DATA.portraitUrl}
              alt={`3D portrait of ${PROFILE_DATA.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        <svg
          viewBox="0 0 260 220"
          className="w-48 sm:w-52 h-auto shrink-0"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          <ellipse
            cx="130"
            cy="110"
            rx="105"
            ry="44"
            fill="none"
            stroke="url(#meshGrad)"
            strokeWidth="1.2"
            transform="rotate(-24 130 110)"
          />
          <ellipse
            cx="130"
            cy="110"
            rx="105"
            ry="44"
            fill="none"
            stroke="url(#meshGrad)"
            strokeWidth="1.2"
            transform="rotate(24 130 110)"
          />

          <rect
            x="55"
            y="65"
            width="150"
            height="90"
            rx="10"
            fill="#080B16"
            stroke="#38BDF8"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
          <line x1="55" y1="86" x2="205" y2="86" stroke="#1E293B" strokeWidth="1" />
          <rect x="70" y="98" width="75" height="6" rx="3" fill="#38BDF8" fillOpacity="0.55" />
          <rect x="70" y="112" width="110" height="6" rx="3" fill="#94A3B8" fillOpacity="0.35" />
          <rect x="70" y="126" width="88" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.55" />
        </svg>
      </div>

      {/* Subtle architectural node labels */}
      <div className="absolute inset-6 pointer-events-none flex flex-col justify-between z-20">
        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <span className="inline-flex items-center gap-1.5 font-mono">
            <Code2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            React · TypeScript
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono">
            <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
            ASP.NET Core · C#
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-[#94A3B8]">
          <span className="inline-flex items-center gap-1.5 font-mono">
            <Database className="w-3.5 h-3.5 text-[#38BDF8]" />
            SQL Server · EF Core
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono">
            {reason === 'loading' ? (
              <>
                <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
                Initializing 3D Viewport
              </>
            ) : (
              <>
                <Network className="w-3.5 h-3.5 text-[#8B5CF6]" />
                WPF · Docker · REST
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
