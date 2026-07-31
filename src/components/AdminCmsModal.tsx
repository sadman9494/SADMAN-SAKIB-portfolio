import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  User,
  Briefcase,
  FolderGit2,
  BookOpen,
  FileText,
  Cpu,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  PortfolioData,
  PersonalDetails,
  Experience,
  Project,
  ResearchPaper,
  BlogArticle,
  SkillCategory,
} from '../types';

interface AdminCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'profile' | 'experience' | 'projects' | 'research' | 'articles' | 'skills' | 'settings';

export const AdminCmsModal: React.FC<AdminCmsModalProps> = ({ isOpen, onClose }) => {
  const { data, saveAllData, resetToDefaults, exportJsonData, importJsonData } = usePortfolio();
  
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Sync formData when data changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(data)));
      setSavedSuccess(false);
      setImportError(null);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveAllData(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all portfolio data to default original content?')) {
      resetToDefaults();
      setFormData(JSON.parse(JSON.stringify(data)));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData((prev) => ({ ...prev, profileImage: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const content = reader.result as string;
        if (importJsonData(content)) {
          setImportError(null);
          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 3000);
        } else {
          setImportError('Invalid JSON structure. Please check your backup file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0c0c0f] border border-[#27272a] rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-[#121215] border-b border-[#27272a] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#a78bfa]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-mono text-sm font-bold text-white tracking-wide">PORTFOLIO CMS ADMIN EDITOR</h2>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/30 rounded">
                  LIVE CONTROLLER
                </span>
              </div>
              <p className="text-[11px] text-[#a1a1aa] font-mono">
                Edit portfolio content directly — changes reflect instantly on save.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {savedSuccess && (
              <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 bg-[#34d399]/10 border border-[#34d399]/40 text-[#34d399] rounded-lg text-xs font-mono animate-bounce">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Changes Published!</span>
              </div>
            )}

            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-[#a78bfa] hover:bg-[#b89fff] text-[#09090b] font-mono font-bold text-xs rounded-lg shadow-lg shadow-[#a78bfa]/20 transition-all cursor-pointer active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#a1a1aa] hover:text-white bg-[#18181c] hover:bg-[#27272a] rounded-lg border border-[#27272a] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Navigation Sidebar */}
          <div className="w-48 sm:w-56 bg-[#09090b] border-r border-[#27272a] p-3 flex flex-col justify-between shrink-0">
            <div className="space-y-1 font-mono text-xs">
              <p className="px-2 py-1 text-[10px] text-[#71717a] font-bold uppercase tracking-wider">Content Sections</p>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#121215] hover:text-white'
                }`}
              >
                <User className="w-4 h-4 text-[#a78bfa]" />
                <span>Profile & Bio</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all ${
                  activeTab === 'experience'
                    ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#121215] hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4 text-[#38bdf8]" />
                <span>Experience</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all ${
                  activeTab === 'projects'
                    ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#121215] hover:text-white'
                }`}
              >
                <FolderGit2 className="w-4 h-4 text-[#34d399]" />
                <span>Projects</span>
              </button>

              <button
                onClick={() => setActiveTab('research')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all ${
                  activeTab === 'research'
                    ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#121215] hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#f43f5e]" />
                <span>Research Papers</span>
              </button>

              <button
                onClick={() => setActiveTab('articles')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all ${
                  activeTab === 'articles'
                    ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#121215] hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-[#fbbf24]" />
                <span>Articles & Blog</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all ${
                  activeTab === 'skills'
                    ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#121215] hover:text-white'
                }`}
              >
                <Cpu className="w-4 h-4 text-[#a855f7]" />
                <span>Skills Arsenal</span>
              </button>

              <div className="pt-3 border-t border-[#27272a]">
                <p className="px-2 py-1 text-[10px] text-[#71717a] font-bold uppercase tracking-wider">Backup & Tools</p>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg transition-all ${
                    activeTab === 'settings'
                      ? 'bg-[#18181c] text-[#a78bfa] border border-[#27272a] font-bold'
                      : 'text-[#a1a1aa] hover:bg-[#121215] hover:text-white'
                  }`}
                >
                  <Download className="w-4 h-4 text-[#818cf8]" />
                  <span>Backup & Restore</span>
                </button>
              </div>
            </div>

            {/* Save quick action */}
            <div className="space-y-2 pt-2 border-t border-[#27272a]">
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-[#a78bfa] text-[#09090b] font-mono text-xs font-bold shadow-md hover:bg-[#b89fff] transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>

          {/* Right Form Editor Panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#0c0c0f]">
            
            {/* -------------------- PROFILE TAB -------------------- */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                      <User className="w-4 h-4 text-[#a78bfa]" />
                      Personal Profile & Hero Information
                    </h3>
                    <p className="text-xs text-[#a1a1aa]">Configure headline, email, avatar image, and academic details.</p>
                  </div>
                </div>

                {/* Profile Avatar Upload Section */}
                <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a] flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#a78bfa] shadow-lg relative bg-[#18181c]">
                      <img
                        src={formData.profileImage}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover object-center"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1 text-center sm:text-left">
                    <label className="text-xs font-mono font-bold text-[#a78bfa] uppercase tracking-wider block">
                      Profile Avatar Picture
                    </label>
                    <p className="text-xs text-[#a1a1aa]">
                      Upload your exact custom pixel avatar or headshot image (PNG, WebP, SVG).
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <label className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#18181c] hover:bg-[#27272a] border border-[#27272a] text-white text-xs font-mono cursor-pointer transition-all">
                        <ImageIcon className="w-3.5 h-3.5 text-[#a78bfa]" />
                        <span>Choose New Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, profileImage: '/AvatarSKB.png' }))}
                        className="px-3 py-1.5 rounded-lg bg-[#18181c] hover:bg-[#27272a] border border-[#27272a] text-[#a1a1aa] hover:text-white text-xs font-mono"
                      >
                        Reset Avatar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="text-[#a1a1aa] mb-1 block">Full Name</label>
                    <input
                      type="text"
                      value={formData.personalDetails.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalDetails: { ...formData.personalDetails, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#a1a1aa] mb-1 block">Professional Title</label>
                    <input
                      type="text"
                      value={formData.personalDetails.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalDetails: { ...formData.personalDetails, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#a1a1aa] mb-1 block">Brand Header Text</label>
                    <input
                      type="text"
                      value={formData.personalDetails.brand}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalDetails: { ...formData.personalDetails, brand: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#a1a1aa] mb-1 block">Primary Email</label>
                    <input
                      type="email"
                      value={formData.personalDetails.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalDetails: { ...formData.personalDetails, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[#a1a1aa] mb-1 block">Hero Tagline Statement</label>
                    <textarea
                      rows={2}
                      value={formData.personalDetails.tagline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalDetails: { ...formData.personalDetails, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#a1a1aa] mb-1 block">Location / Timezone</label>
                    <input
                      type="text"
                      value={formData.personalDetails.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalDetails: { ...formData.personalDetails, location: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#a1a1aa] mb-1 block">Handle / ID</label>
                    <input
                      type="text"
                      value={formData.personalDetails.handle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalDetails: { ...formData.personalDetails, handle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#121215] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                    />
                  </div>
                </div>

                {/* Academic Credentials */}
                <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-4">
                  <h4 className="font-mono text-xs font-bold text-[#a78bfa] uppercase tracking-wider">
                    Academic Background & Honors
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className="text-[#a1a1aa] mb-1 block">Degree</label>
                      <input
                        type="text"
                        value={formData.personalDetails.education.degree}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalDetails: {
                              ...formData.personalDetails,
                              education: { ...formData.personalDetails.education, degree: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#a1a1aa] mb-1 block">Institution</label>
                      <input
                        type="text"
                        value={formData.personalDetails.education.institution}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalDetails: {
                              ...formData.personalDetails,
                              education: { ...formData.personalDetails.education, institution: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#a1a1aa] mb-1 block">CGPA / Score</label>
                      <input
                        type="text"
                        value={formData.personalDetails.education.cgpa}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalDetails: {
                              ...formData.personalDetails,
                              education: { ...formData.personalDetails.education, cgpa: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#a1a1aa] mb-1 block">Honors / Awards</label>
                      <input
                        type="text"
                        value={formData.personalDetails.education.honors}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalDetails: {
                              ...formData.personalDetails,
                              education: { ...formData.personalDetails.education, honors: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-[#27272a] text-white focus:border-[#a78bfa] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-4">
                  <h4 className="font-mono text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                    Social & Academic Links
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className="text-[#a1a1aa] mb-1 block">GitHub Profile URL</label>
                      <input
                        type="text"
                        value={formData.personalDetails.socials.github}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalDetails: {
                              ...formData.personalDetails,
                              socials: { ...formData.personalDetails.socials, github: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#a1a1aa] mb-1 block">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        value={formData.personalDetails.socials.linkedin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalDetails: {
                              ...formData.personalDetails,
                              socials: { ...formData.personalDetails.socials, linkedin: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#a1a1aa] mb-1 block">Google Scholar URL</label>
                      <input
                        type="text"
                        value={formData.personalDetails.socials.scholar}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalDetails: {
                              ...formData.personalDetails,
                              socials: { ...formData.personalDetails.socials, scholar: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#a1a1aa] mb-1 block">ResearchGate URL</label>
                      <input
                        type="text"
                        value={formData.personalDetails.socials.researchgate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalDetails: {
                              ...formData.personalDetails,
                              socials: { ...formData.personalDetails.socials, researchgate: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- EXPERIENCE TAB -------------------- */}
            {activeTab === 'experience' && (
              <div className="space-y-6 animate-fade-in font-mono">
                <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#38bdf8]" />
                      Work Experience Timeline ({formData.experiences.length})
                    </h3>
                    <p className="text-xs text-[#a1a1aa]">Manage career roles, achievements, and technology stacks.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newExp: Experience = {
                        id: `exp-${Date.now()}`,
                        role: 'Senior Software Engineer',
                        company: 'Tech Enterprise',
                        period: '2024 - Present',
                        location: 'Remote',
                        description: 'Architecting scalable cloud microservices and automated data pipelines.',
                        terminalCommand: 'cat ~/experience/new_role.log',
                        achievements: ['Engineered high-throughput API endpoints.'],
                        techStack: ['Python', 'Docker', 'PostgreSQL'],
                        metrics: [{ label: 'Performance Gain', value: '50%' }],
                      };
                      setFormData({ ...formData, experiences: [newExp, ...formData.experiences] });
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Experience</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.experiences.map((exp, index) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                        <span className="text-xs text-[#38bdf8] font-bold uppercase">Role #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.experiences.filter((e) => e.id !== exp.id);
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="text-[#f43f5e] hover:text-red-400 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Role Title</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[index].role = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[index].company = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Period (e.g. 2023 - Present)</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[index].period = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[index].location = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Summary Description</label>
                          <textarea
                            rows={2}
                            value={exp.description}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[index].description = e.target.value;
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none resize-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            value={exp.techStack.join(', ')}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[index].techStack = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-[#38bdf8] focus:border-[#38bdf8] outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Key Achievements (one per line)</label>
                          <textarea
                            rows={3}
                            value={exp.achievements.join('\n')}
                            onChange={(e) => {
                              const updated = [...formData.experiences];
                              updated[index].achievements = e.target.value.split('\n').filter((line) => line.trim().length > 0);
                              setFormData({ ...formData, experiences: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#38bdf8] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------- PROJECTS TAB -------------------- */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-fade-in font-mono">
                <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-[#34d399]" />
                      Architecture Projects & Case Studies ({formData.projects.length})
                    </h3>
                    <p className="text-xs text-[#a1a1aa]">Manage system case studies, diagrams, and live links.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newProj: Project = {
                        id: `project-${Date.now()}`,
                        title: 'New Distributed System Project',
                        category: 'AI & Automation',
                        shortDesc: 'A high-throughput distributed microservices project.',
                        fullDesc: 'Comprehensive description of system architecture and outcomes.',
                        techStack: ['Python', 'Docker', 'Redis'],
                        metrics: [{ label: 'Latency', value: '<50ms' }],
                        architectureOverview: ['Modular architecture with async worker pool.'],
                        highlights: ['Deployed in production.'],
                        featured: true,
                      };
                      setFormData({ ...formData, projects: [newProj, ...formData.projects] });
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#34d399]/10 hover:bg-[#34d399]/20 border border-[#34d399]/30 text-[#34d399] text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.projects.map((project, index) => (
                    <div key={project.id} className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                        <span className="text-xs text-[#34d399] font-bold uppercase">Project #{index + 1}</span>
                        <div className="flex items-center space-x-3">
                          <label className="flex items-center space-x-1.5 text-xs text-[#a1a1aa] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={project.featured}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].featured = e.target.checked;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="accent-[#34d399]"
                            />
                            <span>Featured</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.projects.filter((p) => p.id !== project.id);
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="text-[#f43f5e] hover:text-red-400 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Project Title</label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].title = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#34d399] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Category</label>
                          <select
                            value={project.category}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].category = e.target.value as any;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#34d399] outline-none"
                          >
                            <option value="AI & Automation">AI & Automation</option>
                            <option value="Blockchain">Blockchain</option>
                            <option value="Enterprise Systems">Enterprise Systems</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Short Summary</label>
                          <input
                            type="text"
                            value={project.shortDesc}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].shortDesc = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#34d399] outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Full Case Study Description</label>
                          <textarea
                            rows={3}
                            value={project.fullDesc}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].fullDesc = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#34d399] outline-none resize-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            value={project.techStack.join(', ')}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].techStack = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-[#34d399] focus:border-[#34d399] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">GitHub Repository URL</label>
                          <input
                            type="text"
                            value={project.githubUrl || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].githubUrl = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#34d399] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Live Demo URL</label>
                          <input
                            type="text"
                            value={project.liveUrl || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].liveUrl = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#34d399] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------- RESEARCH TAB -------------------- */}
            {activeTab === 'research' && (
              <div className="space-y-6 animate-fade-in font-mono">
                <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#f43f5e]" />
                      Publications & Research Papers ({formData.researchPapers.length})
                    </h3>
                    <p className="text-xs text-[#a1a1aa]">Manage peer-reviewed IEEE/Springer publications and whitepapers.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newPaper: ResearchPaper = {
                        id: `paper-${Date.now()}`,
                        title: 'New Technical Publication',
                        authors: 'Sadman Sakib, et al.',
                        publication: 'IEEE Proceedings',
                        year: '2025',
                        type: 'Peer-Reviewed Journal',
                        abstract: 'Abstract statement detailing research methodology and findings.',
                        keywords: ['AI', 'Distributed Systems'],
                        citationsCount: 0,
                        featured: true,
                      };
                      setFormData({ ...formData, researchPapers: [newPaper, ...formData.researchPapers] });
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#f43f5e]/10 hover:bg-[#f43f5e]/20 border border-[#f43f5e]/30 text-[#f43f5e] text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Paper</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.researchPapers.map((paper, index) => (
                    <div key={paper.id} className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                        <span className="text-xs text-[#f43f5e] font-bold uppercase">Paper #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.researchPapers.filter((p) => p.id !== paper.id);
                            setFormData({ ...formData, researchPapers: updated });
                          }}
                          className="text-[#f43f5e] hover:text-red-400 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Paper Title</label>
                          <input
                            type="text"
                            value={paper.title}
                            onChange={(e) => {
                              const updated = [...formData.researchPapers];
                              updated[index].title = e.target.value;
                              setFormData({ ...formData, researchPapers: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#f43f5e] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Authors</label>
                          <input
                            type="text"
                            value={paper.authors}
                            onChange={(e) => {
                              const updated = [...formData.researchPapers];
                              updated[index].authors = e.target.value;
                              setFormData({ ...formData, researchPapers: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#f43f5e] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Publication / Venue</label>
                          <input
                            type="text"
                            value={paper.publication}
                            onChange={(e) => {
                              const updated = [...formData.researchPapers];
                              updated[index].publication = e.target.value;
                              setFormData({ ...formData, researchPapers: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#f43f5e] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Year</label>
                          <input
                            type="text"
                            value={paper.year}
                            onChange={(e) => {
                              const updated = [...formData.researchPapers];
                              updated[index].year = e.target.value;
                              setFormData({ ...formData, researchPapers: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#f43f5e] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Citations Count</label>
                          <input
                            type="number"
                            value={paper.citationsCount || 0}
                            onChange={(e) => {
                              const updated = [...formData.researchPapers];
                              updated[index].citationsCount = parseInt(e.target.value) || 0;
                              setFormData({ ...formData, researchPapers: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#f43f5e] outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Abstract</label>
                          <textarea
                            rows={3}
                            value={paper.abstract}
                            onChange={(e) => {
                              const updated = [...formData.researchPapers];
                              updated[index].abstract = e.target.value;
                              setFormData({ ...formData, researchPapers: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#f43f5e] outline-none resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------- ARTICLES TAB -------------------- */}
            {activeTab === 'articles' && (
              <div className="space-y-6 animate-fade-in font-mono">
                <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#fbbf24]" />
                      Articles & Blog Posts ({formData.blogArticles.length})
                    </h3>
                    <p className="text-xs text-[#a1a1aa]">Manage published technical guides and articles.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newArticle: BlogArticle = {
                        id: `blog-${Date.now()}`,
                        title: 'New Technical Article',
                        readTime: '5 min read',
                        date: 'Feb 2025',
                        category: 'Engineering',
                        summary: 'Summary of technical insights and takeaways.',
                      };
                      setFormData({ ...formData, blogArticles: [newArticle, ...formData.blogArticles] });
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#fbbf24]/10 hover:bg-[#fbbf24]/20 border border-[#fbbf24]/30 text-[#fbbf24] text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Article</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.blogArticles.map((article, index) => (
                    <div key={article.id} className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                        <span className="text-xs text-[#fbbf24] font-bold uppercase">Article #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.blogArticles.filter((a) => a.id !== article.id);
                            setFormData({ ...formData, blogArticles: updated });
                          }}
                          className="text-[#f43f5e] hover:text-red-400 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Article Title</label>
                          <input
                            type="text"
                            value={article.title}
                            onChange={(e) => {
                              const updated = [...formData.blogArticles];
                              updated[index].title = e.target.value;
                              setFormData({ ...formData, blogArticles: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#fbbf24] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Category</label>
                          <input
                            type="text"
                            value={article.category}
                            onChange={(e) => {
                              const updated = [...formData.blogArticles];
                              updated[index].category = e.target.value;
                              setFormData({ ...formData, blogArticles: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#fbbf24] outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#a1a1aa] mb-1 block">Read Time & Date</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={article.readTime}
                              onChange={(e) => {
                                const updated = [...formData.blogArticles];
                                updated[index].readTime = e.target.value;
                                setFormData({ ...formData, blogArticles: updated });
                              }}
                              placeholder="e.g. 5 min read"
                              className="w-1/2 px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#fbbf24] outline-none"
                            />
                            <input
                              type="text"
                              value={article.date}
                              onChange={(e) => {
                                const updated = [...formData.blogArticles];
                                updated[index].date = e.target.value;
                                setFormData({ ...formData, blogArticles: updated });
                              }}
                              placeholder="e.g. Feb 2025"
                              className="w-1/2 px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#fbbf24] outline-none"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#a1a1aa] mb-1 block">Summary</label>
                          <textarea
                            rows={2}
                            value={article.summary}
                            onChange={(e) => {
                              const updated = [...formData.blogArticles];
                              updated[index].summary = e.target.value;
                              setFormData({ ...formData, blogArticles: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-[#18181c] border border-[#27272a] text-white focus:border-[#fbbf24] outline-none resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------- SKILLS TAB -------------------- */}
            {activeTab === 'skills' && (
              <div className="space-y-6 animate-fade-in font-mono">
                <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#a855f7]" />
                      Technical Arsenal & Skills ({formData.skillCategories.length} Categories)
                    </h3>
                    <p className="text-xs text-[#a1a1aa]">Manage skill domains and proficiency levels.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {formData.skillCategories.map((cat, catIdx) => (
                    <div key={catIdx} className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-4">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={cat.title}
                          onChange={(e) => {
                            const updated = [...formData.skillCategories];
                            updated[catIdx].title = e.target.value;
                            setFormData({ ...formData, skillCategories: updated });
                          }}
                          className="px-3 py-1 bg-[#18181c] border border-[#27272a] text-white font-bold text-xs rounded focus:border-[#a855f7] outline-none w-2/3"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...formData.skillCategories];
                            updated[catIdx].skills.push({ name: 'New Skill', level: 85, categoryTag: 'Core' });
                            setFormData({ ...formData, skillCategories: updated });
                          }}
                          className="px-2.5 py-1 rounded bg-[#a855f7]/10 hover:bg-[#a855f7]/20 border border-[#a855f7]/30 text-[#a855f7] text-[11px] font-bold flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Skill</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {cat.skills.map((s, skillIdx) => (
                          <div key={skillIdx} className="flex items-center gap-2 text-xs">
                            <input
                              type="text"
                              value={s.name}
                              onChange={(e) => {
                                const updated = [...formData.skillCategories];
                                updated[catIdx].skills[skillIdx].name = e.target.value;
                                setFormData({ ...formData, skillCategories: updated });
                              }}
                              className="flex-1 px-2.5 py-1 rounded bg-[#18181c] border border-[#27272a] text-white outline-none"
                            />
                            <div className="w-28 flex items-center gap-1">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={s.level}
                                onChange={(e) => {
                                  const updated = [...formData.skillCategories];
                                  updated[catIdx].skills[skillIdx].level = parseInt(e.target.value) || 0;
                                  setFormData({ ...formData, skillCategories: updated });
                                }}
                                className="w-12 px-1.5 py-1 rounded bg-[#18181c] border border-[#27272a] text-[#a855f7] text-center outline-none"
                              />
                              <span className="text-[#a1a1aa] text-[10px]">%</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...formData.skillCategories];
                                updated[catIdx].skills = updated[catIdx].skills.filter((_, idx) => idx !== skillIdx);
                                setFormData({ ...formData, skillCategories: updated });
                              }}
                              className="text-[#f43f5e] hover:text-red-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------- BACKUP & RESTORE TAB -------------------- */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in font-mono">
                <div className="border-b border-[#27272a] pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#818cf8]" />
                    Backup, Restore & Reset Tools
                  </h3>
                  <p className="text-xs text-[#a1a1aa]">Export your portfolio data as JSON or restore from a backup file.</p>
                </div>

                {importError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
                    {importError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Export JSON */}
                  <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Export Backup</h4>
                      <p className="text-[11px] text-[#a1a1aa]">
                        Download a full JSON snapshot of all portfolio text, links, and avatar image.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={exportJsonData}
                      className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-[#818cf8]/10 hover:bg-[#818cf8]/20 border border-[#818cf8]/30 text-[#818cf8] text-xs font-bold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download JSON</span>
                    </button>
                  </div>

                  {/* Import JSON */}
                  <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Restore Backup</h4>
                      <p className="text-[11px] text-[#a1a1aa]">
                        Upload a previously exported JSON backup file to overwrite current state.
                      </p>
                    </div>
                    <label className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload JSON File</span>
                      <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  {/* Reset Defaults */}
                  <div className="p-4 rounded-xl bg-[#121215] border border-[#27272a] space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#f43f5e] uppercase tracking-wider mb-1">Reset Defaults</h4>
                      <p className="text-[11px] text-[#a1a1aa]">
                        Revert all data back to the original default portfolio state and avatar.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-[#f43f5e]/10 hover:bg-[#f43f5e]/20 border border-[#f43f5e]/30 text-[#f43f5e] text-xs font-bold"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Original</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 bg-[#121215] border-t border-[#27272a] flex items-center justify-between shrink-0 font-mono text-xs">
          <span className="text-[#a1a1aa]">Status: Ready to apply edits</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#18181c] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white border border-[#27272a] transition-all"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-5 py-1.5 bg-[#a78bfa] hover:bg-[#b89fff] text-[#09090b] font-bold rounded-lg shadow-lg shadow-[#a78bfa]/20 transition-all cursor-pointer active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
