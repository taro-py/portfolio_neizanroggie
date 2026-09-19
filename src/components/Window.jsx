import { useState, useEffect } from 'react';
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
  bringToFront,
  onClose,
  onMinimize,
  onMaximize,
  onDragStop,
  onResizeStop,
  children,
}) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBringToFront = bringToFront || onFocus;
  const bringToFrontHandler = () => {
    handleBringToFront?.(windowData.id);
  };
  const IconComponent = ICON_MAP[windowData.icon] || Terminal;

  const isFullScreen = isMobile || windowData.isMaximized;

  // Maximize / Mobile geometry constraints: 100% on mobile or maximized
  const size = isFullScreen
    ? { width: '100%', height: 'calc(100vh - 48px)' }
    : windowData.size;

  const position = isFullScreen
    ? { x: 0, y: 0 }
    : windowData.position;

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={(e, d) => {
        if (!isFullScreen) {
          onDragStop(windowData.id, { x: d.x, y: d.y });
        }
      }}
      onResizeStop={(e, direction, ref, delta, pos) => {
        if (!isFullScreen) {
          onResizeStop(
            windowData.id,
            { width: ref.offsetWidth, height: ref.offsetHeight },
            pos
          );
        }
      }}
      dragHandleClassName="window-drag-handle"
      cancel=".window-controls"
      bounds="parent"
      minWidth={320}
      minHeight={180}
      disableDragging={isFullScreen}
      enableResizing={!isFullScreen}
      z={windowData.zIndex || 50}
      style={{
        zIndex: windowData.zIndex || 50,
        display: windowData.isMinimized ? 'none' : 'block',
        ...(isFullScreen
          ? {
              top: 0,
              left: 0,
              transform: 'none',
              width: '100%',
              height: 'calc(100vh - 48px)',
              borderRadius: '0px',
            }
          : {}),
      }}
      onPointerDownCapture={bringToFrontHandler}
      onClickCapture={bringToFrontHandler}
      onMouseDown={bringToFrontHandler}
      className={`select-none ${
        isFullScreen
          ? '!top-0 !left-0 !transform-none !w-full !h-[calc(100vh-48px)] !rounded-none'
          : ''
      }`}
    >
      <motion.div
        onPointerDownCapture={bringToFrontHandler}
        onClickCapture={bringToFrontHandler}
        onMouseDownCapture={bringToFrontHandler}
        onMouseDown={bringToFrontHandler}
        style={{
          zIndex: windowData.zIndex || 50,
          ...(isFullScreen
            ? {
                top: 0,
                left: 0,
                transform: 'none',
                width: '100%',
                height: '100%',
                borderRadius: '0px',
              }
            : {}),
        }}
        initial={isMobile ? false : { opacity: 0, scale: 0.95 }}
        animate={
          isFullScreen
            ? { opacity: 1, scale: 1, x: 0, y: 0 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.16, ease: 'easeOut' }}
        className={`w-full h-full flex flex-col overflow-hidden bg-os transition-shadow duration-200 border ${
          isFullScreen
            ? '!rounded-none border-t-0 border-x-0 !transform-none !w-full !h-full'
            : 'rounded-lg'
        } ${
          isActive
            ? 'border-accent-cyan/50 shadow-[0_0_25px_rgba(0,229,255,0.18)]'
            : 'border-accent-purple/30 shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Window Titlebar / Drag Handle (integrated in custom views like map) */}
        {windowData.id !== 'map' && (
          <header
            className={`window-drag-handle h-9 px-2 sm:px-3 bg-window border-b flex items-center justify-between w-full max-w-full shrink-0 select-none transition-colors duration-200 ${
              isFullScreen ? 'cursor-default' : 'cursor-default md:cursor-move'
            } ${
              isActive
                ? 'border-accent-cyan/20'
                : 'border-accent-purple/20'
            }`}
            onDoubleClick={() => !isFullScreen && onMaximize(windowData.id)}
          >
          {/* Left: Window Title & Icon */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden pointer-events-none min-w-0 flex-1 mr-2">
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
            className="window-controls relative z-30 flex items-center gap-1 sm:gap-1.5 shrink-0 min-w-max ml-auto pointer-events-auto"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Minimize Button */}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(windowData.id);
              }}
              className="w-6 h-6 rounded flex items-center justify-center text-text-main hover:bg-white/10 hover:text-slate-100 transition-colors active:scale-95 cursor-pointer touch-manipulation"
              title="Minimize"
              aria-label="Minimize"
            >
              <Minus className="w-3.5 h-3.5 pointer-events-none" />
            </button>

            {/* Maximize / Restore Button */}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(windowData.id);
              }}
              className="w-6 h-6 rounded flex items-center justify-center text-text-main hover:bg-white/10 hover:text-slate-100 transition-colors active:scale-95 cursor-pointer touch-manipulation"
              title={windowData.isMaximized ? 'Restore' : 'Maximize'}
              aria-label={windowData.isMaximized ? 'Restore' : 'Maximize'}
            >
              {windowData.isMaximized ? (
                <Copy className="w-3 h-3 rotate-180 pointer-events-none" />
              ) : (
                <Square className="w-3 h-3 pointer-events-none" />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onClose(windowData.id);
              }}
              className="w-6 h-6 rounded flex items-center justify-center text-text-main hover:bg-rose-600 hover:text-white transition-colors active:scale-95 cursor-pointer touch-manipulation"
              title="Close"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 pointer-events-none" />
            </button>
          </div>
        </header>
        )}

        {/* Window Content Area */}
        <div
          onPointerDownCapture={bringToFrontHandler}
          onClickCapture={bringToFrontHandler}
          className={`flex-1 w-full bg-os text-text-main font-mono text-xs select-text ${
            windowData.id === 'map' ? 'overflow-hidden relative' : 'overflow-auto'
          }`}
        >
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
