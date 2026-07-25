import React from 'react';
import { Terminal, Github, Linkedin, Globe, Heart } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenTerminal }) => {
  return (
    <footer className="bg-[#09090b] border-t border-[#27272a] py-12 text-left font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#27272a]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#121215] border border-[#27272a] flex items-center justify-center text-[#a78bfa] font-bold">
                SS
              </div>
              <span className="font-bold text-white text-base">
                {personalDetails.brand}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] font-sans max-w-sm leading-relaxed">
              {personalDetails.tagline} Engineered with Obsidian High-Contrast dark design aesthetics.
            </p>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-[#121215] border border-[#27272a] text-[10px] text-[#34d399]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              <span>SYS_STATUS: OPTIMAL (99.98% UPTIME)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <span className="text-[#a78bfa] font-bold block uppercase tracking-wider text-[11px]">
              Fast Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-[#a1a1aa]">
              <button onClick={() => onNavigateSection('experience')} className="text-left hover:text-white">
                &gt; Experience
              </button>
              <button onClick={() => onNavigateSection('projects')} className="text-left hover:text-white">
                &gt; Case Studies
              </button>
              <button onClick={() => onNavigateSection('research')} className="text-left hover:text-white">
                &gt; Research
              </button>
              <button onClick={() => onNavigateSection('skills')} className="text-left hover:text-white">
                &gt; Technical Arsenal
              </button>
              <button onClick={() => onNavigateSection('about')} className="text-left hover:text-white">
                &gt; Architect Profile
              </button>
              <button onClick={() => onNavigateSection('contact')} className="text-left hover:text-white">
                &gt; Contact
              </button>
            </div>
          </div>

          {/* CLI & Social */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="text-[#a78bfa] font-bold block uppercase tracking-wider text-[11px]">
              Terminal & Socials
            </span>
            <button
              onClick={onOpenTerminal}
              className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-white text-xs font-mono"
            >
              <Terminal className="w-4 h-4 text-[#a78bfa]" />
              <span>Launch CLI Console</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a1a1aa] gap-3">
          <p>
            © {new Date().getFullYear()} {personalDetails.name} ({personalDetails.brand}). All rights reserved.
          </p>
          <p className="flex items-center space-x-1">
            <span>Built with React 19, TypeScript & Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
