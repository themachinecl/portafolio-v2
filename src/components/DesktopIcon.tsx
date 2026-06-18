import type { PortfolioApp } from '@/data/portfolio';

type DesktopIconProps = {
  app: PortfolioApp;
  onOpen: (id: PortfolioApp['id']) => void;
  compact?: boolean;
  dense?: boolean;
};

export default function DesktopIcon({ app, onOpen, compact = false, dense = false }: DesktopIconProps) {
  const Icon = app.icon;
  const isAoe = app.id === 'portfolioAoe2';

  return (
    <button
      type="button"
      className={[
        'desktop-icon group flex select-none items-center gap-3 rounded px-2 py-2 text-left text-white outline-none transition',
        compact
          ? 'w-full border border-white/15 bg-slate-950/35 shadow-panel backdrop-blur'
          : dense
            ? 'w-[78px] flex-col justify-start text-center hover:bg-white/15 focus:bg-white/20'
            : 'w-[92px] flex-col justify-start text-center hover:bg-white/15 focus:bg-white/20',
      ].join(' ')}
      onClick={() => onOpen(app.id)}
      aria-label={`Open ${app.title}`}
    >
      <span
        className={[
          'relative flex shrink-0 items-center justify-center rounded border border-white/50 shadow-panel',
          compact ? 'h-11 w-11' : dense ? 'h-9 w-9' : 'h-11 w-11',
        ].join(' ')}
        style={{
          background: isAoe
            ? 'linear-gradient(135deg, #5b3517, #d4a24c 58%, #fff0b8)'
            : `linear-gradient(135deg, ${app.accent}, #fff7c8)`,
          color: isAoe ? '#fff7d6' : '#172554',
        }}
      >
        {isAoe ? (
          <img src="/image/aoe2.png" alt="" className="h-full w-full rounded object-cover" aria-hidden="true" />
        ) : (
          <Icon size={compact ? 23 : dense ? 19 : 25} strokeWidth={2.2} />
        )}
      </span>
      <span className={['font-semibold leading-tight [text-shadow:1px_1px_0_rgba(0,0,0,.65)]', compact ? 'text-[12px]' : dense ? 'text-[11px]' : 'text-[12px]'].join(' ')}>
        {app.title}
      </span>
    </button>
  );
}
