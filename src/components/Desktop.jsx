import Taskbar from './Taskbar';

/**
 * Desktop Component
 * Main viewport container occupying 100vh and 100vw with bg-os background.
 * Acts as the canvas for the Web OS desktop environment.
 */
export default function Desktop() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-os text-main flex flex-col justify-between select-none">
      {/* Subtle OS Background Aesthetics (Ambient Grid & Glow) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#151521_1px,transparent_1px),linear-gradient(to_bottom,#151521_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Ambient neon radial glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-accent-cyan/[0.03] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-accent-purple/[0.04] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Desktop Workspace (Clean area reserved for future windows and desktop shortcuts) */}
      <div className="relative z-10 flex-1 w-full h-[calc(100vh-3rem)] p-6 flex flex-col justify-center items-center">
        {/* Subtle decorative watermark indicating system ready state */}
        <div className="text-center space-y-2 opacity-25 pointer-events-none select-none transition-opacity duration-500 hover:opacity-50">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-text-main">
            Portfolio OS &bull; Kernel v1.0.0
          </p>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-slate-400">
            SYSTEM READY<span className="animate-pulse text-accent-cyan">_</span>
          </h1>
          <p className="font-mono text-[11px] text-text-main/60 tracking-wider">
            Workspace initialized &bull; Awaiting Phase 2
          </p>
        </div>
      </div>

      {/* Taskbar anchored at the bottom */}
      <Taskbar />
    </main>
  );
}
