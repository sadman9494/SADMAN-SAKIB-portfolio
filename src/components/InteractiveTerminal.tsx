import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Play, RefreshCw, Layers, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface InteractiveTerminalProps {
  compact?: boolean;
  onNavigateSection?: (sectionId: string) => void;
  onOpenCvModal?: () => void;
  onAskAi?: (prompt: string) => void;
}

interface CommandHistoryItem {
  cmd: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  compact = false,
  onNavigateSection,
  onOpenCvModal,
  onAskAi,
}) => {
  const { data } = usePortfolio();
  const { personalDetails, experiences, projects, researchPapers, skillCategories, terminalCommandsHelp } = data;

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<number | null>(null);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  const [isMatrixRunning, setIsMatrixRunning] = useState(false);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialize terminal with welcome banner
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setHistory([
      {
        cmd: 'init_session',
        timestamp: timeStr,
        output: (
          <div className="space-y-1.5 text-[#a1a1aa] font-mono">
            <div className="text-[#34d399] font-bold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span>[SS ARCHITECT CLI v2.5 ACTIVE & REACTIVE]</span>
            </div>
            <p className="text-white text-[11px]">
              Welcome! You are interacting with Sadman Sakib's live reactive profile shell.
            </p>
            <div className="p-2 rounded bg-[#121215] border border-[#27272a] text-[11px] space-y-1">
              <p><span className="text-[#a78bfa] font-bold">USER:</span> guest@ss-architect-terminal</p>
              <p><span className="text-[#38bdf8] font-bold">HONOR:</span> AIUB Gold Medalist | CGPA 3.95 (Summa Cum Laude)</p>
              <p><span className="text-[#34d399] font-bold">STATUS:</span> Ready for commands. Type <span className="text-white bg-[#27272a] px-1 rounded font-bold">'help'</span> or click suggestions below.</p>
            </div>
          </div>
        ),
      },
    ]);
  }, []);

  // Auto scroll down on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isBenchmarking, benchmarkProgress]);

  // Command History Navigation with Up / Down Arrow Keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (enteredCommands.length === 0) return;
      
      const newIdx = commandHistoryIndex === null 
        ? enteredCommands.length - 1 
        : Math.max(0, commandHistoryIndex - 1);
        
      setCommandHistoryIndex(newIdx);
      setInputVal(enteredCommands[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistoryIndex === null) return;
      
      const newIdx = commandHistoryIndex + 1;
      if (newIdx >= enteredCommands.length) {
        setCommandHistoryIndex(null);
        setInputVal('');
      } else {
        setCommandHistoryIndex(newIdx);
        setInputVal(enteredCommands[newIdx]);
      }
    }
  };

  const executeCommand = (commandToRun: string) => {
    const cleanCmd = commandToRun.trim();
    if (!cleanCmd) return;

    setEnteredCommands((prev) => [...prev, cleanCmd]);
    setCommandHistoryIndex(null);

    const lower = cleanCmd.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let output: React.ReactNode = null;

    if (lower === 'help' || lower === '?') {
      output = (
        <div className="space-y-2 py-1 text-xs">
          <p className="text-[#a78bfa] font-bold">SYSTEM COMMANDS ARSENAL:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px]">
            {terminalCommandsHelp.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => executeCommand(item.cmd)}
                className="flex items-center space-x-2 p-1 rounded hover:bg-[#18181c] cursor-pointer group transition-colors"
              >
                <span className="text-[#38bdf8] font-bold group-hover:text-[#a78bfa] w-28 shrink-0">{item.cmd}</span>
                <span className="text-[#a1a1aa] text-[10px] truncate">{item.desc}</span>
              </div>
            ))}
            <div 
              onClick={() => executeCommand('neofetch')}
              className="flex items-center space-x-2 p-1 rounded hover:bg-[#18181c] cursor-pointer group transition-colors"
            >
              <span className="text-[#38bdf8] font-bold group-hover:text-[#a78bfa] w-28 shrink-0">neofetch</span>
              <span className="text-[#a1a1aa] text-[10px] truncate">Display profile ASCII system specs</span>
            </div>
            <div 
              onClick={() => executeCommand('benchmark')}
              className="flex items-center space-x-2 p-1 rounded hover:bg-[#18181c] cursor-pointer group transition-colors"
            >
              <span className="text-[#38bdf8] font-bold group-hover:text-[#a78bfa] w-28 shrink-0">benchmark</span>
              <span className="text-[#a1a1aa] text-[10px] truncate">Run live AI & systems latency test</span>
            </div>
            <div 
              onClick={() => executeCommand('matrix')}
              className="flex items-center space-x-2 p-1 rounded hover:bg-[#18181c] cursor-pointer group transition-colors"
            >
              <span className="text-[#38bdf8] font-bold group-hover:text-[#a78bfa] w-28 shrink-0">matrix</span>
              <span className="text-[#a1a1aa] text-[10px] truncate">Trigger cyber digital rain mode</span>
            </div>
          </div>
        </div>
      );
    } else if (lower === 'about' || lower === 'bio') {
      output = (
        <div className="space-y-2 py-1 text-xs text-[#fafafa] font-mono">
          <div className="p-2.5 rounded bg-[#121215] border border-[#a78bfa]/30 space-y-1">
            <p className="text-[#a78bfa] font-bold text-sm">{personalDetails.name} — {personalDetails.title}</p>
            <p className="text-[#38bdf8]">🎓 {personalDetails.education.degree} ({personalDetails.education.institution})</p>
            <p className="text-[#34d399] font-bold">🥇 {personalDetails.education.honors} — CGPA {personalDetails.education.cgpa}</p>
            <p className="text-[#a1a1aa] text-[11px] pt-1">
              {personalDetails.tagline} Experienced across BAT/Agnis Solutions, Intellias, Shadhin Lab, and iBOS.
            </p>
          </div>
        </div>
      );
    } else if (lower === 'experience' || lower === 'work') {
      if (onNavigateSection) onNavigateSection('experience');
      output = (
        <div className="space-y-2 py-1 font-mono text-xs">
          <p className="text-[#34d399] font-bold">&gt; DISPLAYING PROFESSIONAL CAREER LOGS:</p>
          {experiences.map((exp, idx) => (
            <div key={idx} className="p-2 rounded bg-[#121215] border border-[#27272a] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white font-bold">{exp.company}</span>
                <span className="text-[#a78bfa] text-[10px]">{exp.period}</span>
              </div>
              <p className="text-[#38bdf8] text-[11px]">{exp.role}</p>
              <ul className="list-disc list-inside text-[#a1a1aa] text-[10px] space-y-0.5">
                {exp.achievements.slice(0, 2).map((ach, aIdx) => (
                  <li key={aIdx} className="truncate">{ach}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'projects' || lower === 'casestudies') {
      if (onNavigateSection) onNavigateSection('projects');
      output = (
        <div className="space-y-2 py-1 font-mono text-xs">
          <p className="text-[#38bdf8] font-bold">&gt; FEATURED ARCHITECTURE CASE STUDIES:</p>
          {projects.map((proj, idx) => (
            <div key={idx} className="p-2 rounded bg-[#121215] border border-[#27272a] space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">{proj.title}</span>
                <span className="text-[10px] bg-[#a78bfa]/20 text-[#a78bfa] px-1.5 py-0.5 rounded">{proj.category}</span>
              </div>
              <p className="text-[#a1a1aa] text-[11px]">{proj.shortDesc}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {proj.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="text-[9px] bg-[#27272a] text-[#34d399] px-1 rounded">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'research' || lower === 'publications') {
      if (onNavigateSection) onNavigateSection('research');
      output = (
        <div className="space-y-2 py-1 font-mono text-xs">
          <p className="text-[#34d399] font-bold">&gt; PEER-REVIEWED RESEARCH & PAPERS:</p>
          {researchPapers.map((paper, idx) => (
            <div key={idx} className="p-2 rounded bg-[#121215] border border-[#27272a] space-y-1">
              <p className="text-white font-bold">{paper.title}</p>
              <p className="text-[#38bdf8] text-[10px]">{paper.publication} ({paper.year})</p>
              <p className="text-[#a1a1aa] text-[10px]">Citations: {paper.citationsCount}+ | Authors: {paper.authors}</p>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'skills' || lower === 'tech') {
      if (onNavigateSection) onNavigateSection('skills');
      output = (
        <div className="space-y-2 py-1 font-mono text-xs">
          <p className="text-[#a78bfa] font-bold">&gt; TECHNICAL ARSENAL BREAKDOWN:</p>
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-2 rounded bg-[#121215] border border-[#27272a] space-y-1">
              <p className="text-[#38bdf8] font-bold text-[11px]">{cat.title}:</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s, sIdx) => (
                  <span key={sIdx} className="text-[10px] bg-[#18181c] text-white px-2 py-0.5 rounded border border-[#27272a]">
                    {s.name} <strong className="text-[#34d399]">({s.level}%)</strong>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'contact' || lower === 'hire') {
      if (onNavigateSection) onNavigateSection('contact');
      output = (
        <div className="space-y-2 py-1 font-mono text-xs text-[#fafafa]">
          <p className="text-[#34d399] font-bold">&gt; DIRECT CONTACT CHANNELS:</p>
          <div className="p-2.5 rounded bg-[#121215] border border-[#27272a] space-y-1">
            <p><strong>Email:</strong> <span className="text-[#a78bfa]">{personalDetails.email}</span></p>
            <p><strong>Location:</strong> {personalDetails.location}</p>
            <p><strong>GitHub:</strong> <span className="text-[#38bdf8]">{personalDetails.socials.github}</span></p>
            <p><strong>LinkedIn:</strong> <span className="text-[#38bdf8]">{personalDetails.socials.linkedin}</span></p>
          </div>
        </div>
      );
    } else if (lower === 'cv' || lower === 'resume' || lower === 'download-cv') {
      if (onOpenCvModal) onOpenCvModal();
      output = (
        <div className="py-1 text-xs font-mono text-[#34d399]">
          &gt; Opening Sadman Sakib's Curriculum Vitae architectural view...
        </div>
      );
    } else if (lower.startsWith('ai ')) {
      const query = cleanCmd.slice(3).trim();
      if (onAskAi) onAskAi(query);
      output = (
        <div className="p-2 rounded bg-[#a78bfa]/10 border border-[#a78bfa]/30 space-y-1 font-mono text-xs text-[#a78bfa]">
          <div className="flex items-center space-x-1 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FORWARDED TO AI TWIN:</span>
          </div>
          <p className="text-white text-[11px]">"{query}"</p>
          <p className="text-[10px] text-[#a1a1aa]">Opening AI Assistant drawer for deep response...</p>
        </div>
      );
    } else if (lower === 'ls' || lower === 'dir') {
      output = (
        <div className="font-mono text-xs py-1 text-[#38bdf8] space-y-1">
          <p className="text-[#a1a1aa] text-[10px]">Directory contents of ~/ss_architect:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[11px]">
            <span>📄 about.txt</span>
            <span>📂 experience/</span>
            <span>📂 projects/</span>
            <span>📄 research.md</span>
            <span>📄 skills.json</span>
            <span>📄 contact.sh</span>
            <span>📄 cv_2025.pdf</span>
            <span>📊 metrics.log</span>
          </div>
        </div>
      );
    } else if (lower.startsWith('cat ')) {
      const fileName = lower.slice(4).trim();
      if (fileName.includes('about')) {
        output = <p className="text-xs font-mono text-white p-2 bg-[#121215] rounded border border-[#27272a]">{personalDetails.name}: {personalDetails.tagline} CGPA 3.95 Summa Cum Laude Vice-Chancellor's Gold Medalist.</p>;
      } else if (fileName.includes('metrics')) {
        output = (
          <div className="text-xs font-mono text-[#34d399] p-2 bg-[#121215] rounded border border-[#27272a]">
            SYSTEM METRICS LOG:
            <br />- PyTorch Kronos Match Accuracy: 87%
            <br />- AutoPilot Mapping Reduction: 94%
            <br />- Blockchain Ledger Finality: &lt;250ms
            <br />- ERP Query Latency Reduction: 42%
          </div>
        );
      } else if (fileName.includes('cv') || fileName.includes('resume')) {
        if (onOpenCvModal) onOpenCvModal();
        output = <p className="text-xs font-mono text-[#34d399]">Launching CV modal viewer...</p>;
      } else {
        output = <p className="text-xs font-mono text-[#a1a1aa]">Reading file '{fileName}': Binary data or compressed stream. Try typing command '<span className="text-[#a78bfa]">about</span>' or '<span className="text-[#38bdf8]">projects</span>'.</p>;
      }
    } else if (lower === 'neofetch' || lower === 'system') {
      output = (
        <div className="p-2.5 rounded bg-[#09090b] border border-[#a78bfa]/40 font-mono text-[11px] text-[#fafafa] space-y-1">
          <div className="flex items-center space-x-2 text-[#a78bfa] font-bold border-b border-[#27272a] pb-1">
            <Cpu className="w-4 h-4 text-[#a78bfa]" />
            <span>sadman@ss-architect-kernel</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[10px]">
            <div>
              <p><span className="text-[#a1a1aa]">OS:</span> SS Architect OS 2.5 (Debian Linux core)</p>
              <p><span className="text-[#a1a1aa]">Host:</span> PyTorch CUDA 12.1 Microservice Node</p>
              <p><span className="text-[#a1a1aa]">Kernel:</span> 6.8.0-custom-aiub-gold</p>
              <p><span className="text-[#a1a1aa]">Uptime:</span> 99.98% High Throughput Uptime</p>
            </div>
            <div>
              <p><span className="text-[#a1a1aa]">Degree:</span> B.Sc. CSE @ AIUB (Summa Cum Laude)</p>
              <p><span className="text-[#a1a1aa]">Honor:</span> Vice-Chancellor's Gold Medalist</p>
              <p><span className="text-[#a1a1aa]">Algorithms:</span> LeetCode Top 5% Global Rank</p>
              <p><span className="text-[#a1a1aa]">Primary Stack:</span> Python, PyTorch, .NET 8, Fabric</p>
            </div>
          </div>
        </div>
      );
    } else if (lower === 'benchmark') {
      setIsBenchmarking(true);
      setBenchmarkProgress(0);
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setBenchmarkProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setIsBenchmarking(false);
        }
      }, 150);

      output = (
        <div className="p-2 rounded bg-[#121215] border border-[#34d399]/40 font-mono text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#34d399] font-bold">
            <span>⚡ EXECUTING LIVE ARCHITECTURE BENCHMARK TEST...</span>
            <span>100% PASS</span>
          </div>
          <div className="text-[10px] space-y-1 text-[#a1a1aa]">
            <p>✔ [PyTorch Kronos Embeddings]: <span className="text-white">1,200 docs/sec</span> (GPU Accelerated)</p>
            <p>✔ [.NET Core 8 Microservice]: <span className="text-white">3,500 TPS / 8ms P99 latency</span></p>
            <p>✔ [Hyperledger Chaincode]: <span className="text-white">220ms consensus transaction finality</span></p>
            <p>✔ [Redis Cache Pipeline]: <span className="text-white">99.4% cache hit ratio</span></p>
          </div>
        </div>
      );
    } else if (lower === 'matrix') {
      setIsMatrixRunning(true);
      setTimeout(() => setIsMatrixRunning(false), 3000);
      output = (
        <div className="p-2 rounded bg-black border border-[#34d399] text-[#34d399] font-mono text-[10px] tracking-widest overflow-hidden h-16 flex items-center justify-center animate-pulse">
          01001000 01000101 01001100 01001100 01001111 00100000 01010111 01001111 01010010 01001100 01000100 00100000 01010011 01000001 01000100 01001101 01000001 01001110 00100000 01010011 01000001 01001011 01001001 01000010
        </div>
      );
    } else if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'whoami') {
      output = <p className="text-xs font-mono text-[#38bdf8]">role: guest_reviewer | permissions: [READ, EXECUTE, CONSULT] | authenticated: YES</p>;
    } else if (lower === 'date') {
      output = <p className="text-xs font-mono text-[#a1a1aa]">Server Time: {new Date().toUTCString()} (Dhaka UTC+6)</p>;
    } else {
      output = (
        <p className="text-xs font-mono text-[#ef4444]">
          Command not recognized: '{cleanCmd}'. Type <span className="text-[#a78bfa] font-bold cursor-pointer underline" onClick={() => executeCommand('help')}>'help'</span> for options or <span className="text-[#38bdf8] font-bold cursor-pointer underline" onClick={() => executeCommand('ai tell me about Sadman')}>'ai &lt;question&gt;'</span>.
        </p>
      );
    }

    setHistory((prev) => [...prev, { cmd: cleanCmd, timestamp, output }]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div className={`rounded-2xl bg-[#0c0c0f] border border-[#27272a] overflow-hidden shadow-2xl terminal-glow flex flex-col ${compact ? 'h-[360px]' : 'h-[440px]'}`}>
      
      {/* Terminal Top Window Header */}
      <div className="bg-[#121215] px-4 py-2.5 border-b border-[#27272a] flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#10b981]/80 inline-block" />
          <span className="ml-2 font-mono text-xs text-[#a1a1aa] font-semibold truncate max-w-[200px] sm:max-w-none">
            root@ss-architect: ~/active_shell
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
            <span>REACTIVITY: LIVE</span>
          </div>
        </div>
      </div>

      {/* Terminal History Display */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="p-4 font-mono text-xs flex-1 overflow-y-auto space-y-3 text-left bg-[#09090b] cursor-text"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.cmd !== 'init_session' && (
              <div className="flex items-center justify-between text-[11px] text-[#a78bfa]">
                <div className="flex items-center space-x-2">
                  <span className="text-[#34d399] font-bold">root@ss-architect:~$</span>
                  <span className="text-white font-bold">{item.cmd}</span>
                </div>
                <span className="text-[9px] text-[#52525b]">{item.timestamp}</span>
              </div>
            )}
            <div className="pl-3 border-l border-[#27272a]">{item.output}</div>
          </div>
        ))}

        {/* Matrix Effect Overlay inside terminal if triggered */}
        {isMatrixRunning && (
          <div className="text-[#34d399] font-mono text-xs animate-pulse space-y-0.5">
            <p>&gt; matrix protocol initialized...</p>
            <p>&gt; loading quantum neural weights...</p>
            <p className="text-white">SYSTEM ONLINE. CGPA 3.95 SUMMA CUM LAUDE GOLD MEDALIST PROFILE ACTIVE.</p>
          </div>
        )}

        {/* Benchmark loader if active */}
        {isBenchmarking && (
          <div className="space-y-1 p-2 bg-[#121215] rounded border border-[#27272a]">
            <p className="text-xs text-[#38bdf8] font-bold">BENCHMARKING PIPELINE... {benchmarkProgress}%</p>
            <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#38bdf8] h-full transition-all duration-150" style={{ width: `${benchmarkProgress}%` }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestion Chips Ribbon for Quick Reactivity */}
      <div className="bg-[#0f0f12] px-3 py-1.5 border-t border-[#27272a]/60 flex items-center space-x-1.5 overflow-x-auto text-[10px] font-mono no-scrollbar shrink-0">
        <span className="text-[#a1a1aa] shrink-0 font-bold">QUICK RUN:</span>
        <button
          type="button"
          onClick={() => executeCommand('help')}
          className="px-2 py-0.5 rounded bg-[#18181c] hover:bg-[#27272a] text-[#a78bfa] border border-[#27272a] shrink-0 transition-colors"
        >
          help
        </button>
        <button
          type="button"
          onClick={() => executeCommand('about')}
          className="px-2 py-0.5 rounded bg-[#18181c] hover:bg-[#27272a] text-[#38bdf8] border border-[#27272a] shrink-0 transition-colors"
        >
          about
        </button>
        <button
          type="button"
          onClick={() => executeCommand('projects')}
          className="px-2 py-0.5 rounded bg-[#18181c] hover:bg-[#27272a] text-[#34d399] border border-[#27272a] shrink-0 transition-colors"
        >
          projects
        </button>
        <button
          type="button"
          onClick={() => executeCommand('experience')}
          className="px-2 py-0.5 rounded bg-[#18181c] hover:bg-[#27272a] text-white border border-[#27272a] shrink-0 transition-colors"
        >
          experience
        </button>
        <button
          type="button"
          onClick={() => executeCommand('neofetch')}
          className="px-2 py-0.5 rounded bg-[#18181c] hover:bg-[#27272a] text-[#f59e0b] border border-[#27272a] shrink-0 transition-colors"
        >
          neofetch
        </button>
        <button
          type="button"
          onClick={() => executeCommand('benchmark')}
          className="px-2 py-0.5 rounded bg-[#18181c] hover:bg-[#27272a] text-[#ec4899] border border-[#27272a] shrink-0 transition-colors"
        >
          benchmark
        </button>
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-[#121215] border-t border-[#27272a] flex items-center space-x-2 shrink-0">
        <span className="font-mono text-xs text-[#34d399] font-bold pl-1">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command here (e.g. 'help', 'about', 'projects', 'neofetch', 'ai ask question')..."
          className="w-full bg-transparent border-none text-white font-mono text-xs focus:outline-none placeholder-[#52525b]"
        />
        <button
          type="submit"
          className="p-1.5 rounded bg-[#a78bfa] text-[#09090b] font-bold hover:bg-[#b8a1ff] transition-all cursor-pointer"
          title="Run Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
