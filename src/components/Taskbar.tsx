import { Power, Square } from 'lucide-react';
import type { AppId, PortfolioApp } from '@/data/portfolio';
import StartMenu from './StartMenu';

type TaskbarProps = {
  apps: PortfolioApp[];
  openWindows: AppId[];
  activeWindow?: AppId;
  startOpen: boolean;
  onToggleStart: () => void;
  onOpenApp: (id: AppId) => void;
  onFocusWindow: (id: AppId) => void;
};

export default function Taskbar({
  apps,
  openWindows,
  activeWindow,
  startOpen,
  onToggleStart,
  onOpenApp,
  onFocusWindow,
}: TaskbarProps) {
  const clock = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  return (
    <div className="fixed inset-x-0 bottom-0 z-[850] h-11 border-t border-[#5f8cff] bg-gradient-to-b from-[#316bea] via-[#2044ad] to-[#16368d] text-white shadow-[0_-2px_12px_rgba(0,0,0,.28)]">
      <StartMenu apps={apps} open={startOpen} onOpenApp={onOpenApp} />
      <div className="flex h-full items-center gap-1 px-1">
        <button
          type="button"
          className="flex h-9 shrink-0 items-center gap-2 rounded-md border border-[#0b5d18] bg-gradient-to-b from-[#73cf62] to-[#25791f] px-3 text-sm font-bold shadow-panel"
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
                  'flex h-8 min-w-[138px] max-w-[190px] items-center gap-2 truncate rounded-sm border px-2 text-left text-xs font-semibold shadow-panel',
                  activeWindow === id
                    ? 'border-white/70 bg-[#f5f0d8] text-slate-950'
                    : 'border-blue-200/30 bg-blue-950/30 text-white',
                ].join(' ')}
                onClick={() => onFocusWindow(id)}
              >
                <Square size={12} fill={activeWindow === id ? app.accent : 'transparent'} />
                <span className="truncate">{app.title}</span>
              </button>
            );
          })}
        </div>
        <div className="hidden h-8 items-center rounded-sm border border-blue-100/30 bg-blue-950/20 px-3 text-xs shadow-panel sm:flex">
          {clock}
        </div>
      </div>
    </div>
  );
}
