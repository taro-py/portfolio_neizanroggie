import { useState, useEffect } from 'react';

/**
 * Digital Clock Component
 * Displays user's local time updated every second.
 */
export default function Clock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/40 border border-white/5 font-mono text-xs text-text-main shadow-inner transition-all hover:border-accent-cyan/30 hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] group"
      title="Hora local del sistema"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan shadow-[0_0_6px_#00E5FF]"></span>
      </span>
      <span className="tabular-nums font-medium text-slate-200 tracking-wider">
        {time}
      </span>
    </div>
  );
}
