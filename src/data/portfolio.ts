import {
    Award,
    BadgeInfo,
    BriefcaseBusiness,
    Cpu,
    Database,
    FolderGit2,
    GitFork,
    GraduationCap,
    Languages,
    Mail,
    MonitorCog,
    Network,
    PackageCheck,
    Recycle,
    ScrollText,
    ShieldCheck,
    type LucideIcon,
} from 'lucide-react';

export type AppId =
    | 'cv'
    | 'projects'
    | 'experience'
    | 'skills'
    | 'autoAllocation'
    | 'recurringDecisions'
    | 'chileCompra'
    | 'itauInsurance'
    | 'bancoChileEnterprise'
    | 'clinicaAlemanaDigital'
    | 'education'
    | 'languages'
    | 'github'
    | 'linkedin'
    | 'contact'
    | 'recycleBin'
    | 'aboutSystem';

export type PortfolioApp = {
    id: AppId;
    title: string;
    icon: LucideIcon;
    accent: string;
    externalUrl?: string;
    defaultSize: {
        width: number;
        height: number;
    };
    defaultPosition: {
        x: number;
        y: number;
    };
};

export type ProjectCard = {
    id: Exclude<AppId, 'cv' | 'projects' | 'experience' | 'skills' | 'education' | 'languages' | 'github' | 'linkedin' | 'contact' | 'recycleBin' | 'aboutSystem'>;
    title: string;
    category: string;
    summary: string;
};

export type ProjectDetail = {
    role: string;
    period: string;
    summary: string;
    responsibilities?: string[];
    technologies?: string[];
    widgets?: string[];
};

export type ExperienceEntry = {
    company: string;
    role: string;
    period: string;
    highlights: string[];
};

export type EducationEntry = {
    degree: string;
    field: string;
    institution: string;
};

export type LanguageEntry = {
    language: string;
    level: string;
};

export type SkillBar = {
    label: string;
    value: number;
};

export type SkillSection = {
    title: string;
    items: string[];
};

export const profile = {
    name: 'Juan Paulo Rubilar Fontt',
    osName: 'Juan Paulo OS',
    roleLines: ['Senior Software Engineer', 'Technical Lead', 'Angular & React Specialist'],
    summary:
        'Computer Engineer with 13+ years of experience delivering enterprise solutions for banking, healthcare, government, retail and logistics industries. Specialized in Angular, React, TypeScript, Microfrontends, AWS and Azure. Strong background in technical leadership, software architecture, backend development and collaboration with Data Science teams.',
    email: 'paulofontt@gmail.com',
    location: 'Santiago, Chile',
    githubUrl: 'https://github.com/themachinecl',
    linkedinUrl: 'https://www.linkedin.com/in/juanpaulorf/',
    quickStats: ['13+ Years Experience', 'Enterprise Platforms', 'Banking', 'Healthcare', 'Logistics', 'Government'],
    primaryStack: ['Angular', 'React', 'TypeScript', 'NestJS'],
    industries: ['Banking', 'Healthcare', 'Government', 'Logistics', 'Retail'],
};

export const apps: PortfolioApp[] = [
    {
        id: 'cv',
        title: 'My CV',
        icon: ScrollText,
        accent: '#f7d154',
        defaultSize: { width: 720, height: 560 },
        defaultPosition: { x: 132, y: 82 },
    },
    {
        id: 'projects',
        title: 'Projects',
        icon: FolderGit2,
        accent: '#62d4f7',
        defaultSize: { width: 760, height: 560 },
        defaultPosition: { x: 210, y: 118 },
    },
    {
        id: 'experience',
        title: 'Experience',
        icon: BriefcaseBusiness,
        accent: '#8ddc71',
        defaultSize: { width: 760, height: 560 },
        defaultPosition: { x: 170, y: 102 },
    },
    {
        id: 'skills',
        title: 'Skills',
        icon: Cpu,
        accent: '#ff9f6e',
        defaultSize: { width: 720, height: 560 },
        defaultPosition: { x: 250, y: 132 },
    },
    {
        id: 'autoAllocation',
        title: 'AutoAllocationJapan.app',
        icon: MonitorCog,
        accent: '#f3a4ff',
        defaultSize: { width: 980, height: 650 },
        defaultPosition: { x: 130, y: 70 },
    },
    {
        id: 'education',
        title: 'Education',
        icon: GraduationCap,
        accent: '#7dbbff',
        defaultSize: { width: 620, height: 420 },
        defaultPosition: { x: 300, y: 148 },
    },
    {
        id: 'languages',
        title: 'Languages',
        icon: Languages,
        accent: '#95f0c5',
        defaultSize: { width: 560, height: 380 },
        defaultPosition: { x: 330, y: 168 },
    },
    {
        id: 'github',
        title: 'GitHub',
        icon: GitFork,
        accent: '#d5d9e2',
        externalUrl: 'https://github.com/themachinecl',
        defaultSize: { width: 620, height: 430 },
        defaultPosition: { x: 280, y: 140 },
    },
    {
        id: 'linkedin',
        title: 'LinkedIn',
        icon: Network,
        accent: '#7dbbff',
        externalUrl: 'https://www.linkedin.com/in/juanpaulorf/',
        defaultSize: { width: 620, height: 430 },
        defaultPosition: { x: 300, y: 156 },
    },
    {
        id: 'contact',
        title: 'Contact',
        icon: Mail,
        accent: '#95f0c5',
        defaultSize: { width: 580, height: 420 },
        defaultPosition: { x: 330, y: 120 },
    },
    {
        id: 'recycleBin',
        title: 'Recycle Bin',
        icon: Recycle,
        accent: '#c9d2e3',
        defaultSize: { width: 500, height: 340 },
        defaultPosition: { x: 360, y: 150 },
    },
    {
        id: 'aboutSystem',
        title: 'About System',
        icon: BadgeInfo,
        accent: '#a5d8ff',
        defaultSize: { width: 520, height: 360 },
        defaultPosition: { x: 380, y: 170 },
    },
    {
        id: 'recurringDecisions',
        title: 'Recurring Decisions Platform',
        icon: PackageCheck,
        accent: '#ffb56b',
        defaultSize: { width: 720, height: 500 },
        defaultPosition: { x: 260, y: 140 },
    },
    {
        id: 'chileCompra',
        title: 'ChileCompra Modernization',
        icon: Database,
        accent: '#62d4f7',
        defaultSize: { width: 720, height: 500 },
        defaultPosition: { x: 280, y: 160 },
    },
    {
        id: 'itauInsurance',
        title: 'Itaú Insurance Platform',
        icon: ShieldCheck,
        accent: '#8ddc71',
        defaultSize: { width: 720, height: 500 },
        defaultPosition: { x: 300, y: 180 },
    },
    {
        id: 'bancoChileEnterprise',
        title: 'Banco de Chile Enterprise Applications',
        icon: Award,
        accent: '#f7d154',
        defaultSize: { width: 740, height: 510 },
        defaultPosition: { x: 320, y: 200 },
    },
    {
        id: 'clinicaAlemanaDigital',
        title: 'Clínica Alemana Digital Solutions',
        icon: ShieldCheck,
        accent: '#95f0c5',
        defaultSize: { width: 720, height: 500 },
        defaultPosition: { x: 340, y: 220 },
    },
];

export const desktopAppIds: AppId[] = [
    'cv',
    'projects',
    'experience',
    'skills',
    'autoAllocation',
    'education',
    'languages',
    'github',
    'linkedin',
    'contact',
    'recycleBin',
    'aboutSystem',
];

export const startMenuAppIds: AppId[] = desktopAppIds;

export const technicalSkillSections: SkillSection[] = [
    {
        title: 'Frontend',
        items: ['Angular 2-19', 'React', 'TypeScript', 'NgRx', 'RxJS', 'Angular Material', 'Microfrontends', 'Module Federation'],
    },
    {
        title: 'Backend',
        items: ['Node.js', 'NestJS', 'Spring Boot', 'Flask', 'FastAPI', 'GraphQL', 'REST APIs'],
    },
    {
        title: 'Cloud & DevOps',
        items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins'],
    },
    {
        title: 'Databases',
        items: ['SQL Server', 'PostgreSQL', 'Oracle'],
    },
    {
        title: 'Testing',
        items: ['Jest', 'Jasmine', 'Karma', 'React Testing Library', 'Selenium'],
    },
];

export const skillBars: SkillBar[] = [
    { label: 'Angular', value: 95 },
    { label: 'React', value: 90 },
    { label: 'TypeScript', value: 95 },
    { label: 'Microfrontends', value: 90 },
    { label: 'NestJS', value: 85 },
    { label: 'AWS', value: 80 },
    { label: 'Azure', value: 85 },
    { label: 'Docker', value: 80 },
    { label: 'Kubernetes', value: 75 },
    { label: 'SQL', value: 85 },
];

export const experienceTimeline: ExperienceEntry[] = [
    {
        company: 'STEFANINI LATAM',
        role: 'Senior Software Engineer',
        period: '2025 - Present',
        highlights: [
            'Auto Allocation Japan',
            'Recurring Decisions Platform',
            'Angular 17 -> 19 migration',
            'Microfrontends with Module Federation',
            'NestJS APIs',
            'Azure',
            'Docker',
            'Kubernetes',
            'Data Science collaboration',
        ],
    },
    {
        company: 'EPIDATA',
        role: 'Full Stack Developer',
        period: '2024 - 2025',
        highlights: ['ChileCompra modernization', 'React', 'TypeScript', 'Flask', 'FastAPI', 'PostgreSQL', 'AWS', 'Azure'],
    },
    {
        company: 'KABELI',
        role: 'Senior Developer',
        period: '2023 - 2024',
        highlights: ['Itaú insurance platform', 'React', 'React Native', 'Redux', 'Module Federation', 'NestJS', 'PostgreSQL', 'AWS'],
    },
    {
        company: 'NTT DATA',
        role: 'Team Leader / IT Solutions Analyst',
        period: '2018 - 2023',
        highlights: ['Banco de Chile', 'Clínica Alemana', 'Angular', 'React', 'GraphQL', 'NestJS', 'AWS', 'Azure'],
    },
];

export const educationEntries: EducationEntry[] = [
    {
        degree: "Master's Degree",
        field: 'Industrial Engineering',
        institution: 'Universidad Central de Chile',
    },
    {
        degree: "Bachelor's Degree",
        field: 'Computer Science & Computer Engineering',
        institution: 'Universidad Central de Chile',
    },
];

export const languageEntries: LanguageEntry[] = [
    {
        language: 'Spanish',
        level: 'Native',
    },
    {
        language: 'English',
        level: 'Professional Working Proficiency',
    },
];

export const projectCards: ProjectCard[] = [
    {
        id: 'autoAllocation',
        title: 'Auto Allocation Japan',
        category: 'Flagship enterprise platform',
        summary: 'Allocation, reservation, and operational coordination for a logistics workflow.',
    },
    {
        id: 'recurringDecisions',
        title: 'Recurring Decisions Platform',
        category: 'Microfrontend workflow',
        summary: 'Decision flows and Angular migration work inside a distributed enterprise architecture.',
    },
    {
        id: 'chileCompra',
        title: 'ChileCompra Modernization',
        category: 'Public sector modernization',
        summary: 'Frontend and API modernization using React, TypeScript, Flask, and FastAPI.',
    },
    {
        id: 'itauInsurance',
        title: 'Itaú Insurance Platform',
        category: 'Banking and insurance',
        summary: 'Consumer-facing insurance flows with React, React Native, Redux, and NestJS.',
    },
    {
        id: 'bancoChileEnterprise',
        title: 'Banco de Chile Enterprise Applications',
        category: 'Banking platform delivery',
        summary: 'Angular and React enterprise applications with GraphQL and cloud integration.',
    },
    {
        id: 'clinicaAlemanaDigital',
        title: 'Clínica Alemana Digital Solutions',
        category: 'Healthcare digital products',
        summary: 'Enterprise healthcare solutions delivered inside a multi-team environment.',
    },
];

export const projectDetails: Record<ProjectCard['id'], ProjectDetail> = {
    autoAllocation: {
        role: 'Senior Software Engineer',
        period: '2025 - Present',
        summary:
            'Flagship logistics platform for allocation, reservation handling, and operational visibility in Japan.',
        responsibilities: ['Angular migration', 'Microfrontends', 'NestJS APIs', 'Reservation system', 'Data Science integration'],
        technologies: ['Angular', 'TypeScript', 'NestJS', 'SQL Server', 'Azure', 'Docker', 'Kubernetes', 'Module Federation'],
        widgets: ['Reservation queue', 'Allocation status', 'Migration progress', 'API health', 'Operational sync'],
    },
    recurringDecisions: {
        role: 'Senior Software Engineer',
        period: '2025 - Present',
        summary:
            'Enterprise decision workflow platform with a modern Angular stack and distributed frontend delivery.',
        responsibilities: ['Angular 17 -> 19 migration', 'Module Federation architecture', 'NestJS service integration'],
        technologies: ['Angular', 'TypeScript', 'Microfrontends', 'Module Federation', 'NestJS', 'Azure', 'Docker', 'Kubernetes'],
        widgets: ['Decision pipeline', 'Review queue', 'Service map', 'Deployment status'],
    },
    chileCompra: {
        role: 'Full Stack Developer',
        period: '2024 - 2025',
        summary: 'Modernization work for ChileCompra using a mix of React UI and Python services.',
        responsibilities: ['React delivery', 'TypeScript implementation', 'Flask and FastAPI APIs', 'PostgreSQL data flows'],
        technologies: ['React', 'TypeScript', 'Flask', 'FastAPI', 'PostgreSQL', 'AWS', 'Azure'],
        widgets: ['Workflow board', 'API gateway', 'Database sync', 'Release tracker'],
    },
    itauInsurance: {
        role: 'Senior Developer',
        period: '2023 - 2024',
        summary: 'Insurance platform delivery with shared frontend modules and cross-platform experiences.',
        responsibilities: ['React', 'React Native', 'Redux', 'Module Federation', 'NestJS services'],
        technologies: ['React', 'React Native', 'Redux', 'Module Federation', 'NestJS', 'PostgreSQL', 'AWS'],
        widgets: ['Policy cards', 'Claim status', 'Shared modules', 'Service dashboard'],
    },
    bancoChileEnterprise: {
        role: 'Team Leader / IT Solutions Analyst',
        period: '2018 - 2023',
        summary: 'Enterprise application delivery across banking workflows and operational interfaces.',
        responsibilities: ['Angular delivery', 'React adoption', 'GraphQL integration', 'NestJS APIs', 'Cloud coordination'],
        technologies: ['Angular', 'React', 'GraphQL', 'NestJS', 'AWS', 'Azure'],
        widgets: ['Client workspace', 'Workflow KPI', 'GraphQL activity', 'Release board'],
    },
    clinicaAlemanaDigital: {
        role: 'Team Leader / IT Solutions Analyst',
        period: '2018 - 2023',
        summary: 'Digital healthcare solutions delivered as part of the NTT DATA portfolio.',
        responsibilities: ['Healthcare product delivery', 'Enterprise frontend architecture', 'Cloud-supported workflows'],
        technologies: ['Angular', 'React', 'GraphQL', 'NestJS', 'AWS', 'Azure'],
        widgets: ['Patient flow', 'Appointments', 'Clinical service status', 'Team board'],
    },
};
