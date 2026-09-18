import { useState } from 'react';
import { Terminal, Folder, FileText } from 'lucide-react';

const ICON_MAP = {
  terminal: Terminal,
  folder: Folder,
  'file-text': FileText,
};

/**
 * DesktopIcon Component
 * Clickable and double-clickable desktop shortcut styled with cybernetic/terminal aesthetics.
 */
export default function DesktopIcon({
  title,
  icon = 'terminal',
  onOpen,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const Icon = ICON_MAP[icon] || FileText;

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => setIsSelected(true)}
      onBlur={() => setIsSelected(false)}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onOpen();
        }
      }}
      className={`group w-24 p-2 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer outline-none transition-all duration-150 select-none ${
        isSelected
          ? 'bg-accent-cyan/15 border border-accent-cyan/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
          : 'hover:bg-white/[0.04] border border-transparent hover:border-white/10'
      }`}
      title={`Doble clic para abrir ${title}`}
    >
      {/* Icon frame */}
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
          isSelected
            ? 'bg-accent-cyan/20 text-accent-cyan shadow-[0_0_10px_rgba(0,229,255,0.3)]'
            : 'bg-white/[0.03] border border-white/10 text-text-main group-hover:text-accent-cyan group-hover:border-accent-cyan/40'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Icon label */}
      <span
        className={`font-mono text-[11px] text-center tracking-wide leading-tight px-1 py-0.5 rounded transition-colors break-words max-w-[84px] ${
          isSelected
            ? 'bg-accent-cyan/30 text-white font-medium'
            : 'text-slate-300 group-hover:text-accent-cyan'
        }`}
      >
        {title}
      </span>
    </div>
  );
}
