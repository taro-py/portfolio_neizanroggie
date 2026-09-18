import { useEffect, useRef, useCallback } from 'react';
import Taskbar from './Taskbar';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import Notepad from './apps/Notepad';
import Terminal from './apps/Terminal';
import ResumeViewer from './apps/ResumeViewer';
import ProjectsExplorer from './apps/ProjectsExplorer';
import TrajectoryMap from './apps/TrajectoryMap';
import { useWindowManager } from '../hooks/useWindowManager';

/**
 * Desktop Component
 * Main viewport container and workspace orchestrator.
 * Renders desktop shortcuts, coordinates open applications, and anchors the Taskbar.
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

  const hasAutoStartedRef = useRef(false);

  // Function to open the ResumeViewer application with guaranteed top focus
  const handleOpenResume = useCallback(() => {
    const w = Math.min(window.innerWidth - 40, 720);
    const h = Math.min(window.innerHeight - 80, 560);
    const posX = Math.max(30, Math.floor((window.innerWidth - w) / 2) + 30);
    const posY = Math.max(30, Math.floor((window.innerHeight - 48 - h) / 2) + 20);

    openWindow({
      id: 'resume',
      title: 'ResumeViewer.exe',
      icon: 'file-text',
      size: { width: w, height: h },
      position: { x: posX, y: posY },
    });
  }, [openWindow]);

  // Terminal command bridge to open desktop applications
  const handleOpenAppByName = useCallback(
    (name) => {
      const target = (name || '').toLowerCase().trim();
      if (target.includes('resume') || target.includes('cv')) {
        handleOpenResume();
        return true;
      } else if (target.includes('about')) {
        openWindow({
          id: 'about',
          title: 'about-me.txt',
          icon: 'file-text',
          size: { width: 620, height: 490 },
        });
        return true;
      } else if (target.includes('project')) {
        openWindow({
          id: 'projects',
          title: 'Projects',
          icon: 'folder',
          size: { width: 780, height: 500 },
        });
        return true;
      } else if (target.includes('map') || target.includes('trajectory')) {
        openWindow({
          id: 'map',
          title: 'Trajectory.map',
          icon: 'map',
          size: { width: 760, height: 520 },
        });
        return true;
      }
      return false;
    },
    [handleOpenResume, openWindow]
  );

  // Desktop shortcut configurations
  const desktopShortcuts = [
    {
      id: 'about',
      title: 'about-me.txt',
      icon: 'file-text',
      size: { width: 620, height: 490 },
    },
    {
      id: 'resume',
      title: 'ResumeViewer.exe',
      icon: 'file-text',
      size: { width: 720, height: 560 },
    },
    {
      id: 'terminal',
      title: 'Terminal.exe',
      icon: 'terminal',
      size: { width: 660, height: 440 },
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: 'folder',
      size: { width: 780, height: 500 },
    },
    {
      id: 'map',
      title: 'Trajectory.map',
      icon: 'map',
      size: { width: 760, height: 520 },
    },
  ];

  // Autostart about-me.txt centered on initial page load (guaranteed single execution)
  useEffect(() => {
    if (hasAutoStartedRef.current) return;
    hasAutoStartedRef.current = true;

    const initialWidth = Math.min(window.innerWidth - 40, 620);
    const initialHeight = Math.min(window.innerHeight - 90, 490);
    const posX = Math.max(20, Math.floor((window.innerWidth - initialWidth) / 2));
    const posY = Math.max(20, Math.floor((window.innerHeight - 48 - initialHeight) / 2));

    openWindow({
      id: 'about',
      title: 'about-me.txt',
      icon: 'file-text',
      size: { width: initialWidth, height: initialHeight },
      position: { x: posX, y: posY },
    });
  }, [openWindow]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-os text-main flex flex-col justify-between select-none">
      {/* Desktop Workspace: bounds parent occupying 100vw and exactly calc(100vh - 48px) */}
      <div
        id="desktop-workspace"
        className="relative z-10 w-full h-[calc(100vh-48px)] overflow-hidden"
      >
        {/* Desktop Icons Grid (Top-Left) */}
        <section
          aria-label="Desktop shortcuts"
          className="absolute top-5 left-5 inline-flex flex-col gap-4 z-0 pointer-events-auto"
        >
          {desktopShortcuts.map((shortcut) => (
            <DesktopIcon
              key={shortcut.id}
              title={shortcut.title}
              icon={shortcut.icon}
              onOpen={() => openWindow(shortcut)}
            />
          ))}
        </section>

        {/* Ambient watermark & Cyberpunk binary matrix behind windows */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          {/* Subtle Cyberpunk Binary Code Clusters around center */}
          <div className="absolute -top-16 -left-28 sm:-left-44 font-mono text-[10px] text-accent-cyan/[0.08] tracking-widest leading-relaxed select-none">
            01101110 01100101 01101001 01111010<br />
            01100001 01101110 00100000 01110010<br />
            01101111 01100111 01100111 01101001
          </div>
          <div className="absolute -bottom-16 -right-24 sm:-right-40 font-mono text-xs text-white/[0.04] tracking-widest leading-relaxed select-none">
            10010011 01010101 01001000 01010101<br />
            01010101 01101001 01010011 00101101<br />
            00110011 00100001 01000011 01000001
          </div>
          <div className="absolute -top-24 right-12 sm:right-28 font-mono text-[9px] text-white/[0.04] tracking-wider select-none">
            11001010 00110101 10101100 01111001<br />
            01010011 01011001 01001110 01010100
          </div>
          <div className="absolute -bottom-24 left-8 sm:left-20 font-mono text-[11px] text-accent-cyan/[0.07] tracking-widest select-none">
            01001011 01000101 01010010 01001110<br />
            01100101 01101100 00101110 01111000
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -left-52 font-mono text-[8px] text-white/[0.03] tracking-widest hidden md:block select-none">
            01110011 01111001 01110011<br />
            01110100 01100101 01101101<br />
            01110010 01100101 01100001
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-52 font-mono text-[8px] text-accent-cyan/[0.05] tracking-widest hidden md:block select-none">
            01010011 01010000 01000001<br />
            01010101 01010011 01000001<br />
            01001110 01001111 01010010
          </div>

          <div className="relative text-center space-y-2 opacity-25 transition-opacity duration-500 hover:opacity-45">
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-text-main">
              Portfolio OS &bull; Kernel v2.0.1
            </p>
            <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-slate-300">
              SYSTEM READY<span className="animate-pulse text-accent-cyan">_</span>
            </h1>
            <p className="font-mono text-[11px] text-text-main/60 tracking-wider">
              Double click any desktop icon to launch application
            </p>
          </div>
        </div>

        {/* Active Windows rendered inside workspace bounds */}
        {windows.map((win) => {
          let appContent = null;
          if (win.id === 'about') {
            appContent = <Notepad onOpenResume={handleOpenResume} />;
          } else if (win.id === 'resume') {
            appContent = <ResumeViewer onClose={() => closeWindow('resume')} />;
          } else if (win.id === 'terminal') {
            appContent = (
              <Terminal
                onOpenApp={handleOpenAppByName}
                onClose={() => closeWindow('terminal')}
              />
            );
          } else if (win.id === 'projects') {
            appContent = <ProjectsExplorer />;
          } else if (win.id === 'map') {
            appContent = <TrajectoryMap />;
          }

          return (
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
            >
              {appContent}
            </Window>
          );
        })}
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
            size: { width: 660, height: 440 },
          })
        }
      />
    </main>
  );
}
