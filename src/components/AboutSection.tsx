import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Code2, Cpu, Database, Orbit, Layers, Sparkles, Server, User } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { RevealSection, TiltCard3D, TiltLayer3D } from './MotionPrimitives';

type PortraitStageMode = 'orbit' | 'depth' | 'studio';

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  frontend: <Code2 className="w-5 h-5" />,
  backend: <Server className="w-5 h-5" />,
  desktop: <Cpu className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
};

const STAGE_MODES: { id: PortraitStageMode; label: string; icon: React.ReactNode }[] = [
  { id: 'orbit', label: 'Kinetic Orbit', icon: <Orbit className="w-3.5 h-3.5" /> },
  { id: 'depth', label: 'Spatial Depth', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'studio', label: 'Studio Frame', icon: <Sparkles className="w-3.5 h-3.5" /> },
];

export function AboutSection() {
  const [selectedId, setSelectedId] = useState<string>(
    PROFILE_DATA.aboutPillars[0].id
  );
  const [stageMode, setStageMode] = useState<PortraitStageMode>('orbit');
  const [imgError, setImgError] = useState(false);
  const prefersReduced = useReducedMotion();

  const activePillar =
    PROFILE_DATA.aboutPillars.find((p) => p.id === selectedId) ??
    PROFILE_DATA.aboutPillars[0];

  return (
    <section id="about" className="relative z-10 py-20 lg:py-28 border-t border-slate-800/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Creative Multi-Layer 3D Portrait Stage */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <TiltCard3D
                maxTilt={11}
                className="surface-panel glow-border-hover rounded-2xl p-3 flex flex-col justify-between bg-[#0B1120]"
              >
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#080B16] border border-slate-800/70">
                  {/* Layer 0: Deep Parallax Aura & Grid */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-arch-grid opacity-55"
                    style={{ transform: 'translateZ(-14px)' }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        stageMode === 'depth'
                          ? 'radial-gradient(circle at 25% 25%, rgba(56,189,248,0.28), transparent 55%), radial-gradient(circle at 80% 75%, rgba(139,92,246,0.28), transparent 55%)'
                          : 'radial-gradient(circle at 50% 35%, rgba(56,189,248,0.18), transparent 65%)',
                    }}
                  />

                  {/* Layer 1: Kinetic Rotating Orbital Rings (Active in Orbit & Depth modes) */}
                  {!prefersReduced && stageMode !== 'studio' && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex items-center justify-center z-10"
                      style={{ transform: 'translateZ(12px)' }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                        className="w-[88%] aspect-square rounded-full border border-[#38BDF8]/25 relative"
                      >
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#38BDF8]" />
                      </motion.div>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        className="absolute w-[72%] aspect-square rounded-full border border-dashed border-[#8B5CF6]/30"
                      >
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8B5CF6]" />
                      </motion.div>
                    </div>
                  )}

                  {/* Layer 2: 3D Stylized Portrait */}
                  <TiltLayer3D depth={22} className="relative w-full h-full z-20">
                    {imgError ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#10182A] to-[#080B16]">
                        <User className="w-12 h-12 text-[#38BDF8] mb-3" />
                        <span className="font-display font-bold text-base text-[#F8FAFC]">
                          {PROFILE_DATA.name}
                        </span>
                        <span className="text-xs text-[#94A3B8] mt-1">
                          {PROFILE_DATA.role}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={PROFILE_DATA.portraitUrl}
                        alt={`3D stylized portrait of ${PROFILE_DATA.name}`}
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                        className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                          stageMode === 'depth' ? 'scale-[1.04]' : 'scale-100'
                        }`}
                      />
                    )}
                  </TiltLayer3D>

                  {/* Measured dark scrim */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080B16] via-[#080B16]/75 to-transparent z-20"
                  />

                  {/* Layer 3: Spatial Corner Framing & Floating Nameplate */}
                  {stageMode === 'depth' && (
                    <TiltLayer3D
                      depth={38}
                      className="pointer-events-none absolute inset-3 z-30"
                    >
                      <div className="w-5 h-5 border-t-2 border-l-2 border-[#38BDF8]/70 rounded-tl" />
                      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#8B5CF6]/70 rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#8B5CF6]/70 rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#38BDF8]/70 rounded-br" />
                    </TiltLayer3D>
                  )}

                  <TiltLayer3D
                    depth={44}
                    className="absolute inset-x-0 bottom-0 p-5 z-30 pointer-events-none"
                  >
                    <div className="font-display text-lg font-bold text-[#F8FAFC]">
                      {PROFILE_DATA.name}
                    </div>
                    <div className="mt-0.5 text-xs font-mono text-[#38BDF8]">
                      {PROFILE_DATA.role}
                    </div>
                  </TiltLayer3D>
                </div>

                {/* Interactive Stage Mode Selector */}
                <div className="pt-3 px-1 flex flex-wrap items-center justify-between gap-2">
                  <div
                    role="tablist"
                    aria-label="3D Portrait Presentation Mode"
                    className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#080B16] border border-slate-800/80 w-full justify-between"
                  >
                    {STAGE_MODES.map((mode) => {
                      const active = stageMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setStageMode(mode.id)}
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? 'bg-[#38BDF8] text-[#080B16] font-semibold'
                              : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                          }`}
                        >
                          {mode.icon}
                          <span>{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </TiltCard3D>
            </div>

            {/* Right Column: Summary + Interactive Engineering Capabilities */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-8">
              <div>
                <p className="text-xs font-mono text-[#38BDF8] mb-3">
                  About Me
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC] leading-tight">
                  Full-Stack Engineering Across Web, Desktop, and Data Layers
                </h2>
                <p className="mt-4 text-base text-[#94A3B8] leading-relaxed max-w-3xl">
                  {PROFILE_DATA.summary}
                </p>
              </div>

              {/* Interactive Engineering Capabilities Architecture */}
              <div className="surface-glass rounded-2xl p-6 sm:p-7">
                <div className="text-xs font-mono text-[#94A3B8] mb-4">
                  Core Engineering Capabilities
                </div>

                <div
                  role="tablist"
                  aria-label="Engineering Capabilities"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {PROFILE_DATA.aboutPillars.map((pillar) => {
                    const isActive = pillar.id === selectedId;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedId(pillar.id)}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#38BDF8]/10 border-[#38BDF8]/60 text-[#F8FAFC]'
                            : 'bg-[#080B16]/60 border-slate-800/80 text-[#94A3B8] hover:border-slate-700 hover:text-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={
                              isActive ? 'text-[#38BDF8]' : 'text-slate-500'
                            }
                          >
                            {PILLAR_ICONS[pillar.id]}
                          </span>
                          <span className="font-display font-semibold text-sm sm:text-base">
                            {pillar.title}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-[#94A3B8]">
                          {pillar.focus}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Active Capability Detail Panel */}
                <motion.div
                  key={activePillar.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 pt-5 border-t border-slate-800/80"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">
                      {activePillar.title}
                    </h3>
                    <span className="text-xs font-mono text-[#8B5CF6]">
                      {activePillar.focus}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    {activePillar.detail}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#38BDF8]">
                    {activePillar.technologies.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {idx < activePillar.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
