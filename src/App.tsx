import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import {
  ScrollDepthBackdrop,
  ScrollProgressBar,
} from './components/MotionPrimitives';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#080B16] text-[#F8FAFC] flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#38BDF8] focus:text-[#080B16] focus:font-semibold"
        >
          Skip to main content
        </a>

        <Navbar />
        <ScrollProgressBar />
        <ScrollDepthBackdrop />

        <main id="main-content" className="relative z-10 flex-1">
          <HeroSection onOpenResumePreview={() => setResumePreviewOpen(true)} />
          <AboutSection />
          <ExpertiseSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>

        <Footer />

        <ResumeModal
          open={resumePreviewOpen}
          onClose={() => setResumePreviewOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
