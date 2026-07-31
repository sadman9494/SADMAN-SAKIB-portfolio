import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResearchSection } from './components/ResearchSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CvModal } from './components/CvModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { AdminCmsModal } from './components/AdminCmsModal';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Project } from './types';

function MainApp() {
  const [activeSection, setActiveSection] = useState('hero');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');
  const { isCmsOpen, setIsCmsOpen } = usePortfolio();

  // Check for ?admin=true or #admin in URL on load & listen to key shortcuts
  useEffect(() => {
    const checkUrlForAdmin = () => {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('admin') === 'true' || window.location.hash === '#admin') {
        setIsCmsOpen(true);
      }
    };

    checkUrlForAdmin();
    window.addEventListener('hashchange', checkUrlForAdmin);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsCmsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkUrlForAdmin);
    };
  }, [setIsCmsOpen]);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAskAiWithPrompt = (promptText: string) => {
    setAiInitialPrompt(promptText);
    setAiDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-[#a78bfa] selection:text-[#09090b] relative font-sans">
      
      {/* Fixed Sticky Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAiAssistant={() => setAiDrawerOpen(true)}
        onOpenCvModal={() => setCvModalOpen(true)}
        onOpenCms={() => setIsCmsOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenAiAssistant={() => setAiDrawerOpen(true)}
          onExploreProjects={() => handleNavigateSection('projects')}
        />

        <ExperienceSection />

        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        <ResearchSection />

        <SkillsSection />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCms={() => setIsCmsOpen(true)}
      />

      {/* Terminal CLI Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onNavigateSection={handleNavigateSection}
        onOpenCvModal={() => setCvModalOpen(true)}
        onAskAi={handleAskAiWithPrompt}
      />

      {/* Project Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Curriculum Vitae Modal */}
      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

      {/* AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        initialPrompt={aiInitialPrompt}
      />

      {/* Portfolio CMS Admin Modal */}
      <AdminCmsModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainApp />
    </PortfolioProvider>
  );
}
