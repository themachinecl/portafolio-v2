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
    <div className="start-menu absolute bottom-10 left-1 z-[900] w-[min(500px,calc(100vw-16px))] origin-bottom-left overflow-hidden rounded-t-md border border-[#09266d] bg-[#ede9dc] shadow-win">
      <div className="bg-gradient-to-r from-[#122b75] via-[#2459d8] to-[#62b6cb] px-4 py-3 text-white">
        <div className="text-sm font-bold">{profile.name}</div>
        <div className="text-xs text-blue-100">Senior Software Engineer · Technical Lead · Angular & React Specialist</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_210px]">
        <div className="p-2">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                type="button"
                className="flex w-full items-center gap-3 rounded px-2 py-2 text-left text-[13px] font-semibold text-slate-900 transition hover:bg-[#316be8] hover:text-white focus:bg-[#316be8] focus:text-white"
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
        <div className="border-t border-[#b9b29e] bg-[#d6e5ff] p-2 text-[12px] text-slate-800 sm:border-l sm:border-t-0">
          <SystemStatus label="Current Status" value="Available" icon="🟢" />
          <SystemStatus label="Current Role" value="Senior Software Engineer" icon="💼" />
          <div className="rounded bg-white/70 p-2 shadow-panel">
            <strong>Primary Stack</strong>
            {profile.primaryStack.map((item) => (
              <p key={item} className="mt-1 leading-snug">
                ⚡ {item}
              </p>
            ))}
          </div>
          <div className="mt-2 rounded bg-white/70 p-2 shadow-panel">
            <strong>Industries</strong>
            {['Banking', 'Healthcare', 'Government', 'Logistics'].map((item) => (
              <p key={item} className="mt-1 leading-snug">
                • {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemStatus({
  label,
  value,
  icon,
  tone = 'text-[#143c9f]',
}: {
  label: string;
  value: string;
  icon: string;
  tone?: string;
}) {
  return (
    <div className="mb-2 rounded bg-white/70 p-2 shadow-panel">
      <strong>{label}</strong>
      <p className="mt-1 leading-snug">
        <span className={tone}>{icon}</span> {value}
      </p>
    </div>
  );
}
