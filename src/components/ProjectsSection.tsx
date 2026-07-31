import React, { useState } from 'react';
import { Cpu, Boxes, Server, ExternalLink, Github, Terminal, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { data } = usePortfolio();
  const { projects } = data;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'AI & Automation', 'Blockchain', 'Enterprise Systems'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-[#0c0c0f] border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#121215] border border-[#27272a]">
              <Cpu className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="font-mono text-xs text-[#a1a1aa]">SYSTEM_BLUEPRINTS // CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              Architectural Case Studies
            </h2>
            <p className="text-[#a1a1aa] max-w-2xl text-sm sm:text-base font-sans">
              Production-ready systems engineered with mathematical precision, verifiable performance benchmarks, and resilient fault tolerance.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 bg-[#09090b] p-1.5 rounded-xl border border-[#27272a]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#18181c] text-[#a78bfa] border border-[#a78bfa]/40 font-bold shadow-sm'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#121215]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#09090b] rounded-2xl border border-[#27272a] p-6 sm:p-7 hover:border-[#a78bfa]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Card Info */}
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#121215] border border-[#27272a] text-[#38bdf8]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/30 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>FEATURED</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-mono text-white group-hover:text-[#a78bfa] transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-[#a1a1aa] leading-relaxed font-sans">
                  {project.shortDesc}
                </p>

                {/* Key Metric Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#121215] border border-[#27272a]">
                      <span className="text-base font-mono font-bold text-[#34d399] block">{m.value}</span>
                      <span className="text-[10px] font-mono text-[#a1a1aa] uppercase truncate block">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#121215] text-[#a1a1aa] font-mono text-[11px] border border-[#27272a]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 mt-6 border-t border-[#27272a] flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex items-center space-x-2 text-xs font-mono font-bold text-[#a78bfa] hover:text-[#b8a1ff] transition-colors cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Inspect Architecture Blueprint</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
