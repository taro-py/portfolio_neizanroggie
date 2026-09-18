import { useState, useCallback } from 'react';

/**
 * Custom Hook: useWindowManager
 * Manages the multi-window desktop environment state (open, close, focus, minimize, maximize, z-index).
 */
export function useWindowManager() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [topZIndex, setTopZIndex] = useState(20);

  /**
   * Brings a window to the top layer and marks it as active
   */
  const focusWindow = useCallback((id) => {
    setTopZIndex((prevTop) => {
      const nextTop = prevTop + 1;
      setWindows((prevWindows) =>
        prevWindows.map((win) => {
          if (win.id === id) {
            return {
              ...win,
              zIndex: nextTop,
              isMinimized: false,
            };
          }
          return win;
        })
      );
      return nextTop;
    });
    setActiveWindowId(id);
  }, []);

  /**
   * Opens a window or restores and focuses it if already opened
   */
  const openWindow = useCallback((config) => {
    setWindows((prevWindows) => {
      const existing = prevWindows.find((w) => w.id === config.id);
      if (existing) {
        // If it already exists, restore it and focus
        focusWindow(config.id);
        return prevWindows.map((win) =>
          win.id === config.id ? { ...win, isMinimized: false } : win
        );
      }

      // Calculate cascading default position if not provided
      const offset = (prevWindows.length % 6) * 30;
      const initialPos = config.position || {
        x: Math.max(40, 100 + offset),
        y: Math.max(40, 60 + offset),
      };
      const initialSize = config.size || {
        width: Math.min(window.innerWidth - 60, 640),
        height: Math.min(window.innerHeight - 140, 420),
      };

      const newWindow = {
        id: config.id,
        title: config.title || 'Nueva Ventana',
        icon: config.icon || 'terminal',
        isMinimized: false,
        isMaximized: false,
        size: initialSize,
        position: initialPos,
        prevBounds: { size: initialSize, position: initialPos },
        content: config.content || null,
        zIndex: topZIndex + 1,
      };

      setTopZIndex((z) => z + 1);
      setActiveWindowId(config.id);

      return [...prevWindows, newWindow];
    });
  }, [focusWindow, topZIndex]);

  /**
   * Closes and removes a window
   */
  const closeWindow = useCallback((id) => {
    setWindows((prev) => {
      const remaining = prev.filter((w) => w.id !== id);

      // Determine next active window
      if (activeWindowId === id) {
        const visibleRemaining = remaining.filter((w) => !w.isMinimized);
        if (visibleRemaining.length > 0) {
          const topmost = visibleRemaining.reduce((highest, current) =>
            current.zIndex > highest.zIndex ? current : highest
          );
          setActiveWindowId(topmost.id);
        } else {
          setActiveWindowId(null);
        }
      }

      return remaining;
    });
  }, [activeWindowId]);

  /**
   * Minimizes a window and passes focus to the next topmost visible window
   */
  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => {
      const updated = prev.map((win) =>
        win.id === id ? { ...win, isMinimized: true } : win
      );

      // Change active window if minimized window was active
      if (activeWindowId === id) {
        const visible = updated.filter((w) => !w.isMinimized);
        if (visible.length > 0) {
          const topmost = visible.reduce((highest, current) =>
            current.zIndex > highest.zIndex ? current : highest
          );
          setActiveWindowId(topmost.id);
        } else {
          setActiveWindowId(null);
        }
      }

      return updated;
    });
  }, [activeWindowId]);

  /**
   * Toggles maximize/restore state of a window
   */
  const maximizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id !== id) return win;

        if (win.isMaximized) {
          // Restore previous size and position
          return {
            ...win,
            isMaximized: false,
            size: win.prevBounds.size,
            position: win.prevBounds.position,
          };
        } else {
          // Save current bounds and maximize
          return {
            ...win,
            isMaximized: true,
            prevBounds: {
              size: win.size,
              position: win.position,
            },
          };
        }
      })
    );
    focusWindow(id);
  }, [focusWindow]);

  /**
   * Updates position on drag end
   */
  const updateWindowPosition = useCallback((id, position) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, position } : win))
    );
  }, []);

  /**
   * Updates size and position on resize end
   */
  const updateWindowSize = useCallback((id, size, position) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, size, position } : win))
    );
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  };
}
