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
 * BinaryBackground Component
 * Renders full-screen background block with subtle 010110 random binary strings.
 */
function BinaryBackground() {
  const binaryContent =
    '01011010 01100101 01110010 01101111 00100000 01001111 01010011 00100000 01010011 01011001 01010011 01010100 01000101 01001101 00100000 01010010 01000101 01000001 01000100 01011001 00100000 01001011 01000101 01010010 01001110 01000101 01001100 00100000 01110110 00110010 00101110 00110000 00101110 00110001 00100000 01001110 01000101 01001001 01011010 01000001 01001110 00100000 01010011 01010000 01000001 01001001 01001110 00100000 01010101 01010011 01000001 00100000 01001110 01001111 01010010 01010111 01000001 01011001 00100000 01110010 01100101 01110011 01110101 01101101 01100101 00101110 01100101 01111000 01100101 00100000 01110000 01110010 01101111 01101010 01100101 01100011 01110100 01110011 00101110 01110011 01101000 00100000 01110100 01100101 01110010 01101101 01101001 01101110 01100001 01101100 00101110 01100101 01111000 01100101 00100000 '
      .repeat(50);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none font-mono text-white/5 break-all overflow-hidden h-full w-full p-4 text-xs sm:text-sm select-none leading-relaxed"
    >
      {binaryContent}
    </div>
  );
}

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

  // Dual autostart on initial page load: Terminal + Notepad side by side
  useEffect(() => {
    if (hasAutoStartedRef.current) return;
    hasAutoStartedRef.current = true;

    // Window 1: Terminal.exe
    openWindow({
      id: 'terminal',
      title: 'Terminal.exe',
      icon: 'terminal',
      size: { width: 600, height: 400 },
      position: { x: 50, y: 50 },
    });

    // Window 2: about-me.txt (to the right of terminal)
    openWindow({
      id: 'about',
      title: 'about-me.txt',
      icon: 'file-text',
      size: { width: 620, height: 490 },
      position: { x: 700, y: 50 },
    });
  }, [openWindow]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-os text-main flex flex-col justify-between select-none">
      {/* Full-screen subtle binary matrix veil */}
      <BinaryBackground />

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
