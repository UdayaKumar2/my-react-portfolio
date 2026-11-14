import React from 'react';
import { Award, BookOpen, Globe2, GraduationCap, Sparkles } from 'lucide-react';
import {
  CERTIFICATIONS_AND_ACHIEVEMENTS,
  EDUCATION_ENTRIES,
} from '../data/experience';
import { PROFILE_DATA } from '../data/profile';
import { RevealSection, TiltCard3D, TiltLayer3D } from './MotionPrimitives';

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative z-10 py-20 lg:py-28 border-t border-slate-800/70"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Education Column */}
            <div className="lg:col-span-7">
              <p className="text-xs font-mono text-[#38BDF8] mb-3">
                Education
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC] mb-8">
                Academic Background
              </h2>

              <div className="space-y-4">
                {EDUCATION_ENTRIES.map((edu, idx) => (
                  <TiltCard3D
                    key={edu.id}
                    maxTilt={5}
                    className="surface-panel glow-border-hover rounded-2xl p-6"
                  >
                    <TiltLayer3D
                      depth={18}
                      className="flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#080B16] border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                          <GraduationCap
                            className={`w-5 h-5 ${
                              idx === 0 ? 'text-[#38BDF8]' : 'text-[#8B5CF6]'
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-[#F8FAFC]">
                            {edu.degree}
                          </h3>
                          {edu.institution && (
                            <p className="mt-1 text-sm text-[#94A3B8]">
                              {edu.institution}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="text-sm font-semibold font-mono text-[#38BDF8] tabular-nums">
                          {edu.score}
                        </div>
                        {edu.period && (
                          <div className="mt-0.5 text-xs font-mono text-[#94A3B8] tabular-nums">
                            {edu.period}
                          </div>
                        )}
                      </div>
                    </TiltLayer3D>
                  </TiltCard3D>
                ))}
              </div>
            </div>

            {/* Certifications, Achievements, Languages & Interests */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <p className="text-xs font-mono text-[#8B5CF6] mb-3">
                  Credentials
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC] mb-8">
                  Certifications &amp; Achievements
                </h2>

                <div className="space-y-4">
                  {CERTIFICATIONS_AND_ACHIEVEMENTS.map((item) => (
                    <TiltCard3D
                      key={item.id}
                      maxTilt={5}
                      className="surface-panel glow-border-hover rounded-2xl p-6"
                    >
                      <TiltLayer3D depth={18} className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#080B16] border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                          {item.type === 'Certification' ? (
                            <BookOpen className="w-5 h-5 text-[#38BDF8]" />
                          ) : (
                            <Award className="w-5 h-5 text-[#8B5CF6]" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                            <span>{item.type}</span>
                            {item.period && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="tabular-nums">{item.period}</span>
                              </>
                            )}
                          </div>
                          <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-[#F8FAFC]">
                            {item.issuer}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-[#38BDF8]">
                            {item.title}
                          </p>
                          <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </TiltLayer3D>
                    </TiltCard3D>
                  ))}
                </div>
              </div>

              {/* Languages & Interests Panel */}
              <TiltCard3D maxTilt={4} className="surface-panel rounded-2xl p-6 space-y-6">
                <TiltLayer3D depth={14}>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-3">
                    <Globe2 className="w-4 h-4" />
                    <span>Languages</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROFILE_DATA.languages.map((lang) => (
                      <div key={lang.language}>
                        <div className="text-sm font-semibold text-[#F8FAFC]">
                          {lang.language}
                        </div>
                        <div className="text-xs text-[#94A3B8] mt-0.5">
                          {lang.proficiency}
                        </div>
                      </div>
                    ))}
                  </div>
                </TiltLayer3D>

                <TiltLayer3D depth={14} className="pt-5 border-t border-slate-800/80">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8B5CF6] mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Engineering Interests</span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-[#94A3B8]">
                    {PROFILE_DATA.interests.map((interest) => (
                      <li key={interest} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                        <span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                </TiltLayer3D>
              </TiltCard3D>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
