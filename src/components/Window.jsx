import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import { Minus, Square, Copy, X, Terminal, Folder, FileText, Compass } from 'lucide-react';

/**
 * Maps icon identifiers to Lucide components
 */
const ICON_MAP = {
  terminal: Terminal,
  folder: Folder,
  'file-text': FileText,
  map: Compass,
};

/**
 * Window Component
 * Floating, draggable, resizable window using react-rnd and styled according to the Cyber OS theme.
 */
export default function Window({
  windowData,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onDragStop,
  onResizeStop,
  children,
}) {
  const IconComponent = ICON_MAP[windowData.icon] || Terminal;

  // Maximize geometry constraints (100vw and calc(100vh - 48px) excluding taskbar)
  const size = windowData.isMaximized
    ? { width: '100vw', height: 'calc(100vh - 48px)' }
    : windowData.size;

  const position = windowData.isMaximized
    ? { x: 0, y: 0 }
    : windowData.position;

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={(e, d) => {
        if (!windowData.isMaximized) {
          onDragStop(windowData.id, { x: d.x, y: d.y });
        }
      }}
      onResizeStop={(e, direction, ref, delta, pos) => {
        if (!windowData.isMaximized) {
          onResizeStop(
            windowData.id,
            { width: ref.offsetWidth, height: ref.offsetHeight },
            pos
          );
        }
      }}
      dragHandleClassName="window-drag-handle"
      bounds="parent"
      minWidth={320}
      minHeight={180}
      disableDragging={windowData.isMaximized}
      enableResizing={!windowData.isMaximized}
      style={{
        zIndex: windowData.zIndex || 10,
        display: windowData.isMinimized ? 'none' : 'block',
      }}
      onMouseDown={() => onFocus(windowData.id)}
      className="select-none"
    >
      <motion.div
        style={{ zIndex: windowData.zIndex || 10 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        className={`w-full h-full flex flex-col overflow-hidden bg-os transition-shadow duration-200 border ${
          windowData.isMaximized ? 'rounded-none border-t-0 border-x-0' : 'rounded-lg'
        } ${
          isActive
            ? 'border-accent-cyan/50 shadow-[0_0_25px_rgba(0,229,255,0.18)]'
            : 'border-accent-purple/30 shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Window Titlebar / Drag Handle */}
        <header
          className={`window-drag-handle h-9 px-3 bg-window border-b flex items-center justify-between select-none transition-colors duration-200 ${
            windowData.isMaximized ? 'cursor-default' : 'cursor-move'
          } ${
            isActive
              ? 'border-accent-cyan/20'
              : 'border-accent-purple/20'
          }`}
          onDoubleClick={() => onMaximize(windowData.id)}
        >
          {/* Left: Window Title & Icon */}
          <div className="flex items-center gap-2 overflow-hidden pointer-events-none">
            <IconComponent
              className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-accent-cyan' : 'text-text-main/70'
              }`}
            />
            <span
              className={`font-mono text-xs font-medium tracking-wide truncate ${
                isActive ? 'text-slate-100' : 'text-text-main/70'
              }`}
            >
              {windowData.title}
            </span>
          </div>

          {/* Right: Window Controls */}
          <div
            className="flex items-center gap-1.5 ml-2"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Minimize Button */}
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(windowData.id);
              }}
              className="w-6 h-6 rounded flex items-center justify-center text-text-main hover:bg-white/10 hover:text-slate-100 transition-colors active:scale-95 cursor-pointer"
              title="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {/* Maximize / Restore Button */}
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(windowData.id);
              }}
              className="w-6 h-6 rounded flex items-center justify-center text-text-main hover:bg-white/10 hover:text-slate-100 transition-colors active:scale-95 cursor-pointer"
              title={windowData.isMaximized ? 'Restore' : 'Maximize'}
            >
              {windowData.isMaximized ? (
                <Copy className="w-3 h-3 rotate-180" />
              ) : (
                <Square className="w-3 h-3" />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onClose(windowData.id);
              }}
              className="w-6 h-6 rounded flex items-center justify-center text-text-main hover:bg-rose-600 hover:text-white transition-colors active:scale-95 cursor-pointer"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Window Content Area */}
        <div className="flex-1 w-full overflow-auto bg-os text-text-main font-mono text-xs select-text">
          {children || (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="p-3 rounded-full bg-white/[0.03] border border-white/10 text-accent-cyan">
                <IconComponent className="w-8 h-8 opacity-80" />
              </div>
              <div>
                <p className="text-slate-300 font-semibold tracking-wider uppercase text-sm">
                  {windowData.title}
                </p>
                <p className="text-[11px] text-text-main/60 mt-1">
                  Módulo inicializado en entorno de pruebas.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[10px] text-accent-cyan/80">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
                <span>ID: {windowData.id} &bull; z-index: {windowData.zIndex}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Rnd>
  );
}
