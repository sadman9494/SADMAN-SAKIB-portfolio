import { Experience, Project, ResearchPaper, BlogArticle, SkillCategory } from '../types';

export const personalDetails = {
  name: "Sadman Sakib",
  title: "Software Engineer & AI Consultant",
  brand: "SS ARCHITECT",
  handle: "ss-architect",
  tagline: "Architecting high-throughput distributed systems & enterprise AI pipelines.",
  email: "hello@ssarchitect.dev",
  location: "Dhaka, Bangladesh [UTC+6]",
  education: {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "American International University-Bangladesh (AIUB)",
    cgpa: "3.95 / 4.00",
    honors: "Summa Cum Laude & Vice-Chancellor's Gold Medalist",
    graduationYear: "2023",
  },
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    researchgate: "https://researchgate.net",
    scholar: "https://scholar.google.com",
  },
  stats: [
    { label: "CGPA", value: "3.95/4.0", note: "Summa Cum Laude Gold Medalist" },
    { label: "Systems Built", value: "12+", note: "Enterprise & Blockchain" },
    { label: "Resume Parsing Match", value: "87%", note: "Project Kronos Accuracy" },
    { label: "Automation Savings", value: "94%", note: "Mapping Time Reduced" },
  ]
};

export const experiences: Experience[] = [
  {
    id: "bat-agnis",
    role: "Software Engineer / AI Solutions Specialist",
    company: "British American Tobacco (BAT) / Agnis Solutions",
    period: "2023 - Present",
    location: "Dhaka, Bangladesh",
    description: "Designed and engineered enterprise AI resume matching systems, distributed pipeline automations, and intelligent document processing workflows.",
    terminalCommand: "cat ~/experience/bat_agnis_execution.log",
    achievements: [
      "Engineered Project Kronos: An automated resume parsing & candidate matching engine powered by PyTorch, FastAPI, and Hugging Face embeddings.",
      "Achieved 87% match rate accuracy against complex senior technical job requisitions.",
      "Reduced HR manual parsing effort by over 60%, automating key talent pipeline ingestion.",
      "Deployed scalable microservices on Docker containers with Redis queuing for zero-downtime asynchronous background processing."
    ],
    techStack: ["Python", "PyTorch", "FastAPI", "Hugging Face", "Celery", "Redis", "Docker", "PostgreSQL"],
    metrics: [
      { label: "Parsing Match Rate", value: "87%" },
      { label: "HR Effort Reduction", value: "60%" }
    ]
  },
  {
    id: "intellias",
    role: "Software Engineer (Contract / Consulting)",
    company: "Intellias",
    period: "2023",
    location: "Remote / International",
    description: "Built multi-agent autonomous workflow mapping engines and high-concurrency microservices for international automotive and enterprise clients.",
    terminalCommand: "cat ~/experience/intellias_autopilot.log",
    achievements: [
      "Architected Project AutoPilot: A multi-agent system automating schema transformation and external API payload mapping.",
      "Reduced schema integration and data mapping turnaround time by 94% across enterprise pipelines.",
      "Implemented distributed caching with Redis and rate-limiting middleware for resilience under high traffic loads."
    ],
    techStack: ["Python", "LangChain", "OpenAPI", "Redis", "Docker", "FastAPI", "Celery"],
    metrics: [
      { label: "Mapping Time Reduced", value: "94%" },
      { label: "Throughput Boost", value: "4.5x" }
    ]
  },
  {
    id: "shadhin-lab",
    role: "Software & Web3 Engineer",
    company: "Shadhin Lab",
    period: "2022 - 2023",
    location: "Dhaka, Bangladesh",
    description: "Spearheaded blockchain-based asset tracking applications and secure distributed ledger infrastructure.",
    terminalCommand: "cat ~/experience/shadhin_lab_blockchain.log",
    achievements: [
      "Developed a Peer-Reviewed Blockchain-based Smartphone Ownership Tracking System using Hyperledger Fabric and Solidity.",
      "Engineered zero-knowledge verification mechanisms ensuring user data privacy while preventing counterfeit device resale.",
      "Published research findings in an international IEEE/Springer venue (2024)."
    ],
    techStack: ["Hyperledger Fabric", "Solidity", "Node.js", "Express", "Docker", "Web3.js", "MongoDB"],
    metrics: [
      { label: "Peer-Reviewed", value: "2024 IEEE/Springer" },
      { label: "Chaincode Uptime", value: "99.98%" }
    ]
  },
  {
    id: "ibos-limited",
    role: "Junior Software Engineer",
    company: "iBOS Limited",
    period: "2021 - 2022",
    location: "Dhaka, Bangladesh",
    description: "Contributed to enterprise ERP modules, financial microservices, and database query optimizations.",
    terminalCommand: "cat ~/experience/ibos_erp.log",
    achievements: [
      "Developed high-throughput financial calculation modules in .NET Core and SQL Server.",
      "Optimized legacy SQL queries, reducing database latency by 42% on core reporting endpoints.",
      "Implemented OAuth2 and JWT role-based access control (RBAC) across ERP backend routes."
    ],
    techStack: ["C#", ".NET Core", "MSSQL", "Entity Framework", "REST API", "Git"],
    metrics: [
      { label: "Query Latency Reduction", value: "42%" }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "project-kronos",
    title: "Project Kronos — AI Resume Parsing & Candidate Matcher",
    category: "AI & Automation",
    shortDesc: "Enterprise AI pipeline automating resume parsing, semantic embedding matching, and candidate ranking.",
    fullDesc: "Project Kronos was architected to solve the massive manual overhead of screening thousands of resumes for senior technical roles. Utilizing custom transformer models, OCR extraction, and FastAPI microservices, the system converts unstructured PDFs into structured candidate vectors and evaluates them against job requirements.",
    techStack: ["Python", "PyTorch", "FastAPI", "Hugging Face", "Celery", "Redis", "Docker", "PostgreSQL"],
    metrics: [
      { label: "Match Accuracy Rate", value: "87%" },
      { label: "Manual Effort Reduction", value: "60%" },
      { label: "Avg Processing Time", value: "1.2s / Resume" }
    ],
    architectureOverview: [
      "PDF & DOCX Multi-Format Ingestion via asynchronous worker queue (Celery + Redis).",
      "Semantic Named Entity Recognition (NER) extracting skills, experience timeline, and education.",
      "Vector Embedding & Cosine Similarity ranking powered by PyTorch fine-tuned BERT models.",
      "FastAPI REST API presenting structured ranking breakdown and candidate skill gap analysis."
    ],
    systemDiagramLines: [
      "[ Candidate Resume ] ---> ( Multi-Format Parser / OCR )",
      "                                 │",
      "                                 ▼",
      "                     ( NER Skill Extractor )",
      "                                 │",
      "                                 ▼",
      "                     [ PyTorch Embedding Engine ]",
      "                                 │",
      "                                 ▼",
      "                 < Cosine Vector Similarity Match >",
      "                                 │",
      "                                 ▼",
      "                   [ Ranked Candidate Matrix ]"
    ],
    highlights: [
      "87% semantic matching precision validated against HR screening datasets.",
      "Asynchronous queuing handling 500+ parallel document parsing tasks.",
      "Modular microservice containerized with Docker and deployed via CI/CD pipelines."
    ],
    featured: true
  },
  {
    id: "project-autopilot",
    title: "Project AutoPilot — Multi-Agent Workflow Engine",
    category: "AI & Automation",
    shortDesc: "Autonomous AI agent framework for data schema translation, automated workflow mapping, and system integration.",
    fullDesc: "Designed for enterprise data migration and API mapping, AutoPilot leverages multi-agent collaboration to analyze source schemas, map complex JSON/XML structures, and generate verified REST payload adapters without manual coding.",
    techStack: ["Python", "LangChain", "OpenAPI", "Redis", "Docker", "FastAPI"],
    metrics: [
      { label: "Data Mapping Time Reduced", value: "94%" },
      { label: "Schema Compatibility", value: "99.1%" },
      { label: "Throughput Boost", value: "4.5x" }
    ],
    architectureOverview: [
      "Schema Analyzer Agent inspects input API docs & payload structures.",
      "Mapping Planner Agent synthesizes conversion rules and field mappings.",
      "Code Generator Agent produces lightweight Python/TypeScript adapter scripts.",
      "Validation Sandbox executes test runs and auto-corrects edge cases."
    ],
    systemDiagramLines: [
      "[ Raw Schema A ] ───> ( Schema Inspector Agent )",
      "                             │",
      "                             ▼",
      "                   ( Mapping Planner Agent )",
      "                             │",
      "                             ▼",
      "                 [ Adapter Generator Sandbox ]",
      "                             │",
      "                             ▼",
      "[ Output Payload B ] <─── ( Execution Validator )"
    ],
    highlights: [
      "Cut client integration onboarding time from 3 weeks down to under 2 days.",
      "Self-healing validation loop fixing formatting mismatches automatically."
    ],
    featured: true
  },
  {
    id: "blockchain-ownership-tracker",
    title: "Decentralized Smartphone Ownership Tracking System",
    category: "Blockchain",
    shortDesc: "Hyperledger Fabric permissioned blockchain network ensuring tamper-proof device history and anti-theft resale protection.",
    fullDesc: "Peer-reviewed research project and reference implementation. Solves mobile device theft and IMEI spoofing by recording device manufacturing, supply chain transfer, and consumer ownership transfers on an immutable ledger.",
    techStack: ["Hyperledger Fabric", "Solidity", "Node.js", "Docker", "Web3.js", "Express"],
    metrics: [
      { label: "Peer-Reviewed Venue", value: "IEEE/Springer 2024" },
      { label: "Ledger Finality Time", value: "< 250ms" },
      { label: "Anti-Spoof Security", value: "100% Cryptographic" }
    ],
    architectureOverview: [
      "Permissioned Hyperledger Fabric Network with Manufacturer, Carrier, and Regulator Peers.",
      "Smart Contracts (Chaincode) managing Device Minting, Ownership Transfer, and Loss Flags.",
      "Node.js REST Gateway connecting mobile consumer apps to the blockchain consensus layer.",
      "Cryptographic key pair generation for verified P2P ownership transfers."
    ],
    systemDiagramLines: [
      "[ Manufacturer Peer ] ──> Mint Device IMEI (Chaincode)",
      "                                │",
      "                                ▼",
      "                       < Fabric Consensus >",
      "                                │",
      "                                ▼",
      "[ Consumer Mobile App ] ──> P2P Transfer (Zero-Knowledge Key Sign)"
    ],
    highlights: [
      "Peer-reviewed publication in IEEE/Springer proceedings (2024).",
      "Guarantees privacy while enabling instant stolen status check via IMEI verification."
    ],
    featured: true
  },
  {
    id: "ibos-microservices-erp",
    title: "High-Throughput Enterprise ERP Ledger",
    category: "Enterprise Systems",
    shortDesc: "Distributed microservices architecture powering multi-branch inventory, ledger bookkeeping, and reporting.",
    fullDesc: "High-availability financial backend engine processing thousands of multi-currency transactions per minute. Engineered with .NET Core 8 clean architecture, CQRS pattern, and PostgreSQL read/write split.",
    techStack: ["C#", ".NET Core 8", "PostgreSQL", "Redis", "RabbitMQ", "Docker", "MSSQL"],
    metrics: [
      { label: "DB Latency Reduced", value: "42%" },
      { label: "Transaction Speed", value: "3,500 TPS" },
      { label: "System Uptime", value: "99.95%" }
    ],
    architectureOverview: [
      "CQRS (Command Query Responsibility Segregation) isolating heavy ledger writes from search queries.",
      "RabbitMQ Event Bus distributing inventory state updates across warehouse nodes.",
      "Redis Distributed Caching caching frequent balance checks and token validations."
    ],
    systemDiagramLines: [
      "[ Client Request ] ───> ( API Gateway / Auth )",
      "                             │",
      "               ┌─────────────┴─────────────┐",
      "               ▼                           ▼",
      "       ( Command Handler )         ( Query Handler )",
      "               │                           │",
      "               ▼                           ▼",
      "        [ RabbitMQ Bus ]            [ Redis Cache ]",
      "               │                           │",
      "               ▼                           ▼",
      "       [ PostgreSQL Write ]       [ PostgreSQL Read ]"
    ],
    highlights: [
      "Clean Architecture implementation with complete unit test coverage.",
      "Distributed lock mechanisms preventing double-spend and stock race conditions."
    ],
    featured: false
  }
];

export const researchPapers: ResearchPaper[] = [
  {
    id: "paper-blockchain-smartphone",
    title: "A Blockchain-Based Smartphone Ownership Tracking System",
    authors: "Sadman Sakib, et al.",
    publication: "Peer-Reviewed Proceedings (IEEE / Springer International Series)",
    year: "2024",
    type: "Peer-Reviewed Journal",
    doi: "10.1007/978-3-031-xxxx-x",
    abstract: "Smartphones have become ubiquitous personal devices, making them high-value targets for theft, illegal resale, and IMEI tampering. Traditional centralized databases managed by telecommunication authorities are vulnerable to single-point-of-failure attacks and lack cross-border interoperability. This paper proposes a permissioned blockchain framework using Hyperledger Fabric to establish an immutable, decentralized registry for mobile device ownership. By combining cryptographic ownership tokens with automated chaincode verification, the system enables secure peer-to-peer device transfers, immediate loss reporting, and tamper-proof history checks for secondary markets.",
    keywords: ["Hyperledger Fabric", "Blockchain", "Device Tracking", "IMEI Verification", "Cryptography", "Smart Contracts"],
    citationsCount: 14,
    paperUrl: "#",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: "paper-ai-resume-parser",
    title: "Semantic Vector Embeddings for Automated Enterprise Talent Acquisition",
    authors: "Sadman Sakib",
    publication: "Technical Architecture Whitepaper & AI Benchmark",
    year: "2023",
    type: "Technical Whitepaper",
    abstract: "Evaluating senior engineering candidate resumes against granular technical job requisitions remains a challenge for legacy Keyword Matching systems. This paper introduces a hybrid domain-specific Named Entity Recognition (NER) and transformer vector embedding pipeline. Tested on a dataset of 2,500+ real-world tech resumes, our architecture demonstrated an 87% alignment score with senior engineering hiring panel evaluations, outperforming traditional keyword ATS approaches by 34%.",
    keywords: ["PyTorch", "NLP", "Candidate Ranking", "FastAPI", "Vector Similarity"],
    citationsCount: 8,
    paperUrl: "#",
    githubUrl: "https://github.com",
    featured: true
  }
];

export const blogArticles: BlogArticle[] = [
  {
    id: "blog-ai-agents",
    title: "The Rise of Autonomous AI Agents in Enterprise Workflows",
    readTime: "6 min read",
    date: "Jan 2025",
    category: "AI & Systems",
    summary: "Moving beyond simple prompt engineering: How multi-agent state machines, LangChain/LangGraph, and deterministic sandboxes are replacing rigid legacy RPA tools."
  },
  {
    id: "blog-power-automate",
    title: "10 Power Automate & Python API Hacks That Save 20+ Hours Weekly",
    readTime: "8 min read",
    date: "Dec 2024",
    category: "Automation",
    summary: "Practical architect tips for blending Microsoft Power Automate with custom FastAPI webhooks and headless Playwright scripts for resilient document automation."
  },
  {
    id: "blog-ai-data-leaks",
    title: "Data Leaks from AI Models: Architectural Risks & Mitigation",
    readTime: "7 min read",
    date: "Nov 2024",
    category: "Security",
    summary: "How enterprise data leaks occur in fine-tuned LLMs and RAG vector stores — and how to engineer air-gapped retrieval layers and token redaction gateways."
  },
  {
    id: "blog-prompt-injection",
    title: "Hardening LLM Prompts Against Injection & Indirect Attacks",
    readTime: "5 min read",
    date: "Oct 2024",
    category: "Security",
    summary: "A practical developer guide to defensive prompt engineering, input sanitization, and output validation filters for enterprise AI microservices."
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Systems Architecture",
    icon: "Server",
    skills: [
      { name: "Python (FastAPI / Django / Flask)", level: 95, categoryTag: "Core" },
      { name: "C# / .NET Core 8", level: 90, categoryTag: "Enterprise" },
      { name: "PostgreSQL & MSSQL", level: 92, categoryTag: "Database" },
      { name: "Redis & Distributed Caching", level: 88, categoryTag: "Performance" },
      { name: "RabbitMQ & Microservices", level: 85, categoryTag: "Messaging" }
    ]
  },
  {
    title: "AI, ML & Automation",
    icon: "Cpu",
    skills: [
      { name: "PyTorch & Transformers", level: 88, categoryTag: "Deep Learning" },
      { name: "Hugging Face & NLP / NER", level: 90, categoryTag: "AI" },
      { name: "LangChain & Autonomous Agents", level: 92, categoryTag: "Agents" },
      { name: "Power Automate & Webhooks", level: 94, categoryTag: "RPA" },
      { name: "Vector Search & Embeddings", level: 89, categoryTag: "RAG" }
    ]
  },
  {
    title: "Blockchain & Emerging Tech",
    icon: "Boxes",
    skills: [
      { name: "Hyperledger Fabric", level: 88, categoryTag: "Permissioned" },
      { name: "Solidity & Smart Contracts", level: 85, categoryTag: "Web3" },
      { name: "Docker & Containerization", level: 92, categoryTag: "DevOps" },
      { name: "Kubernetes & Cloud Infra", level: 80, categoryTag: "Cloud" }
    ]
  },
  {
    title: "Algorithmic & Competitive Honors",
    icon: "Code",
    skills: [
      { name: "LeetCode Top 5% Global Rank", level: 95, categoryTag: "Algorithms" },
      { name: "HackerRank 5-Star Problem Solver", level: 95, categoryTag: "DS & Algo" },
      { name: "CGPA 3.95 Gold Medalist", level: 100, categoryTag: "Academic" }
    ]
  }
];

export const terminalCommandsHelp = [
  { cmd: "help", desc: "List all available terminal commands" },
  { cmd: "about", desc: "Print Sadman Sakib's summary bio & credentials" },
  { cmd: "experience", desc: "Display professional engineering logs & roles" },
  { cmd: "projects", desc: "List architecture case studies & systems built" },
  { cmd: "research", desc: "View peer-reviewed publications & whitepapers" },
  { cmd: "skills", desc: "Show tech arsenal & algorithmic proficiency" },
  { cmd: "contact", desc: "Launch terminal interactive contact pipeline" },
  { cmd: "download-cv", desc: "Open Curriculum Vitae architectural view" },
  { cmd: "ai <prompt>", desc: "Ask SS ARCHITECT AI Assistant directly" },
  { cmd: "clear", desc: "Clear terminal console history" },
];
