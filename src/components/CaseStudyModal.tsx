import React from 'react';
import { X, Terminal, CheckCircle2, Cpu, ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl bg-[#09090b] border border-[#27272a] shadow-2xl overflow-hidden my-8 text-left max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#121215] px-6 py-4 border-b border-[#27272a] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/30 font-bold">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#a1a1aa] hidden sm:inline">
              SYS_BLUEPRINT // DEEP TECHNICAL CASE STUDY
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 font-sans overflow-y-auto text-left">
          
          {/* Title & Description */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {project.title}
            </h2>
            <p className="text-sm text-[#fafafa] leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#0c0c0f] border border-[#27272a]">
                <span className="text-2xl font-mono font-bold text-[#34d399] block">{m.value}</span>
                <span className="text-xs font-mono text-[#a1a1aa] uppercase mt-0.5 block">{m.label}</span>
              </div>
            ))}
          </div>

          {/* System Architecture Blueprint / ASCII Diagram */}
          {project.systemDiagramLines && (
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#a78bfa] flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#a78bfa]" />
                <span>System Architecture Flowchart</span>
              </span>
              <div className="p-4 rounded-xl bg-[#0c0c0f] border border-[#27272a] font-mono text-xs text-[#38bdf8] overflow-x-auto leading-relaxed">
                {project.systemDiagramLines.map((line, idx) => (
                  <div key={idx} className="whitespace-pre">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Overview Items */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#a78bfa] flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#34d399]" />
              <span>Architectural Execution & System Design</span>
            </span>
            <div className="space-y-2 font-sans text-xs sm:text-sm text-[#a1a1aa]">
              {project.architectureOverview.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-[#0c0c0f] border border-[#27272a]">
                  <span className="text-[#34d399] font-mono font-bold mt-0.5">&gt;</span>
                  <span className="text-[#fafafa]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#a78bfa]">
              Key Production Outcomes
            </span>
            <ul className="space-y-2">
              {project.highlights.map((h, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-[#a1a1aa]">
                  <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-[#27272a] space-y-2">
            <span className="font-mono text-xs text-[#a1a1aa]">Technology Stack & Infrastructure:</span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#0c0c0f] border border-[#27272a] text-[#a78bfa] font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#121215] px-6 py-4 border-t border-[#27272a] flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#27272a] text-white text-xs font-mono hover:bg-[#3f3f46]"
          >
            Close Blueprint
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#a78bfa] text-[#09090b] font-mono text-xs font-bold hover:bg-[#b8a1ff]"
            >
              <Github className="w-4 h-4" />
              <span>View Code Repository</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
