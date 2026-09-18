import Taskbar from './Taskbar';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import { useWindowManager } from '../hooks/useWindowManager';

/**
 * Desktop Component
 * Main viewport container and workspace orchestrator.
 * Renders desktop icons, manages multiple draggable/resizable windows, and anchors the Taskbar.
 */
export default function Desktop() {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();

  // Desktop shortcut configurations
  const desktopShortcuts = [
    {
      id: 'terminal',
      title: 'Terminal.exe',
      icon: 'terminal',
      size: { width: 640, height: 420 },
    },
    {
      id: 'projects',
      title: 'Carpeta',
      icon: 'folder',
      size: { width: 560, height: 380 },
    },
  ];

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

      {/* Desktop Workspace */}
      <div
        id="desktop-workspace"
        className="relative z-10 flex-1 w-full h-[calc(100vh-3rem)] p-5 overflow-hidden"
      >
        {/* Desktop Icons Grid (Top-Left) */}
        <section
          aria-label="Iconos del escritorio"
          className="inline-flex flex-col gap-4 z-0 relative"
        >
          {desktopShortcuts.map((shortcut) => (
            <DesktopIcon
              key={shortcut.id}
              id={shortcut.id}
              title={shortcut.title}
              icon={shortcut.icon}
              onOpen={() => openWindow(shortcut)}
            />
          ))}
        </section>

        {/* Ambient watermark behind windows */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <div className="text-center space-y-2 opacity-20 transition-opacity duration-500 hover:opacity-40">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-text-main">
              Portfolio OS &bull; Kernel v1.0.0
            </p>
            <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-slate-400">
              SYSTEM READY<span className="animate-pulse text-accent-cyan">_</span>
            </h1>
            <p className="font-mono text-[11px] text-text-main/60 tracking-wider">
              Double click any desktop icon to launch window
            </p>
          </div>
        </div>

        {/* Active Windows rendered inside workspace bounds */}
        {windows.map((win) => (
          <Window
            key={win.id}
            windowData={win}
            isActive={win.id === activeWindowId}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onDragStop={updateWindowPosition}
            onResizeStop={updateWindowSize}
          />
        ))}
      </div>

      {/* Taskbar anchored at the bottom */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onFocusWindow={focusWindow}
        onMinimizeWindow={minimizeWindow}
        onOpenTerminal={() =>
          openWindow({
            id: 'terminal',
            title: 'Terminal.exe',
            icon: 'terminal',
            size: { width: 640, height: 420 },
          })
        }
      />
    </main>
  );
}
