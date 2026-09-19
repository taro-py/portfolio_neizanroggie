import { useState, useEffect } from 'react';
import { Globe, Navigation, Briefcase, Sparkles, Minus, Square, Copy, X } from 'lucide-react';

const MILESTONES = {
  huelva: {
    id: 'huelva',
    city: 'Huelva',
    country: 'Spain',
    dates: '2023 - 2027',
    title: 'BSc Computer Engineering',
    role: 'BSc Computer Engineering',
    tag: 'ORIGIN NODE',
    institution: 'University of Huelva (UHU)',
    desc: 'Foundational computer science degree focusing on core systems programming (C/C++), data structures, Big-O complexity, and database architecture.',
    coords: '37.26° N, 6.94° W',
    period: 'Foundations (Years 1-3)',
    color: 'purple',
    positionClass: 'top-[38%] left-[45.2%]',
    labelDirection: 'below',
    svgPos: { x: 452, y: 380 },
  },
  nc: {
    id: 'nc',
    city: 'North Carolina',
    country: 'USA',
    dates: 'Jun 2024 - Sep 2024',
    title: 'Professional Environment and International Teamwork',
    role: 'Floor Installer and Carpet Specialist',
    tag: 'TRANSATLANTIC NODE',
    institution: '321 Carpet and Flooring',
    desc: 'I worked for three months at 321 Carpet and Flooring as a floor installer and carpet specialist, a company located in North Carolina, United States.',
    coords: '35.76° N, 79.02° W',
    period: 'Summer Work Experience',
    color: 'emerald',
    positionClass: 'top-[39.5%] left-[25.5%]',
    labelDirection: 'below',
    svgPos: { x: 255, y: 395 },
  },
  stavanger: {
    id: 'stavanger',
    city: 'Stavanger',
    country: 'Norway',
    dates: '2026 - 2027',
    title: 'International Exchange Program',
    role: '4th-Year Computer Engineering Exchange',
    tag: 'CURRENT LOCATION',
    institution: 'Universitetet i Stavanger (UiS)',
    desc: '4th-year international exchange program at UiS, diving deep into advanced software engineering, distributed systems, and collaborative development in Scandinavia.',
    coords: '58.97° N, 5.73° E',
    period: 'Active Academic Term (Year 4)',
    color: 'cyan',
    positionClass: 'top-[17%] left-[48.5%]',
    labelDirection: 'above',
    svgPos: { x: 485, y: 170 },
  },
};

const NODES_LIST = [MILESTONES.nc, MILESTONES.huelva, MILESTONES.stavanger];

/**
 * TrajectoryMap Component
 * Static Vector World Map with zero hover zoom, conditional milestone panel on hover,
 * and exact geographical marker positions.
 */
export default function TrajectoryMap({
  windowData = { id: 'map', isMaximized: false },
  onMinimize,
  onMaximize,
  onClose,
}) {
  const [hoveredNode, setHoveredNode] = useState('stavanger');

  const activeInfo = MILESTONES[hoveredNode] || MILESTONES.stavanger;

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

  const isMax = windowData?.isMaximized;

  // Exact desktop coordinates from original commit fac825a
  const dynamicCoords = {
    huelva: isMax
      ? { class: 'top-[38%] left-[45.2%]', svg: { x: 452, y: 380 } } // MAX (Intacto)
      : { class: 'top-[34%] left-[45.2%]', svg: { x: 452, y: 340 } }, // MIN (Arriba)
    nc: isMax
      ? { class: 'top-[39.5%] left-[25%]', svg: { x: 250, y: 395 } } // MAX (Micro-ajuste a la izquierda)
      : { class: 'top-[36%] left-[24%]', svg: { x: 240, y: 360 } }, // MIN (INTACTO)
    stavanger: isMax
      ? { class: 'top-[17%] left-[48.5%]', svg: { x: 485, y: 170 } } // MAX (Intacto)
      : { class: 'top-[15.5%] left-[49%]', svg: { x: 490, y: 155 } }, // MIN (Micro-arriba y Micro-derecha)
  };

  // Mobile-specific coordinates with reduced top percentages
  const mobileCoords = {
    huelva: { top: '28.5%', left: '45.2%', svg: { x: 452, y: 285 } },
    nc: { top: '31.5%', left: '25%', svg: { x: 250, y: 315 } },
    stavanger: { top: '14.5%', left: '48.5%', svg: { x: 485, y: 145 } },
  };

  return (
    <div className="flex flex-col h-full overflow-hidden w-full absolute inset-0 bg-os font-mono select-none">
      {/* Top Tactical Bar / Window Titlebar */}
      <div
        className={`window-drag-handle h-9 px-2 sm:px-3 bg-window/90 border-b border-white/10 flex items-center justify-between w-full max-w-full text-xs text-text-main shrink-0 z-20 select-none ${
          windowData?.isMaximized ? 'cursor-default' : 'cursor-default md:cursor-move'
        }`}
        onDoubleClick={() => onMaximize?.(windowData?.id || 'map')}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 text-[11px] pointer-events-none min-w-0 flex-1 mr-2">
          <Globe className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
          <span className="truncate">guest@synth-os : ~/geo $ dotmap --world</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[10px] pointer-events-none shrink-0 mr-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <span className="text-accent-cyan font-semibold tracking-wider">
            GLOBAL VECTOR MAP &bull; 3 NODES MAPPED
          </span>
        </div>

        {/* Right side: Current location & Window Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-max ml-auto">
          <div className="text-[10px] text-text-main/60 hidden lg:block pointer-events-none">
            CURRENT: <span className="text-accent-cyan font-semibold">STAVANGER (UiS)</span>
          </div>

          {/* Window Action Controls */}
          <div
            className="window-controls relative z-30 flex items-center gap-1 pointer-events-auto shrink-0 min-w-max"
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
                onMinimize?.(windowData?.id || 'map');
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
                onMaximize?.(windowData?.id || 'map');
              }}
              className="w-6 h-6 rounded flex items-center justify-center text-text-main hover:bg-white/10 hover:text-slate-100 transition-colors active:scale-95 cursor-pointer touch-manipulation"
              title={windowData?.isMaximized ? 'Restore' : 'Maximize'}
              aria-label={windowData?.isMaximized ? 'Restore' : 'Maximize'}
            >
              {windowData?.isMaximized ? (
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
                onClose?.(windowData?.id || 'map');
              }}
              className="w-6 h-6 rounded flex items-center justify-center text-text-main hover:bg-rose-600 hover:text-white transition-colors active:scale-95 cursor-pointer touch-manipulation"
              title="Close"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 pointer-events-none" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Viewport Container */}
      {isMobile ? (
        /* Mobile: Responsive Image Container with Adjusted Coordinates */
        <div className="flex-1 relative overflow-auto no-scrollbar w-full flex items-center justify-center bg-os p-0">
          <div className="relative w-full max-w-full">
            <img
              src="/world-map.svg"
              alt="World Map"
              className="w-full h-auto block select-none pointer-events-none opacity-85"
              draggable={false}
            />

            <svg
              viewBox="0 0 1000 1000"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="arcHuelvaToNCMobile" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="arcHuelvaToStavangerMobile" x1="0%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.95" />
                </linearGradient>

                <filter id="glowCyanMobile" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00E5FF" floodOpacity="0.75" />
                </filter>
                <filter id="glowPurpleMobile" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#9D4EDD" floodOpacity="0.65" />
                </filter>
                <filter id="glowEmeraldMobile" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#34D399" floodOpacity="0.75" />
                </filter>
              </defs>

              <g stroke="#A9B1D6" strokeOpacity="0.06" strokeWidth="0.75" strokeDasharray="3 3">
                <line x1="0" y1="500" x2="1000" y2="500" strokeOpacity="0.1" />
                <line x1="500" y1="0" x2="500" y2="1000" strokeOpacity="0.1" />
              </g>

              <path
                d={`M ${mobileCoords.huelva.svg.x} ${mobileCoords.huelva.svg.y} Q 350 200 ${mobileCoords.nc.svg.x} ${mobileCoords.nc.svg.y}`}
                fill="none"
                stroke="url(#arcHuelvaToNCMobile)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                filter="url(#glowEmeraldMobile)"
                className="opacity-90"
              />

              <path
                d={`M ${mobileCoords.huelva.svg.x} ${mobileCoords.huelva.svg.y} Q 465 180 ${mobileCoords.stavanger.svg.x} ${mobileCoords.stavanger.svg.y}`}
                fill="none"
                stroke="url(#arcHuelvaToStavangerMobile)"
                strokeWidth="2.8"
                strokeDasharray="6 4"
                filter="url(#glowCyanMobile)"
              />
            </svg>

            {NODES_LIST.map((node) => {
              const coords = mobileCoords[node.id];
              return (
                <div
                  key={node.id}
                  style={{ top: coords.top, left: coords.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode('stavanger')}
                  onClick={() => setHoveredNode(node.id)}
                >
                  <div className="relative flex items-center justify-center cursor-pointer p-2 select-none">
                    {node.id === 'stavanger' && (
                      <>
                        <span className="animate-ping absolute w-8 h-8 rounded-full bg-accent-cyan/40 opacity-75 pointer-events-none" />
                        <span className="w-5 h-5 rounded-full bg-accent-cyan/25 border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_18px_#00E5FF]">
                          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                        </span>
                      </>
                    )}
                    {node.id === 'nc' && (
                      <>
                        <span className="animate-pulse absolute w-6 h-6 rounded-full bg-emerald-400/30 pointer-events-none" />
                        <span className="w-4 h-4 rounded-full bg-emerald-400/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_14px_#34D399]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </span>
                      </>
                    )}
                    {node.id === 'huelva' && (
                      <>
                        <span className="animate-pulse absolute w-6 h-6 rounded-full bg-accent-purple/30 pointer-events-none" />
                        <span className="w-4 h-4 rounded-full bg-accent-purple/20 border-2 border-accent-purple flex items-center justify-center shadow-[0_0_14px_#9D4EDD]">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Desktop: Exact original container and dynamicCoords from fac825a */
        <div
          className="flex-1 relative overflow-hidden w-full bg-no-repeat bg-[length:100%_auto] bg-[position:center_top_10%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/c/c3/World_map_blank_without_borders.svg')] opacity-85"
          style={{
            backgroundSize: '100% auto',
            backgroundPosition: 'center top 10%',
            backgroundImage: `url('/world-map.svg'), url('https://upload.wikimedia.org/wikipedia/commons/c/c3/World_map_blank_without_borders.svg')`,
          }}
        >
          {/* Coordinate Reference Lines & Flight Arcs SVG */}
          <svg
            viewBox="0 0 1000 1000"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="arcHuelvaToNCDesktop" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="arcHuelvaToStavangerDesktop" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.95" />
              </linearGradient>

              <filter id="glowCyanDesktop" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00E5FF" floodOpacity="0.75" />
              </filter>
              <filter id="glowPurpleDesktop" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#9D4EDD" floodOpacity="0.65" />
              </filter>
              <filter id="glowEmeraldDesktop" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#34D399" floodOpacity="0.75" />
              </filter>
            </defs>

            <g stroke="#A9B1D6" strokeOpacity="0.06" strokeWidth="0.75" strokeDasharray="3 3">
              <line x1="0" y1="500" x2="1000" y2="500" strokeOpacity="0.1" />
              <line x1="500" y1="0" x2="500" y2="1000" strokeOpacity="0.1" />
            </g>

            <path
              d={`M ${dynamicCoords.huelva.svg.x} ${dynamicCoords.huelva.svg.y} Q 350 280 ${dynamicCoords.nc.svg.x} ${dynamicCoords.nc.svg.y}`}
              fill="none"
              stroke="url(#arcHuelvaToNCDesktop)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              filter="url(#glowEmeraldDesktop)"
              className="opacity-90"
            />

            <path
              d={`M ${dynamicCoords.huelva.svg.x} ${dynamicCoords.huelva.svg.y} Q 465 270 ${dynamicCoords.stavanger.svg.x} ${dynamicCoords.stavanger.svg.y}`}
              fill="none"
              stroke="url(#arcHuelvaToStavangerDesktop)"
              strokeWidth="2.8"
              strokeDasharray="6 4"
              filter="url(#glowCyanDesktop)"
            />
          </svg>

          {/* Interactive HTML Markers - Pure Static Pulsing Beacons */}
          {NODES_LIST.map((node) => {
            return (
              <div
                key={node.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 ${dynamicCoords[node.id].class}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode('stavanger')}
                onClick={() => setHoveredNode(node.id)}
              >
                <div className="relative flex items-center justify-center cursor-pointer p-2 select-none">
                  {node.id === 'stavanger' && (
                    <>
                      <span className="animate-ping absolute w-8 h-8 rounded-full bg-accent-cyan/40 opacity-75 pointer-events-none" />
                      <span className="w-5 h-5 rounded-full bg-accent-cyan/25 border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_18px_#00E5FF]">
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                      </span>
                    </>
                  )}
                  {node.id === 'nc' && (
                    <>
                      <span className="animate-pulse absolute w-6 h-6 rounded-full bg-emerald-400/30 pointer-events-none" />
                      <span className="w-4 h-4 rounded-full bg-emerald-400/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_14px_#34D399]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </span>
                    </>
                  )}
                  {node.id === 'huelva' && (
                    <>
                      <span className="animate-pulse absolute w-6 h-6 rounded-full bg-accent-purple/30 pointer-events-none" />
                      <span className="w-4 h-4 rounded-full bg-accent-purple/20 border-2 border-accent-purple flex items-center justify-center shadow-[0_0_14px_#9D4EDD]">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Persistent Milestone Detail HUD Panel: shrink-0 mb-0 z-10 anchored to the bottom without scrolling */}
      <div className="shrink-0 mb-0 z-10 w-full p-2.5 sm:p-3 bg-window/95 border-t border-white/10 backdrop-blur-md shadow-2xl flex flex-col gap-1.5 sm:gap-2">
        <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  activeInfo.color === 'cyan'
                    ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/40 shadow-[0_0_8px_rgba(0,229,255,0.3)]'
                    : activeInfo.color === 'emerald'
                    ? 'bg-emerald-400/15 text-emerald-400 border-emerald-400/40 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                    : 'bg-accent-purple/15 text-accent-purple border-accent-purple/40 shadow-[0_0_8px_rgba(157,78,221,0.3)]'
                }`}
              >
                {activeInfo.tag}
              </span>
              <h4 className="font-bold text-slate-100 text-xs sm:text-sm">
                {activeInfo.title}
              </h4>
            </div>

            <p className="text-xs text-slate-300 flex flex-wrap items-center gap-1.5">
              <span
                className={
                  activeInfo.color === 'cyan'
                    ? 'text-accent-cyan font-semibold'
                    : activeInfo.color === 'emerald'
                    ? 'text-emerald-400 font-semibold'
                    : 'text-accent-purple font-semibold'
                }
              >
                {activeInfo.city}, {activeInfo.country}
              </span>
              <span className="text-text-main/40">&bull;</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-200 font-mono text-[11px] font-semibold tracking-wider">
                {activeInfo.dates}
              </span>
              <span className="text-text-main/40">&bull;</span>
              <span>{activeInfo.role}</span>
              {activeInfo.institution && (
                <>
                  <span className="text-text-main/40">&bull;</span>
                  <span className="text-text-main/70">{activeInfo.institution}</span>
                </>
              )}
            </p>

            <p className="text-[10px] sm:text-[11px] text-text-main/80 leading-snug line-clamp-2 sm:line-clamp-none">
              {activeInfo.desc}
            </p>
          </div>

          <div className="text-left sm:text-right text-[10px] text-text-main/60 font-mono shrink-0 hidden sm:block">
            <p className="text-emerald-400 font-semibold">{activeInfo.coords}</p>
            <p className="text-slate-200 font-semibold tracking-wider">{activeInfo.dates}</p>
            <p className="text-slate-400">{activeInfo.period}</p>
          </div>
        </div>

        {/* Global Trajectory Flow Indicator */}
        <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 pt-1.5 border-t border-white/5 text-[10px] font-mono text-text-main/60">
          <div className="flex items-center gap-1 text-slate-400">
            <Navigation className="w-3 h-3 text-accent-purple shrink-0" />
            <span>1. Huelva, Spain (2023 - 2027)</span>
          </div>
          <span className="hidden sm:inline text-white/20">&rarr;</span>
          <div className="flex items-center gap-1 text-slate-400">
            <Briefcase className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>2. North Carolina, USA (Jun 2024 - Sep 2024)</span>
          </div>
          <span className="hidden sm:inline text-white/20">&rarr;</span>
          <div className="flex items-center gap-1 text-accent-cyan font-bold">
            <Sparkles className="w-3 h-3 text-accent-cyan shrink-0" />
            <span>3. Stavanger, Norway (2026 - 2027)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
