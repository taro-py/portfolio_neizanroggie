import { useState, useCallback } from 'react';

/**
 * Custom Hook: useWindowManager
 * Manages the multi-window desktop environment state with strictly deterministic, atomic z-index calculation.
 */
export function useWindowManager() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  /**
   * Brings a window to the top layer and marks it as active
   */
  const focusWindow = useCallback((id) => {
    setWindows((prevWindows) => {
      const highestZ = prevWindows.reduce(
        (max, w) => Math.max(max, w.zIndex || 0),
        20
      );
      const nextZ = highestZ + 1;

      return prevWindows.map((win) => {
        if (win.id === id) {
          return {
            ...win,
            zIndex: nextZ,
            isMinimized: false,
          };
        }
        return win;
      });
    });
    setActiveWindowId(id);
  }, []);

  /**
   * Opens a window or restores and focuses it if already opened
   */
  const openWindow = useCallback((config) => {
    setWindows((prevWindows) => {
      const highestZ = prevWindows.reduce(
        (max, w) => Math.max(max, w.zIndex || 0),
        20
      );
      const nextZIndex = highestZ + 1;

      const existing = prevWindows.find((w) => w.id === config.id);
      if (existing) {
        return prevWindows.map((win) =>
          win.id === config.id
            ? { ...win, isMinimized: false, zIndex: nextZIndex }
            : win
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
        title: config.title || 'New Window',
        icon: config.icon || 'terminal',
        isMinimized: false,
        isMaximized: false,
        size: initialSize,
        position: initialPos,
        prevBounds: { size: initialSize, position: initialPos },
        content: config.content || null,
        zIndex: nextZIndex,
      };

      return [...prevWindows, newWindow];
    });

    setActiveWindowId(config.id);
  }, []);

  /**
   * Closes and removes a window
   */
  const closeWindow = useCallback((id) => {
    setWindows((prev) => {
      const remaining = prev.filter((w) => w.id !== id);

      setActiveWindowId((currentActive) => {
        if (currentActive === id) {
          const visible = remaining.filter((w) => !w.isMinimized);
          if (visible.length > 0) {
            const topmost = visible.reduce((highest, current) =>
              current.zIndex > highest.zIndex ? current : highest
            );
            return topmost.id;
          }
          return null;
        }
        return currentActive;
      });

      return remaining;
    });
  }, []);

  /**
   * Minimizes a window and passes focus to the next topmost visible window
   */
  const minimizeWindow = useCallback((id) => {
    setWindows((prev) => {
      const updated = prev.map((win) =>
        win.id === id ? { ...win, isMinimized: true } : win
      );

      setActiveWindowId((currentActive) => {
        if (currentActive === id) {
          const visible = updated.filter((w) => !w.isMinimized);
          if (visible.length > 0) {
            const topmost = visible.reduce((highest, current) =>
              current.zIndex > highest.zIndex ? current : highest
            );
            return topmost.id;
          }
          return null;
        }
        return currentActive;
      });

      return updated;
    });
  }, []);

  /**
   * Toggles maximize/restore state of a window
   */
  const maximizeWindow = useCallback((id) => {
    setWindows((prev) => {
      const highestZ = prev.reduce(
        (max, w) => Math.max(max, w.zIndex || 0),
        20
      );
      const nextZ = highestZ + 1;

      return prev.map((win) => {
        if (win.id !== id) return win;

        if (win.isMaximized) {
          return {
            ...win,
            isMaximized: false,
            zIndex: nextZ,
            size: win.prevBounds.size,
            position: win.prevBounds.position,
          };
        } else {
          return {
            ...win,
            isMaximized: true,
            zIndex: nextZ,
            prevBounds: {
              size: win.size,
              position: win.position,
            },
          };
        }
      });
    });
    setActiveWindowId(id);
  }, []);

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
