import React, { Component, Suspense, lazy, useEffect, useState } from 'react';
import { ArrowDownRight, Download, FileText, Mail, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { detectWebGLCapabilities } from '../utils/webglDetect';
import { downloadResumePdf } from '../utils/resumeGenerator';
import { HeroFallbackVisual } from './HeroFallbackVisual';

const LazyHeroScene3D = lazy(() => import('./HeroScene3D'));

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <HeroFallbackVisual reason="unavailable" />;
    }
    return this.props.children;
  }
}

interface HeroSectionProps {
  onOpenResumePreview: () => void;
}

export function HeroSection({ onOpenResumePreview }: HeroSectionProps) {
  const [webglState, setWebglState] = useState<{
    checked: boolean;
    supported: boolean;
    isSoftwareGl: boolean;
  }>({ checked: false, supported: true, isSoftwareGl: false });
  const [isCompact, setIsCompact] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const caps = detectWebGLCapabilities();
    setWebglState({
      checked: true,
      supported: caps.supported,
      isSoftwareGl: caps.isSoftwareGl,
    });

    const checkViewport = () => {
      setIsCompact(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleScrollTo = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadResume = () => {
    downloadResumePdf();
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2600);
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-14 lg:pt-28 lg:pb-20 overflow-hidden bg-arch-grid"
    >
      {/* Subtle architectural ambient gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(139,92,246,0.18) 50%, transparent 75%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Identity & Primary Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-mono text-[#38BDF8] mb-5">
              <span>{PROFILE_DATA.name}</span>
              <span aria-hidden="true" className="text-slate-600">
                /
              </span>
              <span className="text-[#94A3B8]">{PROFILE_DATA.role}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.1rem] font-bold tracking-tight text-[#F8FAFC] leading-[1.12] max-w-2xl">
              {PROFILE_DATA.headline}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
              {PROFILE_DATA.heroSubheadline}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => handleScrollTo('#projects')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#38BDF8] text-[#080B16] hover:bg-[#7DD3FC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-slate-700/80 bg-[#10182A] text-[#F8FAFC] hover:border-[#38BDF8]/60 hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Resume Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo('#contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-slate-800 bg-transparent text-[#F8FAFC] hover:border-[#8B5CF6]/60 hover:bg-[#10182A]/70 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#8B5CF6]" />
                <span>Contact Me</span>
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4 text-xs text-[#94A3B8]">
              <button
                type="button"
                onClick={onOpenResumePreview}
                className="inline-flex items-center gap-1.5 text-[#94A3B8] hover:text-[#38BDF8] transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-[#38BDF8] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Preview Printable Resume</span>
              </button>
              <span aria-hidden="true" className="text-slate-700">
                ·
              </span>
              <span>{PROFILE_DATA.location}</span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Developer Environment */}
          <div className="lg:col-span-6 flex">
            {webglState.checked && !webglState.supported ? (
              <HeroFallbackVisual reason="unavailable" />
            ) : (
              <SceneErrorBoundary>
                <Suspense fallback={<HeroFallbackVisual reason="loading" />}>
                  <LazyHeroScene3D
                    isSoftwareGl={webglState.isSoftwareGl}
                    isCompact={isCompact}
                  />
                </Suspense>
              </SceneErrorBoundary>
            )}
          </div>
        </div>

        {/* Full-Width 4-Column Summary Strip below Hero Split */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 border border-slate-800/80 rounded-2xl bg-[#10182A]/75 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
          <div className="p-5 sm:p-6">
            <div className="text-xs text-[#94A3B8]">Professional Experience</div>
            <div className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#F8FAFC] tabular-nums">
              {PROFILE_DATA.experienceSpan}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-xs text-[#94A3B8]">Core Specialization</div>
            <div className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]">
              React &amp; ASP.NET
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-xs text-[#94A3B8]">Engineering Domains</div>
            <div className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]">
              Web · Desktop · APIs
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-xs text-[#94A3B8]">Based In</div>
            <div className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]">
              {PROFILE_DATA.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
