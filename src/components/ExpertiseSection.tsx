import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Blocks,
  Code2,
  Database,
  Layers,
  Monitor,
  Server,
  Wrench,
} from 'lucide-react';
import { SKILL_CATEGORIES, SkillCategoryId } from '../data/skills';
import { RevealSection, TiltCard3D, TiltLayer3D } from './MotionPrimitives';

type FilterValue = 'all' | SkillCategoryId;

const CATEGORY_ICONS: Record<SkillCategoryId, React.ReactNode> = {
  frontend: <Code2 className="w-5 h-5 text-[#38BDF8]" />,
  backend: <Server className="w-5 h-5 text-[#8B5CF6]" />,
  desktop: <Monitor className="w-5 h-5 text-[#38BDF8]" />,
  database: <Database className="w-5 h-5 text-[#8B5CF6]" />,
  architecture: <Layers className="w-5 h-5 text-[#38BDF8]" />,
  tools: <Wrench className="w-5 h-5 text-[#8B5CF6]" />,
};

export function ExpertiseSection() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const prefersReduced = useReducedMotion();

  const visibleCategories =
    activeFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeFilter);

  return (
    <section
      id="expertise"
      className="relative z-10 py-20 lg:py-28 border-t border-slate-800/70 bg-[#0A0E1C]/90"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealSection>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-mono text-[#38BDF8] mb-3">
                Technical Expertise
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
                Full-Stack Technology Matrix
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-2xl">
                Production technologies across modern frontend ecosystems, .NET backend
                services, Windows desktop clients, relational databases, and deployment workflows.
              </p>
            </div>

            {/* Interactive Category Filter Controls */}
            <div
              role="tablist"
              aria-label="Filter Technical Expertise"
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#10182A] border border-slate-800/80 self-start lg:self-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#38BDF8] text-[#080B16] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <Blocks className="w-3.5 h-3.5" />
                <span>All</span>
              </button>

              {SKILL_CATEGORIES.map((cat) => {
                const active = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#38BDF8] text-[#080B16] font-semibold'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive 3D Technology Cards Grid */}
          <div
            style={{ perspective: '1200px' }}
            className={`grid gap-6 ${
              visibleCategories.length === 1
                ? 'grid-cols-1'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((category, idx) => (
                <motion.div
                  key={category.id}
                  layout
                  initial={
                    prefersReduced
                      ? false
                      : { opacity: 0, rotateX: 10, y: 18, scale: 0.97 }
                  }
                  animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  exit={
                    prefersReduced
                      ? undefined
                      : { opacity: 0, scale: 0.96, transition: { duration: 0.16 } }
                  }
                  transition={{
                    duration: 0.36,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TiltCard3D
                    maxTilt={7}
                    className="surface-panel glow-border-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <TiltLayer3D depth={24} className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-mono text-[#94A3B8]">
                            {category.domain}
                          </div>
                          <h3 className="mt-1 font-display text-xl font-bold text-[#F8FAFC]">
                            {category.label}
                          </h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#080B16] border border-slate-800/80 flex items-center justify-center shrink-0">
                          {CATEGORY_ICONS[category.id]}
                        </div>
                      </TiltLayer3D>

                      <TiltLayer3D depth={14}>
                        <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                          {category.summary}
                        </p>
                      </TiltLayer3D>

                      {/* Structured Unboxed Technology Matrix */}
                      <TiltLayer3D
                        depth={18}
                        className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3"
                      >
                        {category.items.map((skill) => (
                          <div
                            key={skill.name}
                            className="group/item flex flex-col py-1"
                          >
                            <span className="text-sm font-semibold text-[#F8FAFC] group-hover/item:text-[#38BDF8] transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-xs text-[#94A3B8]">
                              {skill.role}
                            </span>
                          </div>
                        ))}
                      </TiltLayer3D>
                    </div>
                  </TiltCard3D>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
