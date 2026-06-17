import type { AppId, PortfolioApp } from '@/data/portfolio';
import { profile } from '@/data/portfolio';

type StartMenuProps = {
  apps: PortfolioApp[];
  open: boolean;
  onOpenApp: (id: AppId) => void;
};

export default function StartMenu({ apps, open, onOpenApp }: StartMenuProps) {
  if (!open) return null;

  return (
    <div className="start-menu absolute bottom-10 left-1 z-[900] w-[min(360px,calc(100vw-16px))] overflow-hidden rounded-t-md border border-[#0b2e87] bg-[#ede9dc] shadow-win">
      <div className="bg-gradient-to-r from-[#173b9f] to-[#2875f0] px-4 py-3 text-white">
        <div className="text-sm font-bold">{profile.name}</div>
        <div className="text-xs text-blue-100">{profile.role}</div>
      </div>
      <div className="grid grid-cols-[1fr_108px]">
        <div className="p-2">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                type="button"
                className="flex w-full items-center gap-3 rounded px-2 py-2 text-left text-[13px] font-semibold text-slate-900 hover:bg-[#316be8] hover:text-white focus:bg-[#316be8] focus:text-white"
                onClick={() => onOpenApp(app.id)}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded border border-white/60"
                  style={{ backgroundColor: app.accent }}
                >
                  <Icon size={18} />
                </span>
                {app.title}
              </button>
            );
          })}
        </div>
        <div className="border-l border-[#b9b29e] bg-[#d6e5ff] p-2 text-[12px] text-slate-800">
          <div className="mb-2 rounded bg-white/60 p-2 shadow-panel">
            <strong>System</strong>
            <p className="mt-1 leading-snug">Portfolio mode active</p>
          </div>
          <div className="rounded bg-white/60 p-2 shadow-panel">
            <strong>Status</strong>
            <p className="mt-1 leading-snug">Available for frontend work</p>
          </div>
        </div>
      </div>
    </div>
  );
}
