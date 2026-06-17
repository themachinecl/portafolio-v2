import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { apps, desktopAppIds, profile, startMenuAppIds, type AppId } from '@/data/portfolio';
import BootScreen from './BootScreen';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import type { WindowState } from './Window';

export default function Desktop() {
  const [booting, setBooting] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<AppId | undefined>();
  const bootTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const openWindowIds = useMemo(() => windows.map((windowItem) => windowItem.id), [windows]);
  const desktopApps = useMemo(() => apps.filter((app) => desktopAppIds.includes(app.id)), []);
  const startMenuApps = useMemo(() => apps.filter((app) => startMenuAppIds.includes(app.id)), []);

  useEffect(() => {
    const finishBoot = () => {
      setBooting(false);
      gsap.fromTo(
        '.desktop-icon',
        { y: 10, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.32, ease: 'back.out(1.6)' },
      );
      gsap.fromTo('.taskbar-shell', { y: 44 }, { y: 0, duration: 0.34, ease: 'power2.out' });
      gsap.fromTo('.taskbar-hint', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, delay: 0.08 });
    };

    const timeline = gsap.timeline({ onComplete: finishBoot });
    bootTimelineRef.current = timeline;
    timeline
      .to('.boot-line', { opacity: 1, y: 0, stagger: 0.22, duration: 0.24, ease: 'power2.out' })
      .fromTo('.boot-ok', { scale: 0.7 }, { scale: 1, stagger: 0.22, duration: 0.2, ease: 'back.out(2)' }, '<')
      .to('.boot-welcome', { opacity: 1, y: -2, duration: 0.28, ease: 'power2.out' })
      .to('.boot-screen', { opacity: 0, duration: 0.42, delay: 0.25 });

    return () => {
      timeline.kill();
    };
  }, []);

  const openApp = useCallback((id: AppId) => {
    setStartOpen(false);
    const app = apps.find((item) => item.id === id);
    if (!app) return;

    setWindows((current) => {
      const nextZ = Math.max(50, ...current.map((windowItem) => windowItem.zIndex)) + 1;
      const existing = current.find((windowItem) => windowItem.id === id);
      if (existing) {
        return current.map((windowItem) =>
          windowItem.id === id ? { ...windowItem, minimized: false, zIndex: nextZ } : windowItem,
        );
      }

      const mobile = window.innerWidth < 720;
      const width = mobile ? window.innerWidth : app.defaultSize.width;
      const height = mobile ? window.innerHeight - 44 : app.defaultSize.height;
      const x = mobile ? 0 : Math.min(app.defaultPosition.x, window.innerWidth - width - 10);
      const y = mobile ? 0 : Math.min(app.defaultPosition.y, window.innerHeight - height - 54);

      return [
        ...current,
        {
          id,
          x: Math.max(8, x),
          y: Math.max(8, y),
          width,
          height,
          zIndex: nextZ,
          minimized: false,
        },
      ];
    });
    setActiveWindow(id);

    window.setTimeout(() => {
      gsap.fromTo(
        `[data-window-id="${id}"] .portfolio-window`,
        { opacity: 0, scale: 0.9, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: 'back.out(1.45)' },
      );
    }, 0);
  }, []);

  const focusWindow = useCallback((id: AppId) => {
    setActiveWindow(id);
    setWindows((current) => {
      const nextZ = Math.max(50, ...current.map((windowItem) => windowItem.zIndex)) + 1;
      return current.map((windowItem) =>
        windowItem.id === id ? { ...windowItem, minimized: false, zIndex: nextZ } : windowItem,
      );
    });
  }, []);

  const skipBoot = useCallback(() => {
    bootTimelineRef.current?.kill();
    gsap.to('.boot-screen', {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setBooting(false);
        gsap.fromTo('.desktop-icon', { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.035, duration: 0.22 });
        gsap.fromTo('.taskbar-shell', { y: 44 }, { y: 0, duration: 0.24, ease: 'power2.out' });
      },
    });
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#10214f] text-slate-950">
      <div className="classic-wallpaper absolute inset-0 z-[1]">
        <div className="classic-square classic-square-back" />
        <div className="classic-square classic-square-middle" />
        <div className="classic-square classic-square-front" />
        <div className="classic-bar classic-bar-top" />
        <div className="classic-bar classic-bar-left" />
        <div className="classic-logo" aria-hidden="true">
          <span className="classic-logo-panel classic-logo-panel-red" />
          <span className="classic-logo-panel classic-logo-panel-blue" />
          <span className="classic-logo-panel classic-logo-panel-green" />
          <span className="classic-logo-panel classic-logo-panel-yellow" />
        </div>
      </div>

      <section className="relative z-10 hidden h-[calc(100vh-44px)] p-4 sm:block" aria-label="Desktop icons">
        <div className="grid h-full grid-cols-[minmax(290px,360px)_1fr] gap-4 xl:grid-cols-[minmax(330px,420px)_1fr]">
          <div className="rounded border border-white/25 bg-slate-950/30 p-4 text-white shadow-panel backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-[#f7d154]">Home</p>
            <h1 className="mt-1 text-2xl font-bold">{profile.name}</h1>
            <div className="mt-2 space-y-1 text-sm font-semibold">
              {profile.roleLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-2 text-sm leading-6 text-white/90">{profile.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.quickStats.map((stat) => (
                <span key={stat} className="rounded border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide">
                  {stat}
                </span>
              ))}
            </div>
          </div>
          <div className="grid content-start gap-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {desktopApps.map((app) => (
              <DesktopIcon key={app.id} app={app} onOpen={openApp} dense />
            ))}
          </div>
        </div>
        <div className="taskbar-hint absolute bottom-5 left-5 max-w-[380px] rounded border border-white/25 bg-slate-950/30 px-3 py-2 text-xs font-semibold text-white shadow-panel backdrop-blur-sm">
          Juan Paulo OS - Enterprise Edition. Click icons to explore the system.
        </div>
      </section>

      <section className="relative z-10 h-[calc(100vh-44px)] overflow-auto p-4 pb-6 sm:hidden" aria-label="App launcher">
        <div className="mb-4 rounded border border-white/20 bg-slate-950/35 p-3 text-white shadow-panel backdrop-blur">
          <h1 className="text-xl font-bold">{profile.osName}</h1>
          <div className="mt-2 space-y-1 text-sm font-semibold">
            {profile.roleLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-2 text-sm">{profile.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.quickStats.map((stat) => (
              <span key={stat} className="rounded border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide">
                {stat}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          {desktopApps.map((app) => (
            <DesktopIcon key={app.id} app={app} onOpen={openApp} compact />
          ))}
        </div>
      </section>

      <WindowManager
        apps={apps}
        windows={windows}
        setWindows={setWindows}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
        onOpenApp={openApp}
      />

      <Taskbar
        apps={apps}
        menuApps={startMenuApps}
        openWindows={openWindowIds}
        activeWindow={activeWindow}
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((value) => !value)}
        onOpenApp={openApp}
        onFocusWindow={focusWindow}
      />

      <BootScreen visible={booting} onSkip={skipBoot} />
    </main>
  );
}
