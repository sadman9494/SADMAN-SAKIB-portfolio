import React, { useState } from 'react';
import { Terminal, ArrowRight, Play, Award, CheckCircle2, Cpu, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* System Status Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#121215] border border-[#27272a]">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
              <span className="text-xs font-mono text-[#a1a1aa]">
                <strong className="text-[#34d399] font-bold">SYSTEM_READY</strong> // Dhaka [UTC+6]
              </span>
              <span className="text-xs text-[#27272a]">|</span>
              <span className="text-xs font-mono text-[#a78bfa]">v2.5_PROD</span>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-mono leading-[1.15]">
                Sadman Sakib
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-[#a78bfa] font-semibold">
                Software Engineer & AI Consultant
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-2xl font-sans">
              Architecting high-throughput distributed microservices, PyTorch AI candidate matching pipelines, and permissioned Hyperledger Fabric blockchain networks. 
              <span className="text-white font-medium block mt-1 font-mono text-sm">
                🎓 AIUB Vice-Chancellor's Gold Medalist & CGPA 3.95 (Summa Cum Laude)
              </span>
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3 items-center">
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
                <span>Launch CLI Mode</span>
              </button>

              <button
                onClick={copyEmail}
                className="flex items-center space-x-1.5 px-3.5 py-3 rounded-xl bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-white font-mono text-xs transition-all cursor-pointer"
                title="Copy Email Address"
              >
                {copied ? <Check className="w-4 h-4 text-[#34d399]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'hello@ssarchitect.dev'}</span>
              </button>
            </div>

            {/* Metrics Ribbon */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#27272a]">
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

          {/* Right Column: Terminal Window Simulation */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0c0c0f] border border-[#27272a] overflow-hidden shadow-2xl terminal-glow">
              {/* Terminal Window Header Bar */}
              <div className="bg-[#121215] px-4 py-3 border-b border-[#27272a] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#10b981]/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-[#a1a1aa]">root@ss-architect: ~/system_diagnostics</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#34d399]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                  <span>bash</span>
                </div>
              </div>

              {/* Terminal Body Content */}
              <div className="p-5 font-mono text-xs space-y-3.5 text-left bg-[#09090b]">
                <div className="flex items-start space-x-2">
                  <span className="text-[#a78bfa] font-bold">root@ss-architect:~$</span>
                  <span className="text-white">./init_architect_profile.sh --verbose</span>
                </div>

                <div className="text-[#a1a1aa] pl-3 border-l border-[#27272a] space-y-2 text-[11px]">
                  <p className="text-[#34d399]">
                    [SUCCESS] Engine initialized. Loading Sadman Sakib's profile parameters...
                  </p>
                  
                  <div className="p-2.5 rounded bg-[#121215] border border-[#27272a] space-y-1 text-[#fafafa]">
                    <div className="flex justify-between">
                      <span className="text-[#a1a1aa]">ACADEMIC:</span>
                      <span className="text-[#38bdf8] font-semibold">AIUB Gold Medalist (CGPA 3.95)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a1a1aa]">CORE ROLES:</span>
                      <span className="text-white">BAT / Agnis, Intellias, Shadhin Lab</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a1a1aa]">AI ENGINE:</span>
                      <span className="text-[#a78bfa]">Project Kronos (87% Match Accuracy)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a1a1aa]">BLOCKCHAIN:</span>
                      <span className="text-[#34d399]">Hyperledger Fabric Tracker (IEEE '24)</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[#a1a1aa]">&gt; checking pyTorch CUDA pipeline... <span className="text-[#34d399]">[OK]</span></p>
                    <p className="text-[#a1a1aa]">&gt; pinging .NET Core microservices gateway... <span className="text-[#34d399]">[200 OK - 8ms]</span></p>
                    <p className="text-[#a1a1aa]">&gt; verifying LeetCode global standing... <span className="text-[#38bdf8]">[Top 5%]</span></p>
                  </div>
                </div>

                {/* Prompt trigger */}
                <div className="pt-2 flex items-center justify-between border-t border-[#27272a]/60">
                  <div className="flex items-center space-x-2 text-[#a1a1aa]">
                    <span className="text-[#34d399] font-bold">&gt;</span>
                    <span className="text-white animate-pulse">Type 'help' or click CLI below...</span>
                  </div>
                  <button
                    onClick={onOpenTerminal}
                    className="px-2.5 py-1 rounded bg-[#a78bfa]/20 hover:bg-[#a78bfa]/30 text-[#a78bfa] border border-[#a78bfa]/40 text-[10px] font-mono"
                  >
                    Run Interactive CLI
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Badge */}
            <div className="mt-4 p-3 rounded-xl bg-[#0c0c0f] border border-[#27272a] flex items-center justify-between text-xs font-mono">
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
