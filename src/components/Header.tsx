import React, { useState, useEffect } from 'react';
import { Terminal, Bot, FileText, Menu, X, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenTerminal: () => void;
  onOpenAiAssistant: () => void;
  onOpenCvModal: () => void;
  onOpenCms?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  onOpenTerminal,
  onOpenAiAssistant,
  onOpenCvModal,
  onOpenCms,
}) => {
  const { data } = usePortfolio();
  const { personalDetails } = data;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'skills', label: 'Arsenal' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#121215] border border-[#27272a] flex items-center justify-center group-hover:border-[#a78bfa] transition-colors">
              <span className="font-mono text-[#a78bfa] font-bold text-lg">SS</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-white font-mono text-sm sm:text-base">
                  {personalDetails.brand}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse mr-1" />
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-[#a1a1aa] font-mono hidden sm:block">
                {personalDetails.name} — Software Architect
              </p>
            </div>
          </div>

          {/* Navigation Links Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#0c0c0f]/80 p-1.5 rounded-xl border border-[#27272a]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] shadow-sm font-semibold'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#121215]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Terminal CLI trigger */}
            <button
              onClick={onOpenTerminal}
              title="Open Terminal CLI (Ctrl+K)"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-[#a1a1aa] hover:text-[#a78bfa] transition-all text-xs font-mono"
            >
              <Terminal className="w-3.5 h-3.5 text-[#a78bfa]" />
              <span>CLI</span>
              <kbd className="px-1 py-0.5 text-[9px] bg-[#27272a] rounded text-[#fafafa]">⌘K</kbd>
            </button>

            {/* AI Twin button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#a78bfa]/10 hover:bg-[#a78bfa]/20 border border-[#a78bfa]/30 text-[#a78bfa] transition-all text-xs font-mono font-medium"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>

            {/* CV View button */}
            <button
              onClick={onOpenCvModal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#fafafa] text-[#09090b] hover:bg-white font-medium transition-all text-xs font-mono shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-[#121215] border border-[#27272a] text-[#a78bfa]"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c0f] border-b border-[#27272a] px-4 py-4 mt-2 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#27272a]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-mono ${
                  activeSection === item.id
                    ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#121215]'
                }`}
              >
                &gt; {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => {
                onOpenAiAssistant();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-[#a78bfa] text-xs font-mono"
            >
              <Bot className="w-4 h-4" />
              <span>Launch AI Twin Assistant</span>
            </button>
            <button
              onClick={() => {
                onOpenCvModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-white text-[#09090b] font-mono text-xs font-bold"
            >
              <FileText className="w-4 h-4" />
              <span>View Curriculum Vitae</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
