import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#080B16] py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-display text-base font-bold text-[#F8FAFC]">
            {PROFILE_DATA.name}
          </div>
          <p className="mt-1 text-xs text-[#94A3B8]">
            {PROFILE_DATA.role} · {PROFILE_DATA.location} · &copy; {year}
          </p>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#94A3B8]"
        >
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="hover:text-[#F8FAFC] transition-colors"
          >
            About
          </a>
          <a
            href="#expertise"
            onClick={(e) => handleNavClick(e, '#expertise')}
            className="hover:text-[#F8FAFC] transition-colors"
          >
            Expertise
          </a>
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, '#experience')}
            className="hover:text-[#F8FAFC] transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className="hover:text-[#F8FAFC] transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hover:text-[#F8FAFC] transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            aria-label="Email Udayakumar P"
            className="w-9 h-9 rounded-lg border border-slate-800 bg-[#10182A] text-[#94A3B8] hover:text-[#38BDF8] hover:border-[#38BDF8]/50 flex items-center justify-center transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Udayakumar P on LinkedIn"
            className="w-9 h-9 rounded-lg border border-slate-800 bg-[#10182A] text-[#94A3B8] hover:text-[#38BDF8] hover:border-[#38BDF8]/50 flex items-center justify-center transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
