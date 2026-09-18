import { Download, Lock, FileCode, CheckCircle } from 'lucide-react';

/**
 * ResumeViewer Component
 * A4 document viewer placeholder styled as an authenticated terminal artifact.
 */
export default function ResumeViewer({ onClose }) {
  return (
    <div className="h-full w-full flex flex-col bg-[#0d0e15] font-mono select-none overflow-hidden">
      {/* Top Document Toolbar */}
      <div className="h-9 px-4 bg-window/90 border-b border-white/10 flex items-center justify-between text-xs text-text-main shrink-0">
        {/* Left: Terminal Path */}
        <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
          <FileCode className="w-3.5 h-3.5 text-accent-cyan" />
          <span>neizan@os : ~/resume $ view</span>
        </div>

        {/* Center: Authenticated Status */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded tracking-widest">
          <CheckCircle className="w-3 h-3 text-emerald-400" />
          <span>AUTHENTICATED ARTIFACT</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-slate-400 opacity-50 cursor-not-allowed"
            title="Download disabled - Compilation in progress"
          >
            <Download className="w-3 h-3" />
            <span className="hidden md:inline">Download PDF</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 rounded hover:bg-white/10 text-[11px] text-text-main hover:text-slate-200 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* A4 Document Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-[#0a0b10]/90">
        {/* Simulated A4 Folio */}
        <div className="w-full max-w-[620px] aspect-[1/1.414] min-h-[580px] bg-white rounded shadow-2xl p-8 sm:p-12 flex flex-col justify-between text-slate-800 relative select-text border border-slate-200">
          {/* Subtle Document Header Accent */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-slate-900">
                NEIZAN ROGGIE
              </h1>
              <p className="text-xs font-mono text-slate-600 tracking-wide mt-0.5">
                FULL-STACK SOFTWARE ENGINEER
              </p>
            </div>
            <div className="text-right text-[10px] font-mono text-slate-500">
              <p>REF: NR-CV-2026</p>
              <p>STATUS: CONFIDENTIAL</p>
            </div>
          </div>

          {/* Center Encrypted Placeholder */}
          <div className="my-auto py-12 flex flex-col items-center justify-center text-center space-y-4 select-none">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 shadow-inner">
                <Lock className="w-6 h-6 text-slate-700" />
              </div>
              <span className="w-3 h-3 rounded-full bg-accent-cyan absolute -top-0.5 -right-0.5 border-2 border-white animate-ping" />
              <span className="w-3 h-3 rounded-full bg-accent-cyan absolute -top-0.5 -right-0.5 border-2 border-white" />
            </div>

            <div className="space-y-2 max-w-[420px]">
              <div className="inline-block px-3 py-1.5 rounded bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold tracking-wider">
                [ RESUME_DATA_ENCRYPTED :: COMPILATION_IN_PROGRESS ]
              </div>
              <p className="text-xs font-mono text-slate-500 leading-relaxed">
                Official curriculum vitae payload is currently being updated with recent academic milestones and international project deployments.
              </p>
            </div>

            {/* Micro loading progress line */}
            <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-slate-800 rounded-full animate-pulse w-3/4" />
            </div>
          </div>

          {/* Folio Footer */}
          <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>UHU (SPAIN) &bull; UiS (NORWAY)</span>
            <span>PAGE 1 OF 1 &bull; VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
