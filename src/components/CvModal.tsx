import React from 'react';
import { X, Printer, Download, Mail, MapPin, Award, CheckCircle2, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  const { personalDetails, experiences, projects, researchPapers } = data;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl bg-[#0c0c0f] border border-[#27272a] shadow-2xl overflow-hidden my-6 text-left max-h-[92vh] flex flex-col">
        
        {/* Header bar */}
        <div className="bg-[#121215] px-6 py-4 border-b border-[#27272a] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 text-white font-mono font-bold text-sm">
            <FileText className="w-4 h-4 text-[#a78bfa]" />
            <span>Curriculum Vitae — Sadman Sakib (Executive Summary)</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#a78bfa] text-[#09090b] font-mono text-xs font-bold hover:bg-[#b8a1ff] transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#27272a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Content Area */}
        <div className="p-8 space-y-8 overflow-y-auto font-sans bg-[#09090b] text-left">
          
          {/* Header Info */}
          <div className="border-b border-[#27272a] pb-6 space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold font-mono text-white">
                  {personalDetails.name}
                </h1>
                <p className="text-lg font-mono text-[#a78bfa] font-bold">
                  {personalDetails.title}
                </p>
              </div>

              <div className="text-right text-xs font-mono text-[#a1a1aa] space-y-1">
                <p className="text-white">{personalDetails.email}</p>
                <p>{personalDetails.location}</p>
              </div>
            </div>

            <p className="text-xs text-[#a1a1aa] pt-2 max-w-3xl leading-relaxed">
              Software Engineer & AI Consultant with proven expertise architecting PyTorch candidate parsers, .NET Core microservices, and peer-reviewed Hyperledger Fabric blockchain systems. CGPA 3.95 Summa Cum Laude & AIUB Vice-Chancellor's Gold Medalist.
            </p>
          </div>

          {/* Education & Honors */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold text-[#a78bfa] uppercase tracking-wider">
              Academic Qualifications & Honors
            </h2>
            <div className="p-4 rounded-xl bg-[#0c0c0f] border border-[#27272a] space-y-2 font-mono text-xs">
              <div className="flex justify-between text-white font-bold text-sm">
                <span>{personalDetails.education.institution}</span>
                <span className="text-[#34d399]">{personalDetails.education.graduationYear}</span>
              </div>
              <p className="text-[#a78bfa]">
                {personalDetails.education.degree} — <strong className="text-white">CGPA {personalDetails.education.cgpa}</strong> ({personalDetails.education.honors})
              </p>
              <p className="text-[#a1a1aa] text-[11px]">
                🏅 Vice-Chancellor's Gold Medalist for graduating top of the CSE department class.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-[#a78bfa] uppercase tracking-wider">
              Professional Engineering Experience
            </h2>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0c0c0f] border border-[#27272a] space-y-2 text-xs">
                  <div className="flex flex-wrap justify-between text-white font-bold font-mono">
                    <span className="text-sm">{exp.role} @ <span className="text-[#a78bfa]">{exp.company}</span></span>
                    <span className="text-[#34d399]">{exp.period}</span>
                  </div>
                  <ul className="space-y-1 text-[#a1a1aa] list-disc pl-4 pt-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 pt-2 font-mono text-[10px] text-[#38bdf8]">
                    Stack: {exp.techStack.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold text-[#a78bfa] uppercase tracking-wider">
              Peer-Reviewed Publications
            </h2>
            <div className="p-4 rounded-xl bg-[#0c0c0f] border border-[#27272a] space-y-1 text-xs font-mono">
              <p className="text-white font-bold">
                "{researchPapers[0].title}"
              </p>
              <p className="text-[#a1a1aa] text-[11px]">
                {researchPapers[0].authors} — <span className="text-[#38bdf8]">{researchPapers[0].publication} ({researchPapers[0].year})</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
