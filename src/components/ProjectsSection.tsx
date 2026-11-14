import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowUpRight,
  Bot,
  Compass,
  ExternalLink,
  GraduationCap,
  Layers,
  PackageCheck,
  Play,
  Server,
  ShoppingCart,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import {
  PROJECTS_DATA,
  ProjectFilterGroup,
  ProjectIconType,
  ProjectItem,
} from '../data/projects';
import { RevealSection, TiltCard3D, TiltLayer3D } from './MotionPrimitives';

const FILTER_TABS: { id: ProjectFilterGroup; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'engineering', label: 'Featured Work' },
  { id: 'web', label: 'Web Apps' },
  { id: 'desktop', label: 'Desktop Apps' },
];

const PROJECT_ICONS: Record<ProjectIconType, React.ReactNode> = {
  wiki: <Layers className="w-5 h-5 text-[#38BDF8]" />,
  telemetry: <Activity className="w-5 h-5 text-[#8B5CF6]" />,
  automation: <Bot className="w-5 h-5 text-[#38BDF8]" />,
  logistics: <Server className="w-5 h-5 text-[#38BDF8]" />,
  restaurant: <UtensilsCrossed className="w-5 h-5 text-[#8B5CF6]" />,
  education: <GraduationCap className="w-5 h-5 text-[#38BDF8]" />,
  community: <Users className="w-5 h-5 text-[#8B5CF6]" />,
  location: <Compass className="w-5 h-5 text-[#38BDF8]" />,
  inventory: <PackageCheck className="w-5 h-5 text-[#8B5CF6]" />,
};

function ProjectVisual({ project }: { project: ProjectItem }) {
  const [imgError, setImgError] = useState(false);

  if (!project.imageUrl || imgError) {
    return null;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl border-b border-slate-800/80 bg-[#080B16]">
      <img
        src={project.imageUrl}
        alt={project.imageAlt ?? project.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10182A] via-transparent to-transparent opacity-60"
      />
    </div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterGroup>('all');
  const [selectedArchitecture, setSelectedArchitecture] =
    useState<ProjectItem | null>(null);
  const [activeDemo, setActiveDemo] = useState<ProjectItem | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!selectedArchitecture && !activeDemo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArchitecture(null);
        setActiveDemo(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedArchitecture, activeDemo]);

  const visibleProjects =
    activeFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.filterGroup === activeFilter);

  return (
    <section
      id="projects"
      className="relative z-10 py-20 lg:py-28 border-t border-slate-800/70 bg-[#0A0E1C]/90"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealSection>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-mono text-[#38BDF8] mb-3">
                Featured Projects &amp; Software Solutions
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
                Engineering Work &amp; Applications
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-2xl">
                Enterprise software engineering systems alongside production-ready
                C# .NET desktop and ASP.NET MVC web applications.
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter Projects"
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#10182A] border border-slate-800/80 self-start lg:self-auto"
            >
              {FILTER_TABS.map((tab) => {
                const active = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#38BDF8] text-[#080B16] font-semibold'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{ perspective: '1200px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={
                    prefersReduced
                      ? false
                      : { opacity: 0, rotateX: 8, y: 18, scale: 0.97 }
                  }
                  animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  exit={
                    prefersReduced
                      ? undefined
                      : { opacity: 0, scale: 0.96, transition: { duration: 0.16 } }
                  }
                  transition={{
                    duration: 0.36,
                    delay: Math.min(idx, 5) * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <TiltCard3D
                    maxTilt={7}
                    className={`group surface-panel glow-border-hover rounded-2xl flex flex-col justify-between ${
                      project.popular
                        ? 'border-[#38BDF8]/40 shadow-[0_20px_50px_-24px_rgba(56,189,248,0.22)]'
                        : ''
                    }`}
                  >
                    <div>
                      {project.imageUrl ? (
                        <TiltLayer3D depth={14}>
                          <ProjectVisual project={project} />
                        </TiltLayer3D>
                      ) : (
                        <TiltLayer3D depth={18} className="px-6 pt-6 sm:px-7 sm:pt-7">
                          <div className="w-11 h-11 rounded-xl bg-[#080B16] border border-slate-800/90 flex items-center justify-center">
                            {PROJECT_ICONS[project.iconType]}
                          </div>
                        </TiltLayer3D>
                      )}

                      <div className="p-6 sm:p-7">
                        <TiltLayer3D depth={22}>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                            <span className="text-[#38BDF8] tabular-nums">
                              {project.index}.
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{project.category}</span>
                            {project.popular && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-[#8B5CF6] font-semibold">
                                  Most Popular
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="mt-2 font-display text-xl font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                            {project.title}
                          </h3>
                        </TiltLayer3D>

                        <TiltLayer3D depth={14}>
                          <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                            {project.description}
                          </p>

                          {project.pricing && (
                            <div className="mt-5 pt-4 border-t border-slate-800/80">
                              <div className="flex items-baseline gap-2.5">
                                <span className="font-display text-2xl font-bold text-[#F8FAFC] tabular-nums">
                                  {project.pricing.current}
                                </span>
                                <span className="text-sm line-through text-slate-500 tabular-nums">
                                  {project.pricing.original}
                                </span>
                                <span className="text-xs font-mono text-emerald-400">
                                  {project.pricing.savings}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Clean Unboxed Technology Stack */}
                          <div
                            className={`${
                              project.pricing ? 'mt-4' : 'mt-5 pt-4 border-t border-slate-800/80'
                            } flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#F8FAFC]`}
                          >
                            {project.technologies.map((tech, techIdx) => (
                              <React.Fragment key={tech}>
                                <span>{tech}</span>
                                {techIdx < project.technologies.length - 1 && (
                                  <span aria-hidden="true" className="text-slate-600">
                                    ·
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </TiltLayer3D>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <TiltLayer3D
                      depth={28}
                      className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0"
                    >
                      {project.demoUrl || project.purchaseUrl ? (
                        <div className="flex flex-col gap-2.5">
                          {project.demoUrl && (
                            <button
                              type="button"
                              onClick={() => setActiveDemo(project)}
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-700/80 bg-[#080B16] text-[#F8FAFC] hover:border-[#38BDF8]/60 hover:text-[#38BDF8] transition-colors cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 text-[#38BDF8]" />
                              <span>View Live Demo</span>
                            </button>
                          )}
                          {project.purchaseUrl && (
                            <a
                              href={project.purchaseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#38BDF8] text-[#080B16] hover:bg-[#7DD3FC] transition-colors"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Purchase Now</span>
                            </a>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedArchitecture(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-[#7DD3FC] transition-colors cursor-pointer"
                        >
                          <span>Inspect Architecture</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      )}
                    </TiltLayer3D>
                  </TiltCard3D>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </RevealSection>
      </div>

      {/* Project Architecture Modal */}
      {selectedArchitecture && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80"
          onClick={() => setSelectedArchitecture(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#10182A] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <ProjectVisual project={selectedArchitecture} />
              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setSelectedArchitecture(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#080B16]/90 border border-slate-700 text-[#F8FAFC] hover:text-[#38BDF8] hover:border-[#38BDF8]/60 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="text-[#38BDF8]">
                  Project {selectedArchitecture.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedArchitecture.category}</span>
              </div>

              <h3
                id="project-modal-title"
                className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
              >
                {selectedArchitecture.title}
              </h3>

              <p className="mt-4 text-base text-[#94A3B8] leading-relaxed">
                {selectedArchitecture.description}
              </p>

              {selectedArchitecture.highlights && (
                <div className="mt-6 pt-6 border-t border-slate-800/80">
                  <div className="text-xs font-mono text-[#38BDF8] mb-3">
                    Architecture &amp; Implementation Highlights
                  </div>
                  <ul className="space-y-2.5 text-sm text-[#F8FAFC]">
                    {selectedArchitecture.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                        <span className="text-[#94A3B8]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#F8FAFC]">
                  <span className="text-[#94A3B8]">Stack:</span>
                  {selectedArchitecture.technologies.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span className="text-[#38BDF8]">{tech}</span>
                      {idx < selectedArchitecture.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-slate-600">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArchitecture(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#38BDF8] text-[#080B16] hover:bg-[#7DD3FC] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Live Demo Modal */}
      {activeDemo && activeDemo.demoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85"
          onClick={() => setActiveDemo(null)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-[#10182A] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-[#38BDF8]">
                  Live Demo · {activeDemo.category}
                </div>
                <h3
                  id="demo-modal-title"
                  className="font-display text-lg sm:text-xl font-bold text-[#F8FAFC]"
                >
                  {activeDemo.title}
                </h3>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={activeDemo.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-slate-700 bg-[#080B16] text-[#F8FAFC] hover:border-[#38BDF8]/60 hover:text-[#38BDF8] transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in YouTube</span>
                </a>
                <button
                  type="button"
                  aria-label="Close live demo"
                  onClick={() => setActiveDemo(null)}
                  className="w-9 h-9 rounded-lg border border-slate-800 bg-[#080B16] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="aspect-video w-full bg-[#080B16]">
              <iframe
                src={activeDemo.demoUrl}
                title={`${activeDemo.title} Live Demo`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {activeDemo.purchaseUrl && (
              <div className="px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-2.5">
                  {activeDemo.pricing && (
                    <>
                      <span className="font-display text-xl font-bold text-[#F8FAFC] tabular-nums">
                        {activeDemo.pricing.current}
                      </span>
                      <span className="text-xs line-through text-slate-500 tabular-nums">
                        {activeDemo.pricing.original}
                      </span>
                      <span className="text-xs font-mono text-emerald-400">
                        {activeDemo.pricing.savings}
                      </span>
                    </>
                  )}
                </div>

                <a
                  href={activeDemo.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#38BDF8] text-[#080B16] hover:bg-[#7DD3FC] transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Purchase Now via WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
