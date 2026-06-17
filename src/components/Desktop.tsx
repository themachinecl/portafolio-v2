import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { apps, profile, type AppId } from '@/data/portfolio';
import BootScreen from './BootScreen';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import ThreeBackground from './ThreeBackground';
import WindowManager from './WindowManager';
import type { WindowState } from './Window';

export default function Desktop() {
  const [booting, setBooting] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<AppId | undefined>();
  const zRef = useRef(50);

  const openWindowIds = useMemo(() => windows.map((windowItem) => windowItem.id), [windows]);

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .to('.boot-progress', { x: 190, duration: 0.9, ease: 'steps(5)' })
      .to('.boot-screen', { opacity: 0, duration: 0.42, delay: 0.15 })
      .call(() => setBooting(false))
      .fromTo(
        '.desktop-icon',
        { y: 10, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.055, duration: 0.32, ease: 'back.out(1.6)' },
      )
      .fromTo('.taskbar-hint', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 }, '<');

    return () => {
      timeline.kill();
    };
  }, []);

  const openApp = useCallback((id: AppId) => {
    setStartOpen(false);
    zRef.current += 1;
    const app = apps.find((item) => item.id === id);
    if (!app) return;

    setWindows((current) => {
      const existing = current.find((windowItem) => windowItem.id === id);
      if (existing) {
        return current.map((windowItem) =>
          windowItem.id === id ? { ...windowItem, minimized: false, zIndex: zRef.current } : windowItem,
        );
      }

      const mobile = window.innerWidth < 720;
      const width = mobile ? Math.max(320, window.innerWidth - 18) : app.defaultSize.width;
      const height = mobile ? Math.max(360, window.innerHeight - 74) : app.defaultSize.height;
      const x = mobile ? 9 : Math.min(app.defaultPosition.x, window.innerWidth - width - 10);
      const y = mobile ? 10 : Math.min(app.defaultPosition.y, window.innerHeight - height - 54);

      return [
        ...current,
        {
          id,
          x: Math.max(8, x),
          y: Math.max(8, y),
          width,
          height,
          zIndex: zRef.current,
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
    zRef.current += 1;
    setActiveWindow(id);
    setWindows((current) =>
      current.map((windowItem) =>
        windowItem.id === id ? { ...windowItem, minimized: false, zIndex: zRef.current } : windowItem,
      ),
    );
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#104b9b] text-slate-950">
      <ThreeBackground />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_22%_18%,rgba(129,216,245,.95),transparent_26%),radial-gradient(circle_at_72%_10%,rgba(255,247,200,.65),transparent_22%),linear-gradient(135deg,#184bb0_0%,#1793bb_43%,#6bc56b_76%,#2c7a32_100%)]" />
      <div className="pixel-grid absolute inset-0 z-[2] opacity-25" />
      <div className="absolute inset-x-0 bottom-11 z-[3] h-[22vh] bg-gradient-to-t from-[#247735] via-[#52a94a] to-transparent opacity-80" />

      <section className="relative z-10 hidden h-[calc(100vh-44px)] p-4 sm:block" aria-label="Desktop icons">
        <div className="grid w-[116px] grid-cols-1 gap-3">
          {apps.map((app) => (
            <DesktopIcon key={app.id} app={app} onOpen={openApp} />
          ))}
        </div>
        <div className="taskbar-hint absolute bottom-5 left-5 max-w-[380px] rounded border border-white/25 bg-slate-950/30 px-3 py-2 text-xs font-semibold text-white shadow-panel backdrop-blur-sm">
          Double-click icons to open portfolio windows. Drag title bars and resize from the lower-right corner.
        </div>
      </section>

      <section className="relative z-10 h-[calc(100vh-44px)] overflow-auto p-4 pb-6 sm:hidden" aria-label="App launcher">
        <div className="mb-4 rounded border border-white/20 bg-slate-950/35 p-3 text-white shadow-panel backdrop-blur">
          <h1 className="text-xl font-bold">{profile.osName}</h1>
          <p className="mt-1 text-sm">{profile.role}</p>
        </div>
        <div className="grid gap-2">
          {apps.map((app) => (
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
      />

      <Taskbar
        apps={apps}
        openWindows={openWindowIds}
        activeWindow={activeWindow}
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((value) => !value)}
        onOpenApp={openApp}
        onFocusWindow={focusWindow}
      />

      <BootScreen visible={booting} />
    </main>
  );
}
