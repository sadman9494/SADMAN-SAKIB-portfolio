import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal, CornerDownLeft, Sparkles } from 'lucide-react';
import { terminalCommandsHelp, personalDetails, experiences, projects, researchPapers, skillCategories } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCvModal: () => void;
  onAskAi: (prompt: string) => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenCvModal,
  onAskAi,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: 'init',
      output: (
        <div className="space-y-1 text-[#a1a1aa]">
          <p className="text-[#34d399] font-bold">
            [SS ARCHITECT CLI v2.5 initialized]
          </p>
          <p>
            Welcome to Sadman Sakib's terminal environment. Type <span className="text-[#a78bfa] font-bold">'help'</span> to view commands or <span className="text-[#38bdf8] font-bold">'projects'</span> to explore systems.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim();
    if (!cleanCmd) return;

    const lower = cleanCmd.toLowerCase();
    let output: React.ReactNode = null;

    if (lower === 'help') {
      output = (
        <div className="space-y-1.5 py-1">
          <p className="text-[#a78bfa] font-bold">AVAILABLE COMMANDS:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {terminalCommandsHelp.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="text-white font-bold w-28 shrink-0">{item.cmd}</span>
                <span className="text-[#a1a1aa] text-[11px]">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (lower === 'about') {
      output = (
        <div className="space-y-1 py-1 text-[#fafafa]">
          <p className="text-[#a78bfa] font-bold">SADMAN SAKIB — Software Engineer & AI Consultant</p>
          <p>🎓 B.Sc. CSE @ AIUB | CGPA 3.95 (Summa Cum Laude) & Vice-Chancellor's Gold Medalist</p>
          <p>💼 Roles: BAT / Agnis Solutions, Intellias, Shadhin Lab, iBOS Limited</p>
          <p>⚡ Expertise: PyTorch AI Pipelines, .NET Core 8 Microservices, Hyperledger Fabric</p>
        </div>
      );
    } else if (lower === 'experience') {
      onNavigateSection('experience');
      output = (
        <div className="space-y-2 py-1">
          <p className="text-[#34d399] font-bold">&gt; Navigating to Experience logs...</p>
          {experiences.map((e, idx) => (
            <div key={idx} className="text-[#a1a1aa] border-l-2 border-[#a78bfa] pl-2">
              <span className="text-white font-bold">{e.company}</span> ({e.period}) — <span className="text-[#38bdf8]">{e.role}</span>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'projects') {
      onNavigateSection('projects');
      output = (
        <div className="space-y-2 py-1">
          <p className="text-[#38bdf8] font-bold">&gt; Navigating to Projects Case Studies...</p>
          {projects.map((p, idx) => (
            <div key={idx} className="text-[#a1a1aa]">
              • <span className="text-white font-bold">{p.title}</span> [{p.category}]
            </div>
          ))}
        </div>
      );
    } else if (lower === 'research') {
      onNavigateSection('research');
      output = (
        <div className="space-y-2 py-1">
          <p className="text-[#34d399] font-bold">&gt; Research Publications Loaded:</p>
          <p className="text-white font-bold">"A Blockchain-Based Smartphone Ownership Tracking System" (IEEE / Springer 2024)</p>
          <p className="text-[#a1a1aa] text-[11px]">Citations: {researchPapers[0].citationsCount}+ | Peer-Reviewed</p>
        </div>
      );
    } else if (lower === 'skills') {
      onNavigateSection('skills');
      output = (
        <div className="space-y-1 py-1">
          <p className="text-[#a78bfa] font-bold">TECHNICAL ARSENAL:</p>
          <p className="text-[#a1a1aa]">Python (FastAPI, PyTorch), C# (.NET Core 8), Hyperledger Fabric, Docker, Redis, PostgreSQL, LeetCode Top 5%</p>
        </div>
      );
    } else if (lower === 'contact') {
      onNavigateSection('contact');
      output = (
        <div className="space-y-1 py-1 text-[#fafafa]">
          <p className="text-[#34d399] font-bold">&gt; Launching contact terminal...</p>
          <p>Email: <span className="text-[#a78bfa]">{personalDetails.email}</span></p>
          <p>Location: {personalDetails.location}</p>
        </div>
      );
    } else if (lower === 'download-cv' || lower === 'cv' || lower === 'resume') {
      onOpenCvModal();
      output = <p className="text-[#34d399] font-bold">&gt; Opening Curriculum Vitae Modal...</p>;
    } else if (lower.startsWith('ai ')) {
      const prompt = cleanCmd.slice(3);
      onAskAi(prompt);
      output = <p className="text-[#a78bfa] font-bold">&gt; Forwarding query to SS ARCHITECT AI Twin...</p>;
      onClose();
    } else if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else {
      output = (
        <p className="text-[#ef4444]">
          Command not recognized: '{cleanCmd}'. Type <span className="text-[#a78bfa] font-bold font-mono">'help'</span> for options or <span className="text-[#38bdf8] font-mono">'ai &lt;question&gt;'</span> to ask AI.
        </p>
      );
    }

    setHistory((prev) => [...prev, { cmd: cleanCmd, output }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl rounded-2xl bg-[#09090b] border border-[#27272a] shadow-2xl overflow-hidden flex flex-col h-[520px] terminal-glow">
        
        {/* Terminal Title Bar */}
        <div className="bg-[#121215] px-4 py-3 border-b border-[#27272a] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#a78bfa]" />
            <span className="font-mono text-xs text-white font-bold">
              root@ss-architect: ~ (Interactive CLI Mode)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#a1a1aa] hover:text-white hover:bg-[#27272a]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output Area */}
        <div className="p-4 font-mono text-xs flex-1 overflow-y-auto space-y-3 text-left">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.cmd !== 'init' && (
                <div className="flex items-center space-x-2 text-[#a78bfa]">
                  <span className="font-bold">&gt;</span>
                  <span className="text-white font-bold">{item.cmd}</span>
                </div>
              )}
              <div className="pl-3 border-l border-[#27272a]">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleCommandSubmit} className="p-3 bg-[#121215] border-t border-[#27272a] flex items-center space-x-2 shrink-0">
          <span className="font-mono text-xs text-[#a78bfa] font-bold pl-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. 'help', 'projects', 'ai tell me about Project Kronos')..."
            className="w-full bg-transparent border-none text-white font-mono text-xs focus:outline-none placeholder-[#3f3f46]"
          />
          <button
            type="submit"
            className="p-1.5 rounded bg-[#a78bfa] text-[#09090b] font-bold hover:bg-[#b8a1ff]"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
