import React, { useState } from 'react';
import { Mail, Terminal, Send, CheckCircle2, MapPin, Github, Linkedin, Globe, Copy, Check, Sparkles } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Architecture Consultation / Opportunity',
    message: '',
  });

  const [transmitting, setTransmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalDetails.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setTransmitting(true);
    setStep(1);

    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        setStep(3);
        setTimeout(() => {
          setTransmitting(false);
          setSent(true);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-[#0c0c0f] border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#121215] border border-[#27272a]">
            <Mail className="w-3.5 h-3.5 text-[#34d399]" />
            <span className="font-mono text-xs text-[#a1a1aa]">COMMUNICATION_CHANNEL // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Initiate Direct Connection
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl text-sm sm:text-base font-sans">
            Available for software architecture consulting, senior engineering roles, AI system integrations, and technical research advisory.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Operations & Social Links */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="p-6 rounded-2xl bg-[#09090b] border border-[#27272a] space-y-5">
              <h3 className="font-mono font-bold text-white text-lg flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-[#a78bfa]" />
                <span>Base Operations & Credentials</span>
              </h3>

              <div className="space-y-4 font-mono text-xs text-[#a1a1aa]">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#121215] border border-[#27272a]">
                  <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block">Base Location:</span>
                    <span>{personalDetails.location}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#121215] border border-[#27272a]">
                  <Mail className="w-4 h-4 text-[#34d399] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <span className="text-white font-bold block">Encrypted Email Channel:</span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[#a78bfa] font-bold">{personalDetails.email}</span>
                      <button
                        onClick={handleCopyEmail}
                        className="text-[#a1a1aa] hover:text-white p-1"
                        title="Copy Email"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 space-y-2">
                <span className="font-mono text-xs text-[#a1a1aa]">Verified Social Profiles:</span>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <a
                    href={personalDetails.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-[#fafafa] hover:text-[#a78bfa] flex items-center space-x-2 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={personalDetails.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-[#fafafa] hover:text-[#a78bfa] flex items-center space-x-2 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={personalDetails.socials.researchgate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-[#fafafa] hover:text-[#a78bfa] flex items-center space-x-2 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span>ResearchGate</span>
                  </a>

                  <a
                    href={personalDetails.socials.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-[#fafafa] hover:text-[#a78bfa] flex items-center space-x-2 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Scholar</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Terminal Interactive Form */}
          <div className="lg:col-span-7 bg-[#09090b] rounded-2xl border border-[#27272a] p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden">
            
            {/* Terminal Top Window Bar */}
            <div className="bg-[#121215] -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 px-6 py-3 border-b border-[#27272a] flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                <span className="ml-2 font-mono text-xs text-[#a1a1aa]">./dispatch_transmission.sh</span>
              </div>
              <span className="font-mono text-[10px] text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/30">
                SSL_ENCRYPTED
              </span>
            </div>

            {sent ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 text-[#34d399] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Transmission Received</h3>
                <p className="text-xs text-[#a1a1aa] max-w-md mx-auto">
                  Thank you! Your message packet has been logged and transmitted to Sadman Sakib's primary terminal. You will receive a response shortly.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: '', email: '', subject: 'Architecture Consultation', message: '' });
                  }}
                  className="px-4 py-2 rounded-lg bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-[#a78bfa] text-xs font-mono"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : transmitting ? (
              <div className="py-12 space-y-4 font-mono text-xs text-left">
                <div className="text-[#a78bfa] font-bold">
                  &gt; Executing message packet transmission protocol...
                </div>
                <div className="space-y-2 text-[#a1a1aa] pl-4 border-l border-[#27272a]">
                  <p className={step >= 1 ? 'text-[#fafafa]' : 'opacity-40'}>
                    [1/3] Encrypting message payload via RSA-4096 keypair... {step >= 1 && <span className="text-[#34d399]">[OK]</span>}
                  </p>
                  <p className={step >= 2 ? 'text-[#fafafa]' : 'opacity-40'}>
                    [2/3] Connecting socket to hello@ssarchitect.dev... {step >= 2 && <span className="text-[#34d399]">[CONNECTED]</span>}
                  </p>
                  <p className={step >= 3 ? 'text-[#fafafa]' : 'opacity-40'}>
                    [3/3] Verifying packet checksum & recording delivery log... {step >= 3 && <span className="text-[#34d399]">[VERIFIED]</span>}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[#a1a1aa] font-medium block">
                      --name <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:outline-none focus:border-[#a78bfa] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#a1a1aa] font-medium block">
                      --email <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@enterprise.io"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:outline-none focus:border-[#a78bfa] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#a1a1aa] font-medium block">
                    --subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:outline-none focus:border-[#a78bfa] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#a1a1aa] font-medium block">
                    --message_content <span className="text-[#ef4444]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your architectural project, advisory request, or position details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:outline-none focus:border-[#a78bfa] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#a78bfa] hover:bg-[#b8a1ff] text-[#09090b] font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg shadow-[#a78bfa]/10"
                >
                  <Send className="w-4 h-4" />
                  <span>Execute Transmission</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
