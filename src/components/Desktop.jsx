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
    openWindow({
      id: 'resume',
      title: 'ResumeViewer.exe',
      icon: 'file-text',
      size: { width: 720, height: 560 },
    });
    focusWindow('resume');
  }, [openWindow, focusWindow]);

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
        focusWindow('about');
        return true;
      } else if (target.includes('project')) {
        openWindow({
          id: 'projects',
          title: 'Projects',
          icon: 'folder',
          size: { width: 780, height: 500 },
        });
        focusWindow('projects');
        return true;
      } else if (target.includes('map') || target.includes('trajectory')) {
        openWindow({
          id: 'map',
          title: 'Trajectory.map',
          icon: 'map',
          size: { width: 760, height: 520 },
        });
        focusWindow('map');
        return true;
      }
      return false;
    },
    [handleOpenResume, openWindow, focusWindow]
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

        {/* Ambient watermark behind windows */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <div className="text-center space-y-2 opacity-20 transition-opacity duration-500 hover:opacity-40">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-text-main">
              Portfolio OS &bull; Kernel v2.0.1
            </p>
            <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-slate-400">
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
            appContent = <Terminal onOpenApp={handleOpenAppByName} />;
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
