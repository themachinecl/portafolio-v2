import type { PortfolioApp } from '@/data/portfolio';

type DesktopIconProps = {
  app: PortfolioApp;
  onOpen: (id: PortfolioApp['id']) => void;
  compact?: boolean;
};

export default function DesktopIcon({ app, onOpen, compact = false }: DesktopIconProps) {
  const Icon = app.icon;

  return (
    <button
      type="button"
      className={[
        'desktop-icon group flex select-none items-center gap-3 rounded px-2 py-2 text-left text-white outline-none transition',
        compact
          ? 'w-full border border-white/15 bg-slate-950/35 shadow-panel backdrop-blur'
          : 'w-[92px] flex-col justify-start text-center hover:bg-white/15 focus:bg-white/20',
      ].join(' ')}
      onClick={() => onOpen(app.id)}
      aria-label={`Open ${app.title}`}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-white/50 shadow-panel"
        style={{
          background: `linear-gradient(135deg, ${app.accent}, #fff7c8)`,
          color: '#172554',
        }}
      >
        <Icon size={compact ? 23 : 25} strokeWidth={2.2} />
      </span>
      <span className="text-[12px] font-semibold leading-tight [text-shadow:1px_1px_0_rgba(0,0,0,.65)]">
        {app.title}
      </span>
    </button>
  );
}
