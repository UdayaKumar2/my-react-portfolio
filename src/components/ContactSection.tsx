import React, { useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { RevealSection } from './MotionPrimitives';

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [subject, setSubject] = useState('Software Engineering Opportunity');
  const [message, setMessage] = useState('');

  const handleCopy = async (text: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Fallback ignored gracefully if clipboard API is restricted
    }
  };

  const mailtoHref = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
    subject.trim() || 'Software Engineering Inquiry'
  )}&body=${encodeURIComponent(message.trim())}`;

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 border-t border-slate-800/70 bg-[#0A0E1C]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Direct Contact Channels */}
            <div className="lg:col-span-6">
              <p className="text-xs font-mono text-[#38BDF8] mb-3">
                Contact
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
                Let&apos;s Build Scalable Software Together
              </h2>
              <p className="mt-4 text-base text-[#94A3B8] leading-relaxed max-w-xl">
                Open to software engineering discussions across full-stack React,
                ASP.NET Core backend services, desktop tooling, and real-time systems.
              </p>

              <div className="mt-8 space-y-4">
                {/* Email Card */}
                <div className="surface-panel glow-border-hover rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#080B16] border border-slate-800 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-[#94A3B8]">Email</div>
                      <a
                        href={`mailto:${PROFILE_DATA.email}`}
                        className="block text-sm sm:text-base font-semibold text-[#F8FAFC] hover:text-[#38BDF8] transition-colors truncate"
                      >
                        {PROFILE_DATA.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-slate-800 bg-[#080B16] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#38BDF8]/50 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone Card */}
                <div className="surface-panel glow-border-hover rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#080B16] border border-slate-800 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-[#94A3B8]">Phone</div>
                      <a
                        href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, '')}`}
                        className="block text-sm sm:text-base font-semibold font-mono text-[#F8FAFC] hover:text-[#38BDF8] transition-colors tabular-nums"
                      >
                        {PROFILE_DATA.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                    aria-label="Copy phone number"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-slate-800 bg-[#080B16] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#38BDF8]/50 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* LinkedIn & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={PROFILE_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-panel glow-border-hover rounded-2xl p-5 flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#080B16] border border-slate-800 flex items-center justify-center shrink-0">
                        <Linkedin className="w-4 h-4 text-[#38BDF8]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-[#94A3B8]">LinkedIn</div>
                        <div className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors truncate">
                          Connect Profile
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#94A3B8] group-hover:text-[#38BDF8] shrink-0" />
                  </a>

                  <div className="surface-panel rounded-2xl p-5 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#080B16] border border-slate-800 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#94A3B8]">Location</div>
                      <div className="text-sm font-semibold text-[#F8FAFC]">
                        {PROFILE_DATA.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Direct Email Client Launcher (Zero Fake Backend Submission) */}
            <div className="lg:col-span-6 surface-glass rounded-2xl p-6 sm:p-8">
              <div className="text-xs font-mono text-[#38BDF8] mb-2">
                Direct Email Draft
              </div>
              <h3 className="font-display text-xl font-bold text-[#F8FAFC]">
                Open in Your Email Client
              </h3>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Compose a message below to launch your default mail application
                addressed directly to{' '}
                <span className="text-[#F8FAFC] font-mono">
                  {PROFILE_DATA.email}
                </span>
                .
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-[#94A3B8] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Software Engineering Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B16] border border-slate-800 text-sm text-[#F8FAFC] placeholder:text-slate-600 focus:border-[#38BDF8] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#94A3B8] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Udayakumar, we would like to discuss a software engineering role..."
                    className="w-full px-4 py-3 rounded-xl bg-[#080B16] border border-slate-800 text-sm text-[#F8FAFC] placeholder:text-slate-600 focus:border-[#38BDF8] focus:outline-none transition-colors resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#38BDF8] text-[#080B16] hover:bg-[#7DD3FC] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Compose Email</span>
                  </a>
                  <a
                    href={PROFILE_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-slate-700/80 bg-[#10182A] text-[#F8FAFC] hover:border-[#8B5CF6]/60 hover:text-[#38BDF8] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Message on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
