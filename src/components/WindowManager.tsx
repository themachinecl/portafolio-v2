import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import gsap from 'gsap';
import type { AppId, PortfolioApp } from '@/data/portfolio';
import { FolderGit2 } from 'lucide-react';
import {
  educationEntries,
  experienceTimeline,
  languageEntries,
  profile,
  projectCards,
  projectDetails,
  skillBars,
  technicalSkillSections,
} from '@/data/portfolio';
import Window, { type WindowState } from './Window';

type WindowManagerProps = {
  apps: PortfolioApp[];
  windows: WindowState[];
  setWindows: Dispatch<SetStateAction<WindowState[]>>;
  activeWindow?: AppId;
  setActiveWindow: (id: AppId | undefined) => void;
  onOpenApp: (id: AppId) => void;
};

export default function WindowManager({
  apps,
  windows,
  setWindows,
  activeWindow,
  setActiveWindow,
  onOpenApp,
}: WindowManagerProps) {
  const appMap = useMemo(() => new Map(apps.map((app) => [app.id, app])), [apps]);

  const focusWindow = useCallback(
    (id: AppId) => {
      const nextZ = Math.max(50, ...windows.map((windowItem) => windowItem.zIndex)) + 1;
      setActiveWindow(id);
      setWindows((current) =>
        current.map((windowItem) =>
          windowItem.id === id ? { ...windowItem, zIndex: nextZ, minimized: false } : windowItem,
        ),
      );
    },
    [setActiveWindow, setWindows, windows],
  );

  const closeWindow = useCallback(
    (id: AppId) => {
      gsap.to(`[data-window-id="${id}"] .portfolio-window`, {
        scale: 0.86,
        opacity: 0,
        duration: 0.16,
        ease: 'power2.in',
      });
      window.setTimeout(() => {
        setWindows((current) => current.filter((windowItem) => windowItem.id !== id));
        if (activeWindow === id) setActiveWindow(undefined);
      }, 170);
    },
    [activeWindow, setActiveWindow, setWindows],
  );

  const minimizeWindow = useCallback(
    (id: AppId) => {
      setWindows((current) =>
        current.map((windowItem) => (windowItem.id === id ? { ...windowItem, minimized: true } : windowItem)),
      );
      if (activeWindow === id) setActiveWindow(undefined);
    },
    [activeWindow, setActiveWindow, setWindows],
  );

  const changeWindow = useCallback(
    (id: AppId, patch: Partial<WindowState>) => {
      setWindows((current) =>
        current.map((windowItem) => (windowItem.id === id ? { ...windowItem, ...patch } : windowItem)),
      );
    },
    [setWindows],
  );

  return (
    <>
      {windows.map((windowState) => {
        const app = appMap.get(windowState.id);
        if (!app) return null;
        return (
          <div key={windowState.id} data-window-id={windowState.id}>
            <Window
              state={windowState}
              title={app.title}
              accent={app.accent}
              active={activeWindow === app.id}
              onFocus={focusWindow}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onChange={changeWindow}
            >
              <WindowContent app={app} onOpenApp={onOpenApp} />
            </Window>
          </div>
        );
      })}
    </>
  );
}

function WindowContent({ app, onOpenApp }: { app: PortfolioApp; onOpenApp: (id: AppId) => void }) {
  switch (app.id) {
    case 'cv':
      return <CvContent />;
    case 'projects':
      return <ProjectsContent onOpenApp={onOpenApp} />;
    case 'experience':
      return <ExperienceContent />;
    case 'skills':
      return <SkillsContent />;
    case 'autoAllocation':
      return <AutoAllocationContent />;
    case 'education':
      return <EducationContent />;
    case 'languages':
      return <LanguagesContent />;
    case 'github':
    case 'linkedin':
      return <ExternalProfileContent app={app} />;
    case 'contact':
      return <ContactContent />;
    case 'recurringDecisions':
    case 'chileCompra':
    case 'itauInsurance':
    case 'bancoChileEnterprise':
    case 'clinicaAlemanaDigital':
      return <ProjectDetailContent app={app} />;
    case 'recycleBin':
      return <RecycleBinContent />;
    case 'aboutSystem':
      return <AboutSystemContent />;
    default:
      return null;
  }
}

function CvContent() {
  return (
    <section className="space-y-5">
      <div className="border-b border-slate-300 pb-3">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#143c9f]">PROFILE</p>
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="mt-1 text-sm font-semibold text-[#143c9f]">{profile.roleLines[0]}</p>
        <p className="mt-2 max-w-3xl text-sm leading-6">{profile.summary}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {technicalSkillSections.map((section) => (
          <InfoPanel key={section.title} title={section.title.toUpperCase()} items={section.items} />
        ))}
      </div>
    </section>
  );
}

function ProjectsContent({ onOpenApp }: { onOpenApp: (id: AppId) => void }) {
  return (
    <section className="space-y-3">
      {projectCards.map((project) => (
        <button
          key={project.id}
          type="button"
          className="flex items-start gap-3 rounded border border-[#b9b29e] bg-white/80 p-3 text-left shadow-panel transition hover:border-[#2459d8] hover:bg-[#d6e5ff]"
          onClick={() => onOpenApp(project.id)}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded border bg-[#d6e5ff]">
            <FolderGit2 size={21} />
          </span>
          <div className="min-w-0">
            <h2 className="font-bold">{project.title}</h2>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#143c9f]">{project.category}</p>
            <p className="mt-1 text-sm leading-5">{project.summary}</p>
          </div>
        </button>
      ))}
    </section>
  );
}

function ExperienceContent() {
  return (
    <section className="space-y-4">
      {experienceTimeline.map((item, index) => (
        <article key={item.company} className="relative rounded border border-[#b9b29e] bg-white/80 p-4 shadow-panel">
          <div className="absolute left-4 top-0 h-full w-px bg-[#9db6e8]" aria-hidden="true" />
          <div className="relative grid gap-3 pl-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#143c9f]">{item.company}</p>
                <h2 className="text-lg font-bold">{item.role}</h2>
              </div>
              <span className="rounded bg-[#143c9f] px-2 py-1 text-xs font-bold text-white">{item.period}</span>
            </div>
            <div className="grid gap-2">
              {item.highlights.map((highlight) => (
                <p key={highlight} className="text-sm leading-6">
                  • {highlight}
                </p>
              ))}
            </div>
          </div>
          {index < experienceTimeline.length - 1 ? <div className="mt-4 border-b border-dashed border-[#c7c0ae]" /> : null}
        </article>
      ))}
    </section>
  );
}

function SkillsContent() {
  return (
    <section className="space-y-3">
      {skillBars.map((skill) => (
        <div key={skill.label} className="rounded border border-[#b9b29e] bg-white/80 p-3 shadow-panel">
          <div className="mb-2 flex items-center justify-between text-sm font-bold">
            <span>{skill.label}</span>
            <span>{skill.value}%</span>
          </div>
          <div className="h-4 rounded border border-[#7483a7] bg-[#dbe5f8] p-0.5 shadow-inner">
            <div className="h-full rounded-[2px] bg-gradient-to-r from-[#1b55d9] via-[#4f8eff] to-[#9ad1ff]" style={{ width: `${skill.value}%` }} />
          </div>
        </div>
      ))}
    </section>
  );
}

function AutoAllocationContent() {
  const tabs = ['Overview', 'Business Flow', 'Reservation System', 'Technical Challenges', 'Screenshots'] as const;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Overview');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' },
    );
  }, [activeTab]);

  return (
    <section className="auto-allocation-app overflow-hidden rounded border border-[#9aa8bd] bg-[#f4f6f9] text-slate-900 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c7cfdb] bg-white px-4 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f06f1a]">Agrosuper · Portfolio-safe showcase</p>
          <h1 className="text-2xl font-bold text-[#1f2933]">Auto Allocation Japan</h1>
          <p className="text-sm text-slate-600">Senior Software Engineer · Food Distribution / Logistics · 2025 - Present</p>
        </div>
        <span className="rounded border border-[#0a4c9a]/20 bg-[#e8f1ff] px-3 py-1 text-xs font-bold text-[#0a4c9a]">
          Angular · NestJS · Azure · Module Federation
        </span>
      </div>
      <div className="flex gap-1 overflow-x-auto border-b border-[#c7cfdb] bg-[#e7ebf1] px-2 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={[
              'shrink-0 rounded-t border border-b-0 px-3 py-2 text-xs font-bold transition',
              activeTab === tab
                ? 'border-[#9aa8bd] bg-white text-[#0a4c9a]'
                : 'border-transparent bg-[#d7dee8] text-slate-600 hover:bg-white/70',
            ].join(' ')}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div ref={contentRef} className="min-h-[430px] p-4">
        {activeTab === 'Overview' ? <AutoOverview /> : null}
        {activeTab === 'Business Flow' ? <BusinessFlow /> : null}
        {activeTab === 'Reservation System' ? <ReservationSystem /> : null}
        {activeTab === 'Technical Challenges' ? <TechnicalChallenges /> : null}
        {activeTab === 'Screenshots' ? <AutoGallery /> : null}
      </div>
    </section>
  );
}

const autoAllocationScreenshots = [
  {
    src: '/image/1.png',
    title: 'Login Experience',
    shortTitle: 'Login',
    context: 'Secure access point for the enterprise recurring decisions and logistics platform.',
    contribution:
      'Developed Angular features, integrated APIs, collaborated with Data Science teams and implemented reservation workflows.',
    technologies: ['Angular', 'NestJS', 'SQL Server', 'Azure'],
  },
  {
    src: '/image/2.png',
    title: 'Recurring Decisions Dashboard',
    shortTitle: 'Dashboard',
    context: 'Enterprise dashboard used to manage recurring decisions and operational modules.',
    contribution:
      'Developed Angular features, integrated APIs, collaborated with Data Science teams and implemented reservation workflows.',
    technologies: ['Angular', 'TypeScript', 'NestJS'],
  },
  {
    src: '/image/3.png',
    title: 'Auto Allocation Japan Orders',
    shortTitle: 'Orders',
    context: 'Enterprise logistics platform used to manage allocation workflows and reservations.',
    contribution:
      'Developed Angular features, integrated APIs, collaborated with Data Science teams and implemented reservation workflows.',
    technologies: ['Angular', 'NestJS', 'SQL Server', 'Azure', 'Module Federation'],
  },
  {
    src: '/image/4.png',
    title: 'Allocation Details',
    shortTitle: 'Details',
    context: 'Detailed allocation workspace for purchase orders, stock validation, lots and assignment review.',
    contribution:
      'Developed Angular features, integrated APIs, collaborated with Data Science teams and implemented reservation workflows.',
    technologies: ['Angular 19', 'Module Federation', 'Docker', 'Kubernetes'],
  },
  {
    src: '/image/5.png',
    title: 'Reservation System',
    shortTitle: 'Reservations',
    context: 'Reservation workflow for clients, fridges, lots, sub-lots, SKUs and generated reservations.',
    contribution:
      'Developed Angular features, integrated APIs, collaborated with Data Science teams and implemented reservation workflows.',
    technologies: ['Angular', 'TypeScript', 'NestJS', 'SQL Server', 'Azure'],
  },
];

function AutoOverview() {
  const defaultIndex = autoAllocationScreenshots.findIndex((screenshot) => screenshot.src === '/image/3.png');
  const [activeIndex, setActiveIndex] = useState(defaultIndex >= 0 ? defaultIndex : 0);
  const activeScreenshot = autoAllocationScreenshots[activeIndex];
  const metrics = [
    { label: 'Purchase Orders', value: 312, status: 'Synced', tone: '#0a4c9a' },
    { label: 'Reservations', value: 148, status: 'Live', tone: '#2f8a27' },
    { label: 'Clients', value: 42, status: 'Active', tone: '#f06f1a' },
    { label: 'Lots', value: 86, status: 'Validated', tone: '#0a4c9a' },
    { label: 'Allocation Requests', value: 29, status: 'Queued', tone: '#f06f1a' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,.8fr)]">
        <div className="rounded border border-[#9aa8bd] bg-[#d8d5c8] p-2 shadow-panel">
          <div className="mb-2 flex items-center justify-between bg-gradient-to-r from-[#123799] to-[#4f8eff] px-2 py-1 text-xs font-bold text-white">
            <span>AutoAllocationJapan.app - {activeScreenshot.title}</span>
            <span className="rounded bg-[#d8d5c8] px-2 py-0.5 text-slate-900">Real screenshot</span>
          </div>
          <div className="overflow-auto rounded border border-[#9aa8bd] bg-white p-2">
            <img
              src={activeScreenshot.src}
              alt={activeScreenshot.title}
              className="max-h-[390px] min-h-[260px] w-full object-contain"
            />
          </div>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {autoAllocationScreenshots.map((screenshot, screenshotIndex) => (
              <button
                key={screenshot.title}
                type="button"
                className={[
                  'overflow-hidden rounded border bg-white p-1 text-left transition hover:brightness-105',
                  screenshotIndex === activeIndex ? 'border-[#0a4c9a] ring-2 ring-[#0a4c9a]/25' : 'border-[#b9b29e]',
                ].join(' ')}
                onClick={() => setActiveIndex(screenshotIndex)}
              >
                <img src={screenshot.src} alt={`${screenshot.title} thumbnail`} className="h-12 w-full object-cover" />
                <span className="mt-1 block truncate text-[10px] font-bold text-slate-700">{screenshot.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>
        <aside className="rounded border border-[#c7cfdb] bg-white p-4 shadow-panel">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f06f1a]">Project Summary</p>
          <h2 className="mt-2 text-xl font-bold">Auto Allocation Japan</h2>
          <p className="mt-2 text-sm leading-6">
            Production-grade enterprise logistics platform for allocation workflows, reservation management, lots,
            sub-lots, purchase orders and final assignment operations.
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#0a4c9a]">My Role</p>
          <p className="text-sm font-semibold">Senior Software Engineer</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#0a4c9a]">Tech Stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Angular', 'TypeScript', 'NestJS', 'SQL Server', 'Azure', 'Docker', 'Kubernetes', 'Module Federation'].map(
              (tech) => (
                <span key={tech} className="rounded bg-[#e8f1ff] px-2 py-1 text-xs font-bold text-[#0a4c9a]">
                  {tech}
                </span>
              ),
            )}
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#0a4c9a]">Main Impact</p>
          <p className="text-sm leading-6">
            Delivered Angular features, backend integrations, reservation workflows, Data Science collaboration and
            microfrontend modernization for a real logistics platform.
          </p>
        </aside>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <CounterCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded border border-[#c7cfdb] bg-white p-4 shadow-panel">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Enterprise Allocation Control</h2>
            <span className="rounded bg-[#e8f1ff] px-2 py-1 text-xs font-bold text-[#0a4c9a]">System Healthy</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {['Angular 19 frontend', 'NestJS service layer', 'SQL Server logistics data'].map((item) => (
              <div key={item} className="rounded border border-[#d8dee8] bg-[#f8fafc] p-3 text-sm font-semibold">
                <span className="status-dot mr-2 inline-block h-2 w-2 rounded-full bg-[#2f8a27]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <ProjectImpact />
      </div>
    </div>
  );
}

function CounterCard({ label, value, status, tone }: { label: string; value: number; status: string; tone: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = { value: 0 };
    const tween = gsap.to(target, {
      value,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => setCount(Math.round(target.value)),
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <div className="rounded border border-[#c7cfdb] bg-white p-3 shadow-panel">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-3xl font-bold" style={{ color: tone }}>
          {count}
        </span>
        <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span className="status-dot h-2 w-2 rounded-full" style={{ backgroundColor: tone }} />
          {status}
        </span>
      </div>
    </div>
  );
}

function ProjectImpact() {
  return (
    <div className="rounded border border-[#c7cfdb] bg-white p-4 shadow-panel">
      <h2 className="mb-3 text-lg font-bold">Project Impact</h2>
      {[
        '✓ Angular 17 → 19 migration',
        '✓ Microfrontends architecture',
        '✓ Reservation workflow implementation',
        '✓ Backend API integrations',
        '✓ Data Science collaboration',
        '✓ Enterprise logistics platform',
      ].map((item) => (
        <p key={item} className="mb-2 text-sm font-semibold text-slate-700">
          {item}
        </p>
      ))}
    </div>
  );
}

function BusinessFlow() {
  const flowRef = useRef<HTMLDivElement>(null);
  const steps = [
    ['Purchase Order', 'Commercial demand enters the allocation pipeline.'],
    ['Stock Validation', 'Available inventory is checked against business rules.'],
    ['Lot Selection', 'Lots and sub-lots are selected for reservation candidates.'],
    ['Allocation', 'Allocation logic maps demand to validated product availability.'],
    ['Reservation', 'Product is reserved for downstream commercial operation.'],
    ['Final Assignment', 'Confirmed assignment is ready for operational follow-up.'],
  ];

  useEffect(() => {
    if (!flowRef.current) return;
    gsap.fromTo(
      flowRef.current.querySelectorAll('.flow-step'),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.28, ease: 'power2.out' },
    );
  }, []);

  return (
    <div ref={flowRef} className="grid gap-3 md:grid-cols-6">
      {steps.map(([title, tooltip], index) => (
        <div key={title} className="flow-step group relative opacity-0">
          <div className="rounded border border-[#c7cfdb] bg-white p-4 text-center shadow-panel">
            <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0a4c9a] text-sm font-bold text-white">
              {index + 1}
            </div>
            <h2 className="text-sm font-bold">{title}</h2>
            {index < steps.length - 1 ? <p className="mt-3 hidden text-xl text-[#f06f1a] md:block">↓</p> : null}
          </div>
          <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-56 -translate-x-1/2 rounded bg-slate-950 px-3 py-2 text-xs leading-5 text-white shadow-lg group-hover:block">
            {tooltip}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReservationSystem() {
  const rows = [
    ['Pacific Foods Co.', 'P118', '40563640', 'CO208125-OO', '1022863', '4', 'RESERVED'],
    ['Sakura Retail Group', 'P118', '40563640', 'CO208126-OO', '1022863', '50', 'RESERVED'],
    ['North Bay Imports', 'P104', '40578145', 'CO211906-OO', '1022739', '112', 'USED'],
    ['Tokyo Market Hub', 'P118', '40573616', 'CO211907-OO', '1022924', '11', 'CANCELLED'],
    ['Kobe Distribution', 'P104', '40578145', 'CO211911-OO', '1022863', '208', 'RESERVED'],
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded border border-[#c7cfdb] bg-white p-4 shadow-panel sm:grid-cols-3">
        {['Client', 'Fridge', 'Lot'].map((filter) => (
          <label key={filter} className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {filter}
            <select className="mt-1 w-full rounded border border-[#a9b3c2] bg-white px-3 py-2 text-sm font-normal text-slate-700">
              <option>All</option>
              <option>Filtered</option>
            </select>
          </label>
        ))}
        <label className="text-xs font-bold uppercase tracking-wide text-slate-500 sm:col-span-3">
          Search
          <input className="mt-1 w-full rounded border border-[#a9b3c2] px-3 py-2 text-sm font-normal" placeholder="Search safe sample reservations..." />
        </label>
      </div>
      <div className="overflow-auto rounded border border-[#c7cfdb] bg-white shadow-panel">
        <table className="min-w-[820px] w-full text-left text-sm">
          <thead className="bg-[#edf1f6] text-xs uppercase tracking-wide text-[#5f7187]">
            <tr>
              {['Client', 'Fridge', 'Lot', 'Sub-Lot', 'SKU', 'Boxes', 'Status'].map((header) => (
                <th key={header} className="px-3 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row[0]}-${row[3]}`} className="border-t border-[#e1e6ee]">
                {row.map((cell, index) => (
                  <td key={cell} className="px-3 py-3">
                    {index === 6 ? <StatusBadge status={cell} /> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    RESERVED: 'bg-[#e4f5e7] text-[#206b2c]',
    USED: 'bg-[#e8f1ff] text-[#0a4c9a]',
    CANCELLED: 'bg-[#fff0e8] text-[#b54708]',
  };

  return <span className={`rounded-full px-2 py-1 text-xs font-bold ${styles[status]}`}>{status}</span>;
}

function TechnicalChallenges() {
  const challenges = [
    ['Angular 17 → Angular 19 Migration', 'Modernized application architecture and dependencies.'],
    ['Microfrontends', 'Implemented Module Federation architecture.'],
    ['Reservation System Redesign', 'Reservation management by lot and sub-lot.'],
    ['Data Science Integration', 'Integrated allocation workflows with Data Science outputs.'],
    ['Enterprise Scalability', 'Optimized frontend and backend flows for large datasets.'],
  ];

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {challenges.map(([challenge, solution], index) => (
        <article key={challenge} className="rounded border border-[#c7cfdb] bg-white p-4 shadow-panel">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f06f1a]">Challenge {index + 1}</p>
          <h2 className="mt-2 text-lg font-bold">{challenge}</h2>
          <p className="mt-3 text-sm leading-6">
            <strong>Solution:</strong> {solution}
          </p>
        </article>
      ))}
    </div>
  );
}

function AutoGallery() {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const current = autoAllocationScreenshots[index];

  const next = () => setIndex((value) => (value + 1) % autoAllocationScreenshots.length);
  const prev = () => setIndex((value) => (value - 1 + autoAllocationScreenshots.length) % autoAllocationScreenshots.length);
  const image = (
    <img
      src={current.src}
      alt={current.title}
      className={[
        'screenshot-photo max-h-[420px] w-full rounded border border-[#9aa8bd] bg-white object-contain',
        zoomed ? 'screenshot-photo-zoomed' : '',
      ].join(' ')}
    />
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_290px]">
      <div className="rounded border border-[#9aa8bd] bg-[#d8d5c8] p-2 shadow-panel">
        <div className="mb-2 flex items-center justify-between bg-gradient-to-r from-[#123799] to-[#4f8eff] px-2 py-1 text-xs font-bold text-white">
          <span>Image Viewer - Original Screenshots</span>
          <div className="flex gap-1">
            <button type="button" className="rounded bg-[#d8d5c8] px-2 py-0.5 text-slate-900" onClick={prev}>
              Previous
            </button>
            <button type="button" className="rounded bg-[#d8d5c8] px-2 py-0.5 text-slate-900" onClick={next}>
              Next
            </button>
            <button type="button" className="rounded bg-[#d8d5c8] px-2 py-0.5 text-slate-900" onClick={() => setZoomed((value) => !value)}>
              Zoom
            </button>
            <button type="button" className="rounded bg-[#d8d5c8] px-2 py-0.5 text-slate-900" onClick={() => setFullscreen(true)}>
              Fullscreen
            </button>
          </div>
        </div>
        <div className="flex min-h-[300px] items-center justify-center overflow-auto rounded border border-[#9aa8bd] bg-white p-2">
          {image}
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {autoAllocationScreenshots.map((shot, shotIndex) => (
            <button
              key={shot.title}
              type="button"
              className={[
                'h-14 w-24 shrink-0 rounded border text-[10px] font-bold',
                shotIndex === index ? 'border-[#0a4c9a] bg-[#e8f1ff] text-[#0a4c9a]' : 'border-[#b9b29e] bg-white text-slate-600',
              ].join(' ')}
              onClick={() => setIndex(shotIndex)}
            >
              <img src={shot.src} alt={`${shot.title} thumbnail`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <aside className="rounded border border-[#c7cfdb] bg-white p-4 shadow-panel">
        <h2 className="text-lg font-bold">{current.title}</h2>
        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#0a4c9a]">Business Context</p>
        <p className="text-sm leading-6">{current.context}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#0a4c9a]">My Contribution</p>
        <p className="text-sm leading-6">{current.contribution}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#0a4c9a]">Technologies Used</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {current.technologies.map((tech) => (
            <span key={tech} className="rounded bg-[#fff0e8] px-2 py-1 text-xs font-bold text-[#b54708]">
              {tech}
            </span>
          ))}
        </div>
      </aside>
      {fullscreen ? (
        <div className="fixed inset-0 z-[1200] flex flex-col bg-black/95 p-3 text-white">
          <div className="mb-3 flex items-center justify-between gap-3">
            <strong>{current.title}</strong>
            <div className="flex gap-2">
              <button type="button" className="rounded bg-white px-3 py-1 text-xs font-bold text-slate-950" onClick={prev}>
                Previous
              </button>
              <button type="button" className="rounded bg-white px-3 py-1 text-xs font-bold text-slate-950" onClick={next}>
                Next
              </button>
              <button type="button" className="rounded bg-white px-3 py-1 text-xs font-bold text-slate-950" onClick={() => setFullscreen(false)}>
                Close
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <img src={current.src} alt={current.title} className="mx-auto h-full max-h-none w-full object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProjectDetailContent({ app }: { app: PortfolioApp }) {
  const detail = projectDetails[app.id as keyof typeof projectDetails];

  return (
    <section className="space-y-4">
      <div className="border-b border-slate-300 pb-3">
        <h1 className="text-2xl font-bold">{app.title}</h1>
        <p className="text-sm font-semibold text-[#143c9f]">{detail.role}</p>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-600">{detail.period}</p>
      </div>
      <p className="rounded border border-[#b9b29e] bg-white/75 p-3 text-sm leading-6 shadow-panel">{detail.summary}</p>
      {detail.responsibilities?.length ? <InfoPanel title="RESPONSIBILITIES" items={detail.responsibilities} /> : null}
      {detail.technologies?.length ? <InfoPanel title="TECHNOLOGIES" items={detail.technologies} /> : null}
      {detail.widgets?.length ? <InfoPanel title="DASHBOARD WIDGETS" items={detail.widgets} /> : null}
    </section>
  );
}

function RecycleBinContent() {
  return (
    <section className="space-y-3 text-sm leading-6">
      <h1 className="text-2xl font-bold">Recycle Bin</h1>
      <div className="rounded border border-[#b9b29e] bg-white/75 p-3 shadow-panel">No deleted items.</div>
    </section>
  );
}

function AboutSystemContent() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">Juan Paulo OS</h1>
      <p className="font-mono text-sm uppercase tracking-[.2em] text-[#143c9f]">Enterprise Engineer Edition</p>
      <div className="mx-auto max-w-sm rounded border border-[#b9b29e] bg-white/75 p-4 text-left shadow-panel">
        <p className="mb-2 font-bold">{profile.name}</p>
        <p className="text-sm leading-6">{profile.summary}</p>
        <div className="mt-3 border-t border-slate-300 pt-3 text-sm">
          <p>{profile.location}</p>
          <p>{profile.email}</p>
          <p>{profile.roleLines.join(' • ')}</p>
        </div>
      </div>
    </section>
  );
}

function EducationContent() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Education</h1>
      {educationEntries.map((entry) => (
        <article key={`${entry.degree}-${entry.field}`} className="rounded border border-[#b9b29e] bg-white/80 p-3 shadow-panel">
          <p className="text-xs font-bold uppercase tracking-wide text-[#143c9f]">{entry.degree}</p>
          <h2 className="mt-1 text-lg font-bold">{entry.field}</h2>
          <p className="text-sm leading-6">{entry.institution}</p>
        </article>
      ))}
    </section>
  );
}

function LanguagesContent() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Languages</h1>
      {languageEntries.map((entry) => (
        <article key={entry.language} className="rounded border border-[#b9b29e] bg-white/80 p-3 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">{entry.language}</h2>
            <span className="rounded bg-[#143c9f] px-2 py-1 text-xs font-bold text-white">{entry.level}</span>
          </div>
        </article>
      ))}
    </section>
  );
}

function ExternalProfileContent({ app }: { app: PortfolioApp }) {
  const isLinkedIn = app.id === 'linkedin';
  const urlLabel = isLinkedIn ? 'LinkedIn URL' : 'GitHub URL';
  const helperText = isLinkedIn
    ? 'View my profile and connect on LinkedIn.'
    : 'Visit my GitHub profile to review repositories and code samples.';
  const url = isLinkedIn ? profile.linkedinUrl : profile.githubUrl;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{app.title}</h1>
      <p className="text-sm leading-6">{helperText}</p>
      <div className="rounded border border-[#b9b29e] bg-white/75 p-3 text-sm shadow-panel">
        <p className="font-bold">{urlLabel}</p>
        <a href={url} target="_blank" rel="noreferrer" className="break-all text-[#143c9f] underline">
          {url}
        </a>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-sm border border-[#0b2e87] bg-[#2459d8] px-3 py-2 text-sm font-bold text-white shadow-panel"
      >
        Open profile
      </a>
    </section>
  );
}

function ContactContent() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Contact</h1>
      <div className="rounded border border-[#b9b29e] bg-white/75 p-3 text-sm shadow-panel">
        <p className="font-bold">{profile.name}</p>
        <p>{profile.location}</p>
        <p>
          <a href={`mailto:${profile.email}`} className="text-[#143c9f] underline">
            {profile.email}
          </a>
        </p>
        <p>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-[#143c9f] underline">
            {profile.githubUrl}
          </a>
        </p>
        <p>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-[#143c9f] underline">
            {profile.linkedinUrl}
          </a>
        </p>
      </div>
      <p className="text-sm leading-6">You can reach me by email or open the linked GitHub and LinkedIn profiles above.</p>
    </section>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded border border-[#b9b29e] bg-white/75 p-3 shadow-panel">
      <h2 className="mb-2 text-sm font-bold uppercase tracking-wide">{title}</h2>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
