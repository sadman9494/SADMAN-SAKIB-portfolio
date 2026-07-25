export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  terminalCommand: string;
  achievements: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  category: 'AI & Automation' | 'Blockchain' | 'Enterprise Systems';
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  architectureOverview: string[];
  systemDiagramLines?: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  publication: string;
  year: string;
  type: 'Peer-Reviewed Journal' | 'Conference Paper' | 'Technical Whitepaper';
  doi?: string;
  abstract: string;
  keywords: string[];
  paperUrl?: string;
  githubUrl?: string;
  citationsCount?: number;
  featured?: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  summary: string;
  link?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; categoryTag?: string }[];
}

export interface TerminalCommand {
  cmd: string;
  desc: string;
  output?: string;
}
