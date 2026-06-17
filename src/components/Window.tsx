import { Minus, Square, X } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { AppId } from '@/data/portfolio';

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
};

type WindowProps = PropsWithChildren<{
  state: WindowState;
  title: string;
  accent: string;
  active: boolean;
  onFocus: (id: AppId) => void;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onChange: (id: AppId, patch: Partial<WindowState>) => void;
}>;

type DragMode = 'move' | 'resize';

export default function Window({
  state,
  title,
  accent,
  active,
  onFocus,
  onClose,
  onMinimize,
  onChange,
  children,
}: WindowProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({
    mode: 'move' as DragMode,
    pointerId: 0,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    startWidth: 0,
    startHeight: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      const current = pointerRef.current;
      const dx = event.clientX - current.startX;
      const dy = event.clientY - current.startY;

      if (current.mode === 'move') {
        const maxX = Math.max(8, window.innerWidth - state.width - 8);
        const maxY = Math.max(8, window.innerHeight - state.height - 52);
        onChange(state.id, {
          x: Math.min(Math.max(8, current.startLeft + dx), maxX),
          y: Math.min(Math.max(8, current.startTop + dy), maxY),
        });
        return;
      }

      onChange(state.id, {
        width: Math.min(Math.max(330, current.startWidth + dx), window.innerWidth - state.x - 8),
        height: Math.min(Math.max(280, current.startHeight + dy), window.innerHeight - state.y - 52),
      });
    };

    const handlePointerUp = () => setIsDragging(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, onChange, state.height, state.id, state.width, state.x, state.y]);

  if (state.minimized) return null;

  const beginPointer = (event: React.PointerEvent, mode: DragMode) => {
    if (event.button !== 0) return;
    onFocus(state.id);
    pointerRef.current = {
      mode,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startLeft: state.x,
      startTop: state.y,
      startWidth: state.width,
      startHeight: state.height,
    };
    frameRef.current?.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  return (
    <div
      ref={frameRef}
      className={[
        'portfolio-window win-bevel fixed flex flex-col overflow-hidden rounded-[6px] bg-[#d9d6c9]',
        active ? 'ring-2 ring-white/35' : 'brightness-[.94]',
      ].join(' ')}
      style={{
        left: state.x,
        top: state.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
      }}
      onMouseDown={() => onFocus(state.id)}
      role="dialog"
      aria-label={title}
    >
      <div
        className="flex h-8 shrink-0 cursor-move select-none items-center justify-between border-b border-[#102c74] bg-gradient-to-r from-[#123799] via-[#235bd7] to-[#74a4ff] pl-2 text-white"
        onPointerDown={(event) => beginPointer(event, 'move')}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-4 w-4 shrink-0 rounded-sm border border-white/70" style={{ backgroundColor: accent }} />
          <span className="truncate text-[13px] font-bold [text-shadow:1px_1px_0_rgba(0,0,0,.4)]">
            {title}
          </span>
        </div>
        <div className="flex h-full items-center gap-1 px-1">
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-white/70 bg-[#d7d2c0] text-slate-900 shadow-panel"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onMinimize(state.id);
            }}
            aria-label={`Minimize ${title}`}
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-white/70 bg-[#d7d2c0] text-slate-900 shadow-panel"
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={`Window menu for ${title}`}
          >
            <Square size={12} />
          </button>
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-white/70 bg-[#d34b37] text-white shadow-panel"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onClose(state.id);
            }}
            aria-label={`Close ${title}`}
          >
            <X size={15} />
          </button>
        </div>
      </div>
      <div className="retro-scrollbar min-h-0 flex-1 overflow-auto border border-[#b7b1a2] bg-[#f4f1e4] p-4 text-slate-950">
        {children}
      </div>
      <div
        className="absolute bottom-0 right-0 h-5 w-5 cursor-se-resize"
        onPointerDown={(event) => beginPointer(event, 'resize')}
        aria-hidden="true"
      >
        <div className="absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-slate-500" />
      </div>
    </div>
  );
}
