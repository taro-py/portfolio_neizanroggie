import { Terminal, Wifi, Volume2, ShieldCheck } from 'lucide-react';
import Clock from './Clock';

/**
 * Taskbar Component
 * Fixed at the bottom of the screen with OS status, launcher and digital clock.
 */
export default function Taskbar() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full h-12 bg-window/95 backdrop-blur-md border-t border-accent-purple/20 flex items-center justify-between px-4 z-50 select-none shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      {/* Left: OS Launcher / Terminal Trigger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 hover:border-accent-cyan/50 hover:bg-white/[0.08] hover:shadow-[0_0_12px_rgba(0,229,255,0.2)] text-text-main hover:text-accent-cyan transition-all duration-200 group active:scale-95"
          title="Terminal / Menú del Sistema"
        >
          <Terminal className="w-4 h-4 text-accent-cyan transition-transform group-hover:scale-110" />
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-200 group-hover:text-accent-cyan">
            TERMINAL
          </span>
          <span className="font-mono text-[10px] px-1 py-0.5 rounded bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
            v1.0
          </span>
        </button>

        {/* Subtle separator */}
        <div className="h-5 w-px bg-white/10" />

        {/* Quick status indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-text-main/70">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan/80" />
          <span>STATUS: <span className="text-emerald-400">ONLINE</span></span>
        </div>
      </div>

      {/* Center: Open tasks / Window tabs area (placeholder for future phases) */}
      <div className="flex-1 flex items-center justify-center px-4">
        {/* Intentionally clean for now - prepared for active window indicators */}
      </div>

      {/* Right: System Tray & Real-time Clock */}
      <div className="flex items-center gap-3">
        {/* System Tray Icons */}
        <div className="hidden md:flex items-center gap-2 text-text-main/60">
          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-text-main transition-colors"
            title="Conexión de red activa"
          >
            <Wifi className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-white/5 hover:text-text-main transition-colors"
            title="Audio del sistema"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="hidden md:block h-4 w-px bg-white/10" />

        {/* Live Digital Clock */}
        <Clock />
      </div>
    </footer>
  );
}
