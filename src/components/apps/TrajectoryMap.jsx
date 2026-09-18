import { useState } from 'react';
import { Globe, Navigation, Briefcase, Sparkles } from 'lucide-react';

const MILESTONES = {
  huelva: {
    id: 'huelva',
    city: 'Huelva',
    country: 'Spain',
    title: 'BSc Computer Engineering',
    role: 'BSc Computer Engineering',
    tag: 'ORIGIN NODE',
    institution: 'University of Huelva (UHU)',
    desc: 'Foundational computer science degree focusing on core systems programming (C/C++), data structures, Big-O complexity, and database architecture.',
    coords: '37.26° N, 6.94° W',
    period: 'Foundations (Years 1-3)',
    color: 'purple',
    positionClass: 'top-[30%] left-[48%]',
    labelDirection: 'below',
    svgPos: { x: 480, y: 150 },
  },
  nc: {
    id: 'nc',
    city: 'North Carolina',
    country: 'USA',
    title: 'Professional Environment and International Teamwork',
    role: 'Floor Installer and Carpet Specialist',
    tag: 'TRANSATLANTIC NODE',
    institution: '321 Carpet and Flooring',
    desc: 'I worked for three months at 321 Carpet and Flooring as a floor installer and carpet specialist, a company located in North Carolina, United States.',
    coords: '35.76° N, 79.02° W',
    period: 'Summer Work Experience',
    color: 'purple',
    positionClass: 'top-[31%] left-[28%]',
    labelDirection: 'below',
    svgPos: { x: 280, y: 155 },
  },
  stavanger: {
    id: 'stavanger',
    city: 'Stavanger',
    country: 'Norway',
    title: 'International Exchange Program',
    role: '4th-Year Computer Engineering Exchange',
    tag: 'CURRENT LOCATION',
    institution: 'Universitetet i Stavanger (UiS)',
    desc: '4th-year international exchange program at UiS, diving deep into advanced software engineering, distributed systems, and collaborative development in Scandinavia.',
    coords: '58.97° N, 5.73° E',
    period: 'Active Academic Term (Year 4)',
    color: 'cyan',
    positionClass: 'top-[17%] left-[51.6%]',
    labelDirection: 'above',
    svgPos: { x: 516, y: 86 },
  },
};

const NODES_LIST = [MILESTONES.nc, MILESTONES.huelva, MILESTONES.stavanger];

/**
 * TrajectoryMap Component
 * Static Vector World Map with zero hover zoom, conditional milestone panel on hover,
 * and exact geographical marker positions.
 */
export default function TrajectoryMap() {
  const [hoveredNode, setHoveredNode] = useState('stavanger');

  const activeInfo = MILESTONES[hoveredNode] || MILESTONES.stavanger;

  return (
    <div className="h-full w-full flex flex-col bg-os font-mono select-none overflow-hidden relative">
      {/* Top Tactical Bar */}
      <div className="h-9 px-4 bg-window/90 border-b border-white/10 flex items-center justify-between text-xs text-text-main shrink-0 z-20">
        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
          <Globe className="w-3.5 h-3.5 text-accent-cyan" />
          <span>guest@synth-os : ~/geo $ dotmap --world</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <span className="text-accent-cyan font-semibold tracking-wider">
            GLOBAL VECTOR MAP &bull; 3 NODES MAPPED
          </span>
        </div>

        <div className="text-[10px] text-text-main/60 hidden md:block">
          CURRENT LOCATION: <span className="text-accent-cyan">STAVANGER (UiS - YEAR 4)</span>
        </div>
      </div>

      {/* Main Map Viewport Canvas */}
      <div className="flex-1 relative overflow-auto p-3 sm:p-6 flex flex-col justify-between items-center">
        {/* Map Viewport Container - completely static without any zoom/scale effects */}
        <div className="relative w-full max-w-[900px] aspect-[1.8/1] my-auto bg-[#0b0c14] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
          {/* Real Vector World Map Layer */}
          <div
            className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/c/c3/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url('/world-map.svg'), url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg'), url('https://upload.wikimedia.org/wikipedia/commons/c/c3/World_map_blank_without_borders.svg')`,
            }}
            aria-hidden="true"
          />

          {/* Coordinate Reference Lines & Flight Arcs SVG */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full object-contain absolute inset-0 pointer-events-none"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Trajectory Arc Gradient (Purple -> Cyan) */}
              <linearGradient id="arcGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#9D4EDD" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="1" />
              </linearGradient>

              {/* Glowing drop shadows */}
              <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00E5FF" floodOpacity="0.75" />
              </filter>
              <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#9D4EDD" floodOpacity="0.65" />
              </filter>
            </defs>

            {/* Subtle Equirectangular Reference Grid */}
            <g stroke="#A9B1D6" strokeOpacity="0.06" strokeWidth="0.75" strokeDasharray="3 3">
              <line x1="0" y1="250" x2="1000" y2="250" strokeOpacity="0.1" />
              <line x1="500" y1="0" x2="500" y2="500" strokeOpacity="0.1" />
            </g>

            {/* Precision Flight Arcs connecting geographical markers */}
            {/* Arc 1: Huelva (480, 150) -> North Carolina (280, 155) */}
            <path
              d="M 480 150 Q 380 105 280 155"
              fill="none"
              stroke="#9D4EDD"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              filter="url(#glowPurple)"
              className="opacity-90"
            />

            {/* Arc 2: North Carolina (280, 155) -> Stavanger (516, 86) */}
            <path
              d="M 280 155 Q 385 45 516 86"
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="2.8"
              strokeDasharray="6 4"
              filter="url(#glowCyan)"
            />
          </svg>

          {/* Interactive HTML Markers - Pure Pulsing Circles without local labels */}
          {NODES_LIST.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isCurrent = node.id === 'stavanger';

            return (
              <div
                key={node.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 ${node.positionClass}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode('stavanger')}
              >
                {/* Marker Beacon */}
                <div className="relative flex items-center justify-center cursor-pointer p-2">
                  {isCurrent ? (
                    <>
                      <span className="animate-ping absolute w-8 h-8 rounded-full bg-accent-cyan/40 opacity-75" />
                      <span
                        className={`w-5 h-5 rounded-full bg-accent-cyan/25 border-2 border-accent-cyan flex items-center justify-center transition-all duration-200 ${
                          isHovered
                            ? 'shadow-[0_0_24px_#00E5FF] scale-110'
                            : 'shadow-[0_0_16px_#00E5FF]'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="animate-pulse absolute w-6 h-6 rounded-full bg-accent-purple/30" />
                      <span
                        className={`w-4 h-4 rounded-full bg-accent-purple/20 border-2 border-accent-purple flex items-center justify-center transition-all duration-200 ${
                          isHovered
                            ? 'shadow-[0_0_20px_#9D4EDD] scale-110'
                            : 'shadow-[0_0_12px_#9D4EDD]'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Persistent Milestone Detail HUD Panel (defaults to Stavanger, updates on hover) */}
        <div className="w-full max-w-[900px] mt-3 p-3.5 rounded-lg bg-window/95 border border-white/10 backdrop-blur-md z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl transition-all duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  activeInfo.color === 'cyan'
                    ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/40 shadow-[0_0_8px_rgba(0,229,255,0.3)]'
                    : 'bg-accent-purple/15 text-accent-purple border-accent-purple/40'
                }`}
              >
                {activeInfo.tag}
              </span>
              <h4 className="font-bold text-slate-100 text-xs sm:text-sm">
                {activeInfo.title}
              </h4>
            </div>
            <p className="text-xs text-slate-300">
              <span className="text-accent-cyan font-medium">
                {activeInfo.city}, {activeInfo.country}
              </span>{' '}
              &bull; {activeInfo.role}{' '}
              {activeInfo.institution && (
                <>&bull; <span className="text-text-main/70">{activeInfo.institution}</span></>
              )}
            </p>
            <p className="text-[11px] text-text-main/80 leading-snug">
              {activeInfo.desc}
            </p>
          </div>

          <div className="text-left sm:text-right text-[10px] text-text-main/60 font-mono shrink-0">
            <p className="text-emerald-400 font-semibold">{activeInfo.coords}</p>
            <p className="text-slate-400">{activeInfo.period}</p>
          </div>
        </div>

        {/* Global Trajectory Flow Indicator */}
        <div className="w-full max-w-[900px] mt-2 flex items-center justify-between gap-2 px-1 text-[10px] font-mono text-text-main/60">
          <div className="flex items-center gap-1 text-slate-400">
            <Navigation className="w-3 h-3 text-accent-purple" />
            <span>1. Huelva, Spain (BSc Comp. Eng.)</span>
          </div>
          <span className="text-white/20">&rarr;</span>
          <div className="flex items-center gap-1 text-slate-400">
            <Briefcase className="w-3 h-3 text-accent-purple" />
            <span>2. North Carolina, USA (Work Experience)</span>
          </div>
          <span className="text-white/20">&rarr;</span>
          <div className="flex items-center gap-1 text-accent-cyan font-bold">
            <Sparkles className="w-3 h-3 text-accent-cyan" />
            <span>3. Stavanger, Norway (Current Node)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
