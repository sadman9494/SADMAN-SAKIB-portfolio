import React, { useState } from 'react';
import { Briefcase, Terminal, Calendar, MapPin, ChevronRight, CheckCircle2, TrendingUp, Code2 } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(experiences[0].id);

  const selectedExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  return (
    <section id="experience" className="py-20 bg-[#09090b] relative border-t border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#121215] border border-[#27272a]">
            <Terminal className="w-3.5 h-3.5 text-[#a78bfa]" />
            <span className="font-mono text-xs text-[#a1a1aa]">EXECUTION_LOG // ROLES & IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Professional Engineering Experience
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl text-sm sm:text-base font-sans">
            A track record of designing high-availability enterprise microservices, AI pipelines, and blockchain networks across leading technology firms.
          </p>
        </div>

        {/* Desktop & Tablet Experience Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Company Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            {experiences.map((exp) => {
              const isSelected = exp.id === selectedExpId;
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#121215] border-[#a78bfa] shadow-lg shadow-[#a78bfa]/5'
                      : 'bg-[#0c0c0f] border-[#27272a] hover:border-[#3f3f46] hover:bg-[#121215]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#a78bfa] font-semibold">
                      {exp.period}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/30">
                        ACTIVE LOG
                      </span>
                    )}
                  </div>
                  <h3 className="font-mono font-bold text-white text-base mt-1">
                    {exp.company}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] font-mono truncate mt-0.5">
                    {exp.role}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Experience Panel */}
          <div className="lg:col-span-8 bg-[#0c0c0f] rounded-2xl border border-[#27272a] p-6 sm:p-8 text-left space-y-6 relative overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#a78bfa]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#27272a] pb-6">
              <div>
                <span className="font-mono text-xs text-[#34d399] font-bold uppercase tracking-wider">
                  {selectedExp.period}
                </span>
                <h3 className="text-2xl font-bold font-mono text-white mt-1">
                  {selectedExp.role}
                </h3>
                <p className="text-base text-[#a78bfa] font-mono font-medium">
                  {selectedExp.company}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono text-[#a1a1aa] bg-[#121215] px-3 py-1.5 rounded-lg border border-[#27272a]">
                <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{selectedExp.location}</span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-[#fafafa] text-sm leading-relaxed font-sans">
              {selectedExp.description}
            </p>

            {/* Terminal Command Output Box */}
            <div className="rounded-xl bg-[#09090b] border border-[#27272a] p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[#a1a1aa] border-b border-[#27272a] pb-2 text-[11px]">
                <span className="text-[#a78bfa]">{selectedExp.terminalCommand}</span>
                <span className="text-[#34d399]">status: 200 OK</span>
              </div>
              <p className="text-[#a1a1aa] text-[11px] pt-1">
                &gt; Executing verification suite on production systems...
              </p>
            </div>

            {/* Key Achievements */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#a78bfa] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                <span>Key Architectural Contributions</span>
              </h4>
              <ul className="space-y-2.5">
                {selectedExp.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-[#a1a1aa]">
                    <span className="text-[#a78bfa] font-mono font-bold mt-0.5">&gt;</span>
                    <span className="leading-relaxed text-[#fafafa]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics Highlight */}
            {selectedExp.metrics && selectedExp.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {selectedExp.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#121215] border border-[#27272a] text-left">
                    <span className="text-xl font-mono font-bold text-[#34d399] block">{m.value}</span>
                    <span className="text-[11px] font-mono text-[#a1a1aa] uppercase">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="pt-4 border-t border-[#27272a] space-y-2">
              <span className="font-mono text-xs text-[#a1a1aa]">Technologies & Infrastructure:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedExp.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#121215] border border-[#27272a] text-[#a78bfa] font-mono text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
