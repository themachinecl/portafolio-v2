import {
  Award,
  BriefcaseBusiness,
  Cpu,
  FolderGit2,
  GitFork,
  Network,
  Mail,
  MonitorCog,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export type AppId =
  | 'cv'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'autoAllocation'
  | 'github'
  | 'linkedin'
  | 'contact';

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

export const profile = {
  name: 'Juan Paulo Rubilar Fontt',
  osName: 'Juan Paulo OS',
  role: 'Senior Frontend Developer',
  summary:
    'Senior frontend developer focused on enterprise-grade interfaces, microfrontends, and scalable TypeScript architecture across regulated and operational platforms.',
  email: 'paulofontt@gmail.com',
  location: 'Santiago, Chile',
};

export const apps: PortfolioApp[] = [
  {
    id: 'cv',
    title: 'My CV',
    icon: ScrollText,
    accent: '#f7d154',
    defaultSize: { width: 660, height: 520 },
    defaultPosition: { x: 132, y: 82 },
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderGit2,
    accent: '#62d4f7',
    defaultSize: { width: 720, height: 520 },
    defaultPosition: { x: 210, y: 118 },
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: BriefcaseBusiness,
    accent: '#8ddc71',
    defaultSize: { width: 700, height: 520 },
    defaultPosition: { x: 170, y: 102 },
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: Cpu,
    accent: '#ff9f6e',
    defaultSize: { width: 650, height: 500 },
    defaultPosition: { x: 250, y: 132 },
  },
  {
    id: 'autoAllocation',
    title: 'Auto Allocation Japan',
    icon: MonitorCog,
    accent: '#f3a4ff',
    defaultSize: { width: 720, height: 530 },
    defaultPosition: { x: 190, y: 98 },
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
    defaultSize: { width: 560, height: 420 },
    defaultPosition: { x: 330, y: 120 },
  },
];

export const skillGroups = [
  {
    label: 'Frontend',
    items: ['Angular', 'React', 'TypeScript', 'NgRx', 'Redux', 'Microfrontends'],
  },
  {
    label: 'Platforms',
    items: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    label: 'APIs',
    items: ['REST APIs', 'GraphQL', 'Design Systems', 'Performance'],
  },
];

export const projectCards = [
  {
    title: 'Auto Allocation Japan',
    meta: 'Featured project',
    description:
      'A logistics-focused allocation platform concept for coordinating vehicle assignment, operational visibility, and exception handling.',
    icon: Award,
  },
  {
    title: 'Enterprise Platform Shell',
    meta: 'Microfrontends',
    description:
      'Placeholder case study for a modular frontend platform with independently deployed product areas and shared UI contracts.',
    icon: Sparkles,
  },
  {
    title: 'Healthcare Operations Dashboard',
    meta: 'Data-heavy UX',
    description:
      'Placeholder dashboard for care operations, queue visibility, and role-based workflow controls.',
    icon: MonitorCog,
  },
];

export const experienceItems = [
  {
    title: 'Senior Frontend Developer',
    place: 'Enterprise and regulated platforms',
    period: 'Recent',
    details:
      'Built maintainable TypeScript frontends for banking, healthcare, logistics, and enterprise teams. Placeholder detail ready for real CV entries.',
  },
  {
    title: 'Frontend Architecture',
    place: 'Cross-team product environments',
    period: 'Ongoing',
    details:
      'Defined patterns for reusable components, state management, microfrontend integration, API consumption, and release quality.',
  },
  {
    title: 'Cloud-connected Web Apps',
    place: 'Azure, AWS, containers',
    period: 'Ongoing',
    details:
      'Worked with frontend delivery pipelines and cloud-hosted environments using Docker, Kubernetes, and modern CI/CD practices.',
  },
];
