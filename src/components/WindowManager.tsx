import { useCallback, useMemo, type Dispatch, type SetStateAction } from 'react';
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
  return (
    <section className="overflow-hidden rounded border border-[#28466f] bg-[#07111f] text-[#d8f7ff] shadow-[0_0_30px_rgba(20,184,166,.18)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#28466f] bg-[#0c1b30] px-4 py-3">
        <div>
          <h1 className="text-xl font-bold text-white">Auto Allocation Japan</h1>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[#ff6bb5]">flagship allocation console</p>
        </div>
        <span className="rounded border border-[#24f0c3]/50 bg-[#0b2a32] px-3 py-1 font-mono text-xs text-[#24f0c3]">
          SENIOR SOFTWARE ENGINEER
        </span>
      </div>
      <div className="grid gap-3 p-4 lg:grid-cols-[1fr_250px]">
        <div className="grid gap-3 sm:grid-cols-2">
          <AllocationMetric label="Reservation System" value="Live" status="Operational" />
          <AllocationMetric label="Microfrontends" value="MF" status="Module Federation" />
          <AllocationMetric label="APIs" value="NestJS" status="Connected" />
          <AllocationMetric label="Platform" value="Azure" status="Docker / K8s" />
        </div>
        <div className="rounded border border-[#28466f] bg-[#091725] p-3">
          <p className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-[#f7d154]">Responsibilities</p>
          {['Angular migration', 'Microfrontends', 'NestJS APIs', 'Reservation system', 'Data Science integration'].map(
            (item) => (
              <div key={item} className="mb-2 flex items-center gap-2 text-xs">
                <span className="status-dot h-2 w-2 rounded-full bg-[#24f0c3]" />
                <span>{item}</span>
              </div>
            ),
          )}
        </div>
        <div className="rounded border border-[#28466f] bg-[#091725] p-3 lg:col-span-2">
          <div className="grid grid-cols-2 border-b border-[#28466f] pb-2 font-mono text-xs uppercase text-[#79d8ff] sm:grid-cols-4">
            <span>Widget</span>
            <span>Status</span>
            <span>Widget</span>
            <span>Status</span>
          </div>
          {[
            ['Reservations', 'Queued', 'Allocations', 'Processing'],
            ['API Health', 'Stable', 'Data Sync', 'Connected'],
            ['Migration', 'Angular 17 → 19', 'Infra', 'Azure / Kubernetes'],
          ].map((row) => (
            <div key={row[0]} className="grid grid-cols-2 border-b border-[#28466f]/60 py-2 text-xs sm:grid-cols-4">
              {row.map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AllocationMetric({ label, value, status }: { label: string; value: string; status: string }) {
  return (
    <div className="rounded border border-[#28466f] bg-[#091725] p-3">
      <p className="font-mono text-xs uppercase tracking-[.18em] text-[#79d8ff]">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="flex items-center gap-2 font-mono text-xs text-[#24f0c3]">
          <span className="status-dot h-2 w-2 rounded-full bg-[#24f0c3]" />
          {status}
        </span>
      </div>
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
