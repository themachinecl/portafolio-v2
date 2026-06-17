type BootScreenProps = {
  visible: boolean;
};

export default function BootScreen({ visible }: BootScreenProps) {
  return (
    <div
      className={[
        'boot-screen pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center bg-black text-white transition-opacity duration-500',
        visible ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
      aria-hidden={!visible}
    >
      <div className="w-[min(520px,86vw)] text-center">
        <div className="mb-8 text-[34px] font-bold tracking-wide sm:text-[46px]">
          Juan Paulo <span className="text-[#5aa7ff]">OS</span>
        </div>
        <div className="mx-auto mb-5 h-4 w-72 max-w-full overflow-hidden rounded-sm border border-[#8ab6ff] bg-[#06132f] p-[2px]">
          <div className="boot-progress h-full w-1/3 rounded-sm bg-gradient-to-r from-[#2f8a27] via-[#83d15f] to-[#d8ffe0]" />
        </div>
        <p className="font-mono text-xs uppercase tracking-[.28em] text-[#9fb8ff]">
          Loading portfolio shell
        </p>
      </div>
    </div>
  );
}
