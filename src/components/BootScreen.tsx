type BootScreenProps = {
  visible: boolean;
  onSkip: () => void;
};

const bootLines = ['Loading profile...', 'Loading projects...', 'Loading experience...', 'Loading skills...'];

export default function BootScreen({ visible, onSkip }: BootScreenProps) {
  return (
    <div
      className={[
        'boot-screen fixed inset-0 z-[1000] flex items-center justify-center bg-black text-white transition-opacity duration-500',
        visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
      aria-hidden={!visible}
    >
      <div className="relative w-[min(560px,88vw)] overflow-hidden rounded border border-[#75a7ff]/60 bg-[#061026] p-5 text-left shadow-[0_0_60px_rgba(66,153,225,.25)]">
        <div className="absolute inset-0 opacity-20 pixel-grid" />
        <div className="relative">
          <div className="mb-1 text-center text-[32px] font-bold tracking-wide sm:text-[46px]">
            Juan Paulo <span className="text-[#7dbbff]">OS</span>
          </div>
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-[.28em] text-[#f7d154]">
            Enterprise Engineer Edition
          </p>
          <div className="space-y-2 font-mono text-sm text-[#d8ffe0]">
            {bootLines.map((line) => (
              <div key={line} className="boot-line flex items-center justify-between border-b border-white/10 pb-2 opacity-0">
                <span>{line}</span>
                <span className="boot-ok text-[#83d15f]">OK</span>
              </div>
            ))}
          </div>
          <p className="boot-welcome mt-6 text-center text-lg font-bold text-white opacity-0">Welcome Juan Paulo</p>
          <button
            type="button"
            className="absolute right-0 top-0 rounded-sm border border-[#75a7ff]/50 bg-white/10 px-2 py-1 text-xs font-bold text-white hover:bg-white/20"
            onClick={onSkip}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
