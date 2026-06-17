import { useCallback, useMemo, useRef, type Dispatch, type SetStateAction } from 'react';
import gsap from 'gsap';
import type { AppId, PortfolioApp } from '@/data/portfolio';
import { experienceItems, profile, projectCards, skillGroups } from '@/data/portfolio';
import Window, { type WindowState } from './Window';

type WindowManagerProps = {
  apps: PortfolioApp[];
  windows: WindowState[];
  setWindows: Dispatch<SetStateAction<WindowState[]>>;
  activeWindow?: AppId;
  setActiveWindow: (id: AppId | undefined) => void;
};

export default function WindowManager({
  apps,
  windows,
  setWindows,
  activeWindow,
  setActiveWindow,
}: WindowManagerProps) {
  const zRef = useRef(30 + windows.length);

  const appMap = useMemo(() => new Map(apps.map((app) => [app.id, app])), [apps]);

  const focusWindow = useCallback(
    (id: AppId) => {
      zRef.current += 1;
      setActiveWindow(id);
      setWindows((current) =>
        current.map((windowItem) =>
          windowItem.id === id ? { ...windowItem, zIndex: zRef.current, minimized: false } : windowItem,
        ),
      );
    },
    [setActiveWindow, setWindows],
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
              <WindowContent app={app} />
            </Window>
          </div>
        );
      })}
    </>
  );
}

function WindowContent({ app }: { app: PortfolioApp }) {
  switch (app.id) {
    case 'cv':
      return <CvContent />;
    case 'projects':
      return <ProjectsContent />;
    case 'experience':
      return <ExperienceContent />;
    case 'skills':
      return <SkillsContent />;
    case 'autoAllocation':
      return <AutoAllocationContent />;
    case 'github':
    case 'linkedin':
      return <ExternalProfileContent app={app} />;
    case 'contact':
      return <ContactContent />;
    default:
      return null;
  }
}

function CvContent() {
  return (
    <section className="space-y-4">
      <div className="border-b border-slate-300 pb-3">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-sm font-semibold text-[#143c9f]">{profile.role}</p>
        <p className="mt-2 max-w-2xl text-sm leading-6">{profile.summary}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <InfoPanel title="Core Focus" items={['Frontend architecture', 'Microfrontend delivery', 'Enterprise UI systems']} />
        <InfoPanel title="Industries" items={['Banking', 'Healthcare', 'Logistics', 'Enterprise platforms']} />
      </div>
      <div className="rounded border border-[#b9b29e] bg-white/70 p-3 shadow-panel">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide">CV Placeholder</h2>
        <p className="text-sm leading-6">
          Replace this panel with downloadable CV details, certifications, education, languages, and selected
          achievements. The layout is intentionally structured like a document viewer inside the OS.
        </p>
      </div>
    </section>
  );
}

function ProjectsContent() {
  return (
    <section className="grid gap-3">
      {projectCards.map((project) => {
        const Icon = project.icon;
        return (
          <article key={project.title} className="rounded border border-[#b9b29e] bg-white/75 p-3 shadow-panel">
            <div className="mb-2 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border bg-[#d6e5ff]">
                <Icon size={21} />
              </span>
              <div>
                <h2 className="font-bold">{project.title}</h2>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#143c9f]">{project.meta}</p>
              </div>
            </div>
            <p className="text-sm leading-6">{project.description}</p>
          </article>
        );
      })}
    </section>
  );
}

function ExperienceContent() {
  return (
    <section className="space-y-3">
      {experienceItems.map((item) => (
        <article key={item.title} className="grid gap-2 rounded border border-[#b9b29e] bg-white/75 p-3 shadow-panel">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-bold">{item.title}</h2>
            <span className="rounded bg-[#143c9f] px-2 py-1 text-xs font-bold text-white">{item.period}</span>
          </div>
          <p className="text-sm font-semibold text-[#2f6f28]">{item.place}</p>
          <p className="text-sm leading-6">{item.details}</p>
        </article>
      ))}
    </section>
  );
}

function SkillsContent() {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {skillGroups.map((group) => (
        <article key={group.label} className="rounded border border-[#b9b29e] bg-white/75 p-3 shadow-panel">
          <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-wide">
            {group.label}
          </h2>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <span key={skill} className="rounded-sm border border-[#8a846f] bg-[#f8f3d6] px-2 py-1 text-xs font-bold">
                {skill}
              </span>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function AutoAllocationContent() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Auto Allocation Japan</h1>
        <p className="text-sm font-semibold text-[#143c9f]">Featured project placeholder</p>
      </div>
      <p className="text-sm leading-6">
        A polished case-study area for the featured project. Replace the placeholder copy with product goals, stack,
        architecture notes, screenshots, metrics, and your specific contribution.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <InfoPanel title="Domain" items={['Logistics', 'Allocation', 'Operations']} />
        <InfoPanel title="Frontend" items={['TypeScript', 'React or Angular', 'State management']} />
        <InfoPanel title="Impact" items={['Workflow clarity', 'Exception handling', 'Visibility']} />
      </div>
    </section>
  );
}

function ExternalProfileContent({ app }: { app: PortfolioApp }) {
  const urlLabel = app.id === 'linkedin' ? 'LinkedIn URL' : 'GitHub URL';
  const helperText =
    app.id === 'linkedin'
      ? 'View the latest version of my profile and connect with me on LinkedIn.'
      : 'Visit my GitHub profile to review repositories, code samples, and open-source work.';

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{app.title}</h1>
      <p className="text-sm leading-6">{helperText}</p>
      <div className="rounded border border-[#b9b29e] bg-white/75 p-3 text-sm shadow-panel">
        <p className="font-bold">{urlLabel}</p>
        <a href={app.externalUrl} target="_blank" rel="noreferrer" className="break-all text-[#143c9f] underline">
          {app.externalUrl}
        </a>
      </div>
      <a
        href={app.externalUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-sm border border-[#0b2e87] bg-[#2459d8] px-3 py-2 text-sm font-bold text-white shadow-panel"
      >
        Open {app.title}
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
          <a href="https://github.com/themachinecl" target="_blank" rel="noreferrer" className="text-[#143c9f] underline">
            https://github.com/themachinecl
          </a>
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/juanpaulorf/"
            target="_blank"
            rel="noreferrer"
            className="text-[#143c9f] underline"
          >
            https://www.linkedin.com/in/juanpaulorf/
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
