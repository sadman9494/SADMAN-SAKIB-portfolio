import React, { useState } from 'react';
import { User, Terminal, Award, GraduationCap, ShieldCheck, Cpu, Code2, CheckCircle } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'philosophy'>('profile');

  return (
    <section id="about" className="py-20 bg-[#09090b] border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#121215] border border-[#27272a]">
            <User className="w-3.5 h-3.5 text-[#a78bfa]" />
            <span className="font-mono text-xs text-[#a1a1aa]">SYSTEM_MANIFEST // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Architect Profile & Engineering Philosophy
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl text-sm sm:text-base font-sans">
            Combining academic excellence with real-world enterprise engineering experience across AI, distributed systems, and Web3 infrastructure.
          </p>
        </div>

        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Terminal Profile Viewer */}
          <div className="lg:col-span-7 bg-[#0c0c0f] rounded-2xl border border-[#27272a] overflow-hidden shadow-2xl">
            
            {/* Terminal Header Bar */}
            <div className="bg-[#121215] px-4 py-3 border-b border-[#27272a] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                <span className="ml-2 font-mono text-xs text-[#a1a1aa]">cat ~/about_sadman_sakib.txt</span>
              </div>
              <div className="flex items-center space-x-1">
                {(['profile', 'education', 'philosophy'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-[#18181c] text-[#a78bfa] border border-[#a78bfa]/40 font-bold'
                        : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Body Output */}
            <div className="p-6 font-mono text-xs text-left space-y-4 bg-[#09090b]">
              
              {activeTab === 'profile' && (
                <div className="space-y-3 leading-relaxed text-[#a1a1aa]">
                  <p className="text-white font-bold text-sm">
                    NAME: Sadman Sakib
                  </p>
                  <p className="text-[#a78bfa]">
                    ROLE: Software Engineer & AI Consultant | SS ARCHITECT
                  </p>
                  <p className="text-[#38bdf8]">
                    LOCATION: Dhaka, Bangladesh [UTC+6] | Open for International Remote & Advisory Roles
                  </p>
                  <hr className="border-[#27272a]" />
                  <p className="text-[#fafafa]">
                    Sadman is a Software Engineer specializing in scalable enterprise systems, AI pipeline integration, and blockchain architectures. Holding a B.Sc. in CSE with CGPA 3.95 (Summa Cum Laude) and the Vice-Chancellor's Gold Medal from AIUB, he blends theoretical rigor with hands-on system architecture.
                  </p>
                  <p>
                    Throughout his career across BAT / Agnis Solutions, Intellias, Shadhin Lab, and iBOS Limited, Sadman has built production systems that process thousands of candidates, automate data schema translations with 94% time savings, and record immutable mobile device transactions on peer-reviewed Hyperledger networks.
                  </p>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-4 text-[#a1a1aa]">
                  <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-2">
                    <div className="flex items-center justify-between text-white font-bold text-sm">
                      <span>American International University-Bangladesh (AIUB)</span>
                      <span className="text-[#34d399] font-mono text-xs">2019 - 2023</span>
                    </div>
                    <p className="text-[#a78bfa] font-semibold text-xs">
                      B.Sc. in Computer Science & Engineering
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                      <div className="p-2 rounded bg-[#09090b] border border-[#27272a]">
                        <span className="text-[#a1a1aa] block">FINAL CGPA:</span>
                        <span className="text-white font-bold text-sm">3.95 / 4.00</span>
                      </div>
                      <div className="p-2 rounded bg-[#09090b] border border-[#27272a]">
                        <span className="text-[#a1a1aa] block">ACADEMIC STANDING:</span>
                        <span className="text-[#34d399] font-bold text-xs">Summa Cum Laude</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-white space-y-1">
                    <span className="font-bold text-xs text-[#a78bfa] block">
                      🏅 Vice-Chancellor's Gold Medalist
                    </span>
                    <p className="text-[11px] text-[#fafafa]">
                      Highest honor bestowed by the University Chancellor for achieving top academic distinction in the graduating cohort.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'philosophy' && (
                <div className="space-y-3 text-[#a1a1aa] text-xs">
                  <div className="p-3 rounded-lg bg-[#121215] border border-[#27272a]">
                    <span className="text-white font-bold text-xs block text-[#a78bfa]">
                      1. Deterministic Reliability over Hype
                    </span>
                    <p className="text-[11px] mt-1 text-[#fafafa]">
                      AI models should serve as verifiable accelerators within structured, fault-tolerant pipelines — not unmonitored black boxes.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#121215] border border-[#27272a]">
                    <span className="text-white font-bold text-xs block text-[#38bdf8]">
                      2. Clean Modular Microservices
                    </span>
                    <p className="text-[11px] mt-1 text-[#fafafa]">
                      Loose coupling, domain-driven design (DDD), CQRS separation, and asynchronous event queues guarantee linear scalability.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#121215] border border-[#27272a]">
                    <span className="text-white font-bold text-xs block text-[#34d399]">
                      3. Cryptographic Transparency
                    </span>
                    <p className="text-[11px] mt-1 text-[#fafafa]">
                      Distributed ledgers provide verifiable truth in multi-party ecosystems without relying on centralized trust bottlenecks.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Key Pillars Bento Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0c0c0f] border border-[#27272a] text-left space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-[#a78bfa]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-mono font-bold text-white text-base">
                  AI & Intelligent Automation
                </h3>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans">
                Engineered PyTorch BERT transformers, candidate ranking vectors, and autonomous LangChain workflow agents that cut enterprise operational latency by up to 94%.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0c0f] border border-[#27272a] text-left space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-[#34d399]/10 border border-[#34d399]/30 text-[#34d399]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-mono font-bold text-white text-base">
                  Blockchain & Cryptographic Systems
                </h3>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans">
                Published peer-reviewed research on Hyperledger Fabric, zero-knowledge IMEI device verification, and permissioned chaincode consensus mechanisms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0c0f] border border-[#27272a] text-left space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8]">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="font-mono font-bold text-white text-base">
                  High-Throughput Enterprise Backend
                </h3>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans">
                Deep expertise in Python (FastAPI), C# (.NET 8), PostgreSQL, Redis caching, and RabbitMQ message broker orchestration.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
