import React, { useEffect } from 'react';
import { Download, Printer, X } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { SKILL_CATEGORIES } from '../data/skills';
import {
  CERTIFICATIONS_AND_ACHIEVEMENTS,
  EDUCATION_ENTRIES,
  EXPERIENCE_ENTRIES,
} from '../data/experience';
import { PROJECTS_DATA } from '../data/projects';
import { downloadResumePdf } from '../utils/resumeGenerator';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#10182A] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-[#10182A] border-b border-slate-800">
          <div>
            <h2
              id="resume-modal-title"
              className="font-display text-lg font-bold text-[#F8FAFC]"
            >
              Resume Preview — {PROFILE_DATA.name}
            </h2>
            <p className="text-xs text-[#94A3B8]">
              {PROFILE_DATA.role} · {PROFILE_DATA.location}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-slate-700 bg-[#080B16] text-[#F8FAFC] hover:border-[#38BDF8]/60 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={downloadResumePdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#38BDF8] text-[#080B16] hover:bg-[#7DD3FC] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              aria-label="Close resume preview"
              onClick={onClose}
              className="w-9 h-9 rounded-lg border border-slate-800 bg-[#080B16] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Structured Resume Sheet */}
        <div className="p-6 sm:p-8 space-y-6 text-sm text-[#94A3B8]">
          <div className="pb-5 border-b border-slate-800">
            <div className="font-display text-2xl font-bold text-[#F8FAFC]">
              {PROFILE_DATA.name}
            </div>
            <div className="mt-1 text-sm font-medium text-[#38BDF8]">
              {PROFILE_DATA.role}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-[#94A3B8]">
              <span>{PROFILE_DATA.location}</span>
              <span aria-hidden="true">·</span>
              <span>{PROFILE_DATA.email}</span>
              <span aria-hidden="true">·</span>
              <span>{PROFILE_DATA.phone}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-[#38BDF8] mb-2">
              Professional Summary
            </h3>
            <p className="leading-relaxed text-[#F8FAFC]/90">
              {PROFILE_DATA.summary}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono text-[#38BDF8] mb-3">
              Professional Experience
            </h3>
            <div className="space-y-3">
              {EXPERIENCE_ENTRIES.map((exp) => (
                <div
                  key={exp.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                >
                  <div>
                    <span className="font-semibold text-[#F8FAFC]">
                      {exp.company}
                    </span>
                    <span className="text-[#94A3B8]"> — {exp.role}</span>
                    {exp.location && (
                      <span className="text-[#94A3B8]"> ({exp.location})</span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#94A3B8] tabular-nums">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-[#38BDF8] mb-3">
              Technical Expertise
            </h3>
            <div className="space-y-2">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold text-[#F8FAFC]">
                    {cat.label}:{' '}
                  </span>
                  <span>{cat.items.map((i) => i.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-[#38BDF8] mb-3">
              Featured Projects
            </h3>
            <div className="space-y-3">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id}>
                  <div className="font-semibold text-[#F8FAFC]">
                    {proj.index}. {proj.title}{' '}
                    <span className="font-mono text-xs font-normal text-[#38BDF8]">
                      ({proj.technologies.join(' · ')})
                    </span>
                  </div>
                  <p className="mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800">
            <div>
              <h3 className="text-xs font-mono text-[#38BDF8] mb-2">
                Education
              </h3>
              <div className="space-y-2">
                {EDUCATION_ENTRIES.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-semibold text-[#F8FAFC]">
                      {edu.degree}
                    </div>
                    <div className="text-xs">
                      {[edu.institution, edu.period, edu.score]
                        .filter(Boolean)
                        .join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono text-[#38BDF8] mb-2">
                Certifications &amp; Languages
              </h3>
              <div className="space-y-2">
                {CERTIFICATIONS_AND_ACHIEVEMENTS.map((c) => (
                  <div key={c.id} className="text-xs">
                    <span className="font-semibold text-[#F8FAFC]">
                      {c.issuer}:{' '}
                    </span>
                    <span>{c.title}</span>
                  </div>
                ))}
                <div className="text-xs pt-1">
                  <span className="font-semibold text-[#F8FAFC]">
                    Languages:{' '}
                  </span>
                  <span>
                    {PROFILE_DATA.languages
                      .map((l) => `${l.language} (${l.proficiency})`)
                      .join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
