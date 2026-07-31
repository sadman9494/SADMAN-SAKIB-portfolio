import React, { useState } from 'react';
import { BookOpen, FileText, Award, ExternalLink, Github, Copy, Check, Sparkles, Share2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ResearchSection: React.FC = () => {
  const { data } = usePortfolio();
  const { researchPapers, blogArticles } = data;
  const [citationCopied, setCitationCopied] = useState(false);
  const spotlightPaper = researchPapers[0];

  const handleCopyCitation = () => {
    const bibtex = `@inproceedings{sakib2024blockchain,
  title={A Blockchain-Based Smartphone Ownership Tracking System},
  author={Sakib, Sadman and et al.},
  booktitle={IEEE / Springer International Series},
  year={2024},
  publisher={Springer / IEEE}
}`;
    navigator.clipboard.writeText(bibtex);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2000);
  };

  return (
    <section id="research" className="py-20 bg-[#09090b] border-t border-[#27272a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#121215] border border-[#27272a]">
            <BookOpen className="w-3.5 h-3.5 text-[#a78bfa]" />
            <span className="font-mono text-xs text-[#a1a1aa]">PUBLICATIONS & TECHNICAL INSIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Research & Published Whitepapers
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl text-sm sm:text-base font-sans">
            Peer-reviewed research and architecture essays advancing decentralized security, AI safety, and autonomous workflow engines.
          </p>
        </div>

        {/* Spotlight Research Paper Card */}
        <div className="bg-[#0c0c0f] rounded-2xl border border-[#27272a] p-6 sm:p-8 mb-12 relative overflow-hidden text-left shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a78bfa]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/30 font-bold flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>PEER-REVIEWED PUBLICATION ({spotlightPaper.year})</span>
                </span>
                <span className="text-xs font-mono text-[#34d399] bg-[#34d399]/10 px-2.5 py-1 rounded border border-[#34d399]/30">
                  Citations: {spotlightPaper.citationsCount}+
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-white leading-tight">
                {spotlightPaper.title}
              </h3>

              <p className="text-xs font-mono text-[#a1a1aa]">
                Authors: <strong className="text-white">{spotlightPaper.authors}</strong> | Venue: <span className="text-[#38bdf8]">{spotlightPaper.publication}</span>
              </p>

              <div className="bg-[#09090b] p-4 rounded-xl border border-[#27272a] text-xs text-[#a1a1aa] leading-relaxed font-sans space-y-2">
                <span className="font-mono text-[#a78bfa] font-bold block uppercase tracking-wider text-[11px]">
                  Paper Abstract Excerpt:
                </span>
                <p>{spotlightPaper.abstract}</p>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {spotlightPaper.keywords.map((kw, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#121215] text-[#fafafa] font-mono text-xs border border-[#27272a]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Paper Actions Sidebar */}
            <div className="lg:col-span-4 bg-[#09090b] p-5 rounded-xl border border-[#27272a] space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[#a1a1aa]">DOI Reference:</span>
                <p className="text-white text-[11px] font-mono break-all">{spotlightPaper.doi}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#27272a]">
                <button
                  onClick={handleCopyCitation}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-white transition-all cursor-pointer"
                >
                  {citationCopied ? <Check className="w-4 h-4 text-[#34d399]" /> : <Copy className="w-4 h-4 text-[#a78bfa]" />}
                  <span>{citationCopied ? 'BibTeX Copied!' : 'Copy BibTeX Citation'}</span>
                </button>

                <a
                  href={spotlightPaper.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#a78bfa] hover:bg-[#b8a1ff] text-[#09090b] font-bold transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>View Research Repository</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Insights / Blog Articles Grid */}
        <div className="space-y-6 text-left">
          <h3 className="text-xl font-bold font-mono text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#a78bfa]" />
            <span>Technical Insights & Engineering Essays</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogArticles.map((article) => (
              <div
                key={article.id}
                className="bg-[#0c0c0f] p-5 rounded-xl border border-[#27272a] hover:border-[#a78bfa] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#a1a1aa]">
                    <span className="text-[#38bdf8] font-semibold">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="font-mono font-bold text-white text-base group-hover:text-[#a78bfa] transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#27272a] flex items-center justify-between text-[11px] font-mono text-[#a1a1aa]">
                  <span>{article.date}</span>
                  <span className="text-[#a78bfa] group-hover:underline flex items-center space-x-1">
                    <span>Read Article</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
