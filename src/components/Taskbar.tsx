import { Bell, Cloud, Cpu, Power, Square, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AppId, PortfolioApp } from '@/data/portfolio';
import StartMenu from './StartMenu';

type TaskbarProps = {
  apps: PortfolioApp[];
  menuApps: PortfolioApp[];
  openWindows: AppId[];
  activeWindow?: AppId;
  startOpen: boolean;
  onToggleStart: () => void;
  onOpenApp: (id: AppId) => void;
  onFocusWindow: (id: AppId) => void;
};

export default function Taskbar({
  apps,
  menuApps,
  openWindows,
  activeWindow,
  startOpen,
  onToggleStart,
  onOpenApp,
  onFocusWindow,
}: TaskbarProps) {
  const [clock, setClock] = useState(() => formatClock());

  useEffect(() => {
    const timer = window.setInterval(() => setClock(formatClock()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="taskbar-shell fixed inset-x-0 bottom-0 z-[850] h-11 border-t border-[#86b6ff] bg-gradient-to-b from-[#2f74ee] via-[#1d48ad] to-[#102d78] text-white shadow-[0_-2px_12px_rgba(0,0,0,.28)]">
      <StartMenu apps={menuApps} open={startOpen} onOpenApp={onOpenApp} />
      <div className="flex h-full items-center gap-1 px-1">
        <button
          type="button"
          className="flex h-9 shrink-0 items-center gap-2 rounded-md border border-[#0b5d18] bg-gradient-to-b from-[#8fe27c] to-[#25791f] px-3 text-sm font-bold shadow-panel transition hover:brightness-110 active:translate-y-px"
          onClick={onToggleStart}
          aria-expanded={startOpen}
        >
          <Power size={16} />
          Start
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1">
          {openWindows.map((id) => {
            const app = apps.find((item) => item.id === id);
            if (!app) return null;
            return (
              <button
                key={id}
                type="button"
                className={[
                  'taskbar-app flex h-8 min-w-[138px] max-w-[190px] items-center gap-2 truncate rounded-sm border px-2 text-left text-xs font-semibold shadow-panel transition hover:translate-y-[-1px] hover:brightness-110',
                  activeWindow === id
                    ? 'border-white/80 bg-[#f5f0d8] text-slate-950'
                    : 'border-blue-200/30 bg-blue-950/30 text-white hover:bg-blue-800/50',
                ].join(' ')}
                onClick={() => onFocusWindow(id)}
              >
                <Square size={12} fill={activeWindow === id ? app.accent : 'transparent'} />
                <span className="truncate">{app.title}</span>
              </button>
            );
          })}
        </div>
        <div className="flex h-8 shrink-0 items-center gap-2 rounded-sm border border-blue-100/30 bg-blue-950/20 px-2 text-xs shadow-panel">
          <span className="hidden items-center gap-1 sm:flex">
            <Wifi size={13} />
            <Cloud size={13} />
            <Cpu size={13} />
            <Bell size={13} className="text-[#f7d154]" />
          </span>
          <span className="border-l border-white/20 pl-2 font-mono">{clock}</span>
        </div>
      </div>
    </div>
  );
}

function formatClock() {
  return new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}
