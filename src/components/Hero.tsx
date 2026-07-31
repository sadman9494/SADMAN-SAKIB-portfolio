import React, { useState } from 'react';
import { Terminal, ArrowRight, Award, Copy, Check, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { InteractiveTerminal } from './InteractiveTerminal';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenAiAssistant: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTerminal,
  onOpenAiAssistant,
  onExploreProjects,
}) => {
  const { data, updateProfileImage } = usePortfolio();
  const { personalDetails, profileImage } = data;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalDetails.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Top subtle light gradient radial */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#a78bfa]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Section + Headline & Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* System Status Badge & Location Ribbon */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#121215] border border-[#27272a]">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
                <span className="text-xs font-mono text-[#a1a1aa]">
                  <strong className="text-[#34d399] font-bold">SYSTEM_READY</strong> // Dhaka [UTC+6]
                </span>
                <span className="text-xs text-[#27272a]">|</span>
                <span className="text-xs font-mono text-[#a78bfa]">v2.5_PROD</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#121215] border border-[#a78bfa]/30 text-xs font-mono text-[#a78bfa]">
                <Award className="w-3.5 h-3.5 text-[#34d399]" />
                <span>Gold Medalist & Summa Cum Laude</span>
              </div>
            </div>

            {/* Left Image Section + Main Title Header */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c0c0f] border border-[#27272a] shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-5 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#a78bfa]/10 blur-2xl rounded-full pointer-events-none" />

              {/* Image Frame Section */}
              <div className="relative shrink-0 group/avatar cursor-pointer">
                {/* Glittering Background Stars on Hover */}
                <div className="absolute -inset-4 opacity-0 group-hover/avatar:opacity-100 transition-all duration-500 pointer-events-none z-10">
                  <Sparkles className="absolute -top-3 -left-3 w-5 h-5 text-[#f472b6] animate-bounce" />
                  <Sparkles className="absolute -top-4 -right-2 w-6 h-6 text-[#a78bfa] animate-pulse" />
                  <Sparkles className="absolute -bottom-3 -left-2 w-5 h-5 text-[#38bdf8] animate-pulse" />
                  <Sparkles className="absolute -bottom-2 -right-3 w-6 h-6 text-[#34d399] animate-bounce" />
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-2 h-2 rounded-full bg-[#facc15] shadow-[0_0_8px_#facc15] animate-ping" />
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-2 h-2 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#a78bfa] animate-ping" />
                </div>

                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#a78bfa]/50 shadow-xl relative transition-all duration-500 group-hover/avatar:border-[#a78bfa] group-hover/avatar:shadow-[0_0_30px_rgba(167,139,250,0.5)]">
                  <img
                    src={profileImage}
                    alt="Sadman Sakib Profile Avatar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover/avatar:scale-105"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                {/* Active Indicator Badge */}
                <div className="absolute -bottom-2 -right-2 bg-[#121215] border border-[#34d399]/60 px-2 py-0.5 rounded-md flex items-center space-x-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#34d399]">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Title & Role Overview inside Left Section */}
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-col">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-mono leading-[1.1]">
                    {personalDetails.name}
                  </h1>
                  <p className="text-lg sm:text-xl font-mono text-[#a78bfa] font-semibold mt-1">
                    {personalDetails.title}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-mono text-[#a1a1aa]">
                  <span className="inline-flex items-center space-x-1 bg-[#121215] px-2.5 py-1 rounded border border-[#27272a]">
                    <MapPin className="w-3 h-3 text-[#38bdf8]" />
                    <span>{personalDetails.location}</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 bg-[#121215] px-2.5 py-1 rounded border border-[#27272a] text-[#34d399]">
                    <CheckCircle2 className="w-3 h-3 text-[#34d399]" />
                    <span>BAT / Agnis, Intellias, Shadhin</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-2xl font-sans">
              {personalDetails.tagline}
              <span className="text-white font-medium block mt-1.5 font-mono text-sm">
                🎓 {personalDetails.education.institution} — {personalDetails.education.honors} ({personalDetails.education.cgpa})
              </span>
            </p>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap gap-3 items-center">
              <button
                onClick={onExploreProjects}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#a78bfa] hover:bg-[#b8a1ff] text-[#09090b] font-mono text-sm font-bold transition-all shadow-lg shadow-[#a78bfa]/20 cursor-pointer"
              >
                <span>View Architecture Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTerminal}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-white font-mono text-sm transition-all hover:border-[#a78bfa] cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-[#a78bfa]" />
                <span>Launch CLI Modal Mode</span>
              </button>

              <button
                onClick={copyEmail}
                className="flex items-center space-x-1.5 px-3.5 py-3 rounded-xl bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-white font-mono text-xs transition-all cursor-pointer"
                title="Copy Email Address"
              >
                {copied ? <Check className="w-4 h-4 text-[#34d399]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : personalDetails.email}</span>
              </button>
            </div>

            {/* Metrics Ribbon */}
            <div className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#27272a]">
              {personalDetails.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0c0c0f] border border-[#27272a]">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white text-left">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono text-[#a78bfa] uppercase tracking-wider text-left">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-[#a1a1aa] truncate text-left mt-0.5">
                    {stat.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Fully Active & Reactive Live Terminal */}
          <div className="lg:col-span-5 space-y-4">
            <InteractiveTerminal
              compact={false}
              onNavigateSection={(sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCvModal={onOpenTerminal}
              onAskAi={(prompt) => onOpenAiAssistant()}
            />

            {/* Quick Peer-Reviewed Badge below Terminal */}
            <div className="p-3 rounded-xl bg-[#0c0c0f] border border-[#27272a] flex items-center justify-between text-xs font-mono shadow-md">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#a78bfa]" />
                <span className="text-white font-medium">IEEE / Springer Peer-Reviewed Publication (2024)</span>
              </div>
              <span className="text-[#34d399] text-[10px] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/30">VERIFIED</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

