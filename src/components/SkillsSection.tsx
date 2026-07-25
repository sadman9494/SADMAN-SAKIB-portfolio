import React from 'react';
import { Server, Cpu, Boxes, Code, Award, Terminal, CheckCircle2, Trophy } from 'lucide-react';
import { skillCategories, personalDetails } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-5 h-5 text-[#a78bfa]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#38bdf8]" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-[#34d399]" />;
      case 'Code':
      default:
        return <Code className="w-5 h-5 text-[#f59e0b]" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#0c0c0f] border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#121215] border border-[#27272a]">
            <Cpu className="w-3.5 h-3.5 text-[#34d399]" />
            <span className="font-mono text-xs text-[#a1a1aa]">TECH_STACK // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Engineering Competencies
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl text-sm sm:text-base font-sans">
            A comprehensive overview of backend microservice frameworks, AI model pipelines, blockchain protocols, and algorithmic performance benchmarks.
          </p>
        </div>

        {/* Competency Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#09090b] rounded-2xl border border-[#27272a] p-6 sm:p-7 hover:border-[#a78bfa]/40 transition-all text-left space-y-5"
            >
              <div className="flex items-center space-x-3 pb-3 border-b border-[#27272a]">
                <div className="p-2.5 rounded-xl bg-[#121215] border border-[#27272a]">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="font-mono font-bold text-white text-lg">
                    {cat.title}
                  </h3>
                  <span className="text-xs text-[#a1a1aa] font-mono">
                    System Level & Production Standard
                  </span>
                </div>
              </div>

              {/* Skill Items */}
              <div className="space-y-3.5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-white font-medium flex items-center space-x-2">
                        <span className="text-[#a78bfa] font-bold">&gt;</span>
                        <span>{skill.name}</span>
                      </span>
                      {skill.categoryTag && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#121215] border border-[#27272a] text-[#38bdf8]">
                          {skill.categoryTag}
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-[#121215] rounded-full overflow-hidden border border-[#27272a]">
                      <div
                        className="h-full bg-gradient-to-r from-[#a78bfa] to-[#34d399] rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Academic & Competitive Highlights Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#121215] border border-[#27272a] text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#a78bfa]">
              <Trophy className="w-5 h-5 text-[#f59e0b]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Academic Distinction & Competitive Honors
              </span>
            </div>
            <h4 className="text-xl font-bold font-mono text-white">
              American International University-Bangladesh (AIUB)
            </h4>
            <p className="text-sm text-[#a1a1aa]">
              B.Sc. in Computer Science & Engineering | CGPA <strong className="text-white">3.95 / 4.00</strong> (Summa Cum Laude)
            </p>
            <p className="text-xs font-mono text-[#34d399]">
              🏅 Awarded Vice-Chancellor's Gold Medal for top academic performance in graduating class.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="p-3 rounded-xl bg-[#09090b] border border-[#27272a] text-center w-full sm:w-auto">
              <span className="font-mono text-xl font-bold text-[#a78bfa] block">Top 5%</span>
              <span className="text-[10px] font-mono text-[#a1a1aa]">LeetCode Global Rank</span>
            </div>
            <div className="p-3 rounded-xl bg-[#09090b] border border-[#27272a] text-center w-full sm:w-auto">
              <span className="font-mono text-xl font-bold text-[#34d399] block">5-Star</span>
              <span className="text-[10px] font-mono text-[#a1a1aa]">HackerRank Problem Solver</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
