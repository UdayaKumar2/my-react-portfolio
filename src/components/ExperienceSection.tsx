import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE_ENTRIES } from '../data/experience';
import { RevealSection, TiltCard3D, TiltLayer3D } from './MotionPrimitives';
import { getExperience } from '../data/currentdate';

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const glowY = useTransform(scaleY, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      className="relative z-10 py-20 lg:py-28 border-t border-slate-800/70"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealSection>
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono text-[#38BDF8] mb-3">
              Professional Experience
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
              Career Timeline
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
              {getExperience()} years of progressive software development experience across full-stack
              web platforms, RESTful services, and desktop automation tools.
            </p>
          </div>

          {/* Cinematic Vertical Timeline with Scroll-Driven Luminous Beam */}
          <div ref={timelineRef} className="relative pl-6 sm:pl-10 space-y-8">
            {/* Static background spine */}
            <div
              aria-hidden="true"
              className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[1.5px] bg-slate-800"
            />
            {/* Scroll-driven active spine */}
            {!prefersReduced && (
              <motion.div
                aria-hidden="true"
                style={{ scaleY, transformOrigin: 'top' }}
                className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#38BDF8] via-[#8B5CF6] to-[#38BDF8]"
              />
            )}
            {!prefersReduced && (
              <motion.div
                aria-hidden="true"
                style={{ top: glowY }}
                className="absolute left-[3px] sm:left-[7px] w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_16px_rgba(56,189,248,0.85)] pointer-events-none"
              />
            )}

            {EXPERIENCE_ENTRIES.map((entry, idx) => (
              <div key={entry.id} className="relative">
                {/* Timeline node marker */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-6 sm:-left-10 top-7 w-4 h-4 rounded-full border-2 ${entry.status === 'Current'
                      ? 'bg-[#38BDF8] border-[#080B16] shadow-[0_0_16px_rgba(56,189,248,0.65)]'
                      : 'bg-[#10182A] border-[#8B5CF6]'
                    }`}
                />

                <TiltCard3D
                  maxTilt={5}
                  className="surface-panel glow-border-hover rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <TiltLayer3D depth={20}>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                        <span>0{idx + 1}.</span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={
                            entry.status === 'Current'
                              ? 'text-[#38BDF8]'
                              : 'text-[#8B5CF6]'
                          }
                        >
                          {entry.status}
                        </span>
                      </div>
                      <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                        {entry.company}
                      </h3>
                      <div className="mt-1.5 inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#38BDF8]">
                        <Briefcase className="w-4 h-4 shrink-0" />
                        <span>{entry.role}</span>
                      </div>
                    </TiltLayer3D>

                    <TiltLayer3D
                      depth={16}
                      className="flex flex-col sm:items-end gap-1.5 text-sm text-[#94A3B8]"
                    >
                      <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#F8FAFC] tabular-nums">
                        <Calendar className="w-4 h-4 text-[#38BDF8] shrink-0" />
                        <span>{entry.period}</span>
                      </div>
                      {entry.location && (
                        <div className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8]">
                          <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                          <span>{entry.location}</span>
                        </div>
                      )}
                    </TiltLayer3D>
                  </div>
                </TiltCard3D>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
