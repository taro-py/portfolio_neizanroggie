import { useState } from 'react';
import { Globe, GraduationCap, Briefcase, Sparkles, Navigation } from 'lucide-react';

const NODES = [
  {
    id: 'usa',
    city: 'North Carolina',
    country: 'USA',
    title: 'Professional Environment and International Teamwork',
    role: 'Floor Installer and Carpet Specialist',
    tag: 'TRANSATLANTIC NODE',
    institution: '321 Carpet and Flooring',
    desc: 'I worked for three months at 321 Carpet and Flooring as a floor installer and carpet specialist, a company located in North Carolina, United States.',
    coords: '35.76° N, 79.02° W',
    period: 'Summer Work Experience',
    status: 'COMPLETED',
    isCurrent: false,
    color: 'purple',
    // Hardcoded absolute position: top-[45%] left-[20%]
    positionClass: 'top-[45%] left-[20%]',
    labelPosition: 'below', // Centered below
    // Exact SVG coordinate in viewBox 0 0 1000 500 (20% of 1000 = 200, 45% of 500 = 225)
    svgPos: { x: 200, y: 225 },
    icon: Briefcase,
  },
  {
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
    status: 'COMPLETED',
    isCurrent: false,
    color: 'purple',
    // Hardcoded absolute position: top-[70%] left-[55%]
    positionClass: 'top-[70%] left-[55%]',
    labelPosition: 'below', // Under its point with mt
    // Exact SVG coordinate in viewBox 0 0 1000 500 (55% of 1000 = 550, 70% of 500 = 350)
    svgPos: { x: 550, y: 350 },
    icon: GraduationCap,
  },
  {
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
    status: 'ACTIVE NOW',
    isCurrent: true,
    color: 'cyan',
    // Hardcoded absolute position: top-[20%] left-[65%]`
    positionClass: 'top-[20%] left-[65%]',
    labelPosition: 'above', // Above its point with negative mt
    // Exact SVG coordinate in viewBox 0 0 1000 500 (65% of 1000 = 650, 20% of 500 = 100)
    svgPos: { x: 650, y: 100 },
    icon: Sparkles,
  },
];

/**
 * TrajectoryMap Component
 * Abstract tactical dot-matrix canvas with hardcoded node separation
 * (NC: 20%, 45% | Huelva: 55%, 70% | Stavanger: 65%, 20%)
 * guaranteed zero label overlapping, precision curved flight arcs, and high-tech Synth-OS styling.
 */
export default function TrajectoryMap() {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState('stavanger');

  const activeNode = NODES.find((n) => n.id === (hoveredNodeId || selectedNodeId)) || NODES[2];

  return (
    <div className="h-full w-full flex flex-col bg-os font-mono select-none overflow-hidden relative">
      {/* Top Tactical Bar */}
      <div className="h-9 px-4 bg-window/90 border-b border-white/10 flex items-center justify-between text-xs text-text-main shrink-0 z-20">
        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
          <Globe className="w-3.5 h-3.5 text-accent-cyan" />
          <span>guest@synth-os : ~/geo $ dotmap --mesh</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <span className="text-accent-cyan font-semibold tracking-wider">
            NODAL SEPARATION // 3 ZONES ACTIVE
          </span>
        </div>

        <div className="text-[10px] text-text-main/60 hidden md:block">
          LOCATION: <span className="text-accent-cyan">STAVANGER (UiS - YEAR 4)</span>
        </div>
      </div>

      {/* Main Map Viewport Canvas */}
      <div className="flex-1 relative overflow-auto p-3 sm:p-6 flex flex-col justify-between items-center">
        {/* Map Container */}
        <div className="relative w-full max-w-[880px] aspect-[2/1] my-auto bg-[#0b0c14] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
          {/* Abstract Cyber Dot-Matrix Grid */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full object-contain"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Ultra-subtle abstract dot-matrix pattern */}
              <pattern
                id="abstractDots"
                width="25"
                height="25"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.1" fill="#A9B1D6" fillOpacity="0.10" />
              </pattern>

              {/* Trajectory Arc Gradient (Purple -> Cyan) */}
              <linearGradient id="arcGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#9D4EDD" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="1" />
              </linearGradient>

              {/* Glow filters */}
              <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00E5FF" floodOpacity="0.75" />
              </filter>
              <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#9D4EDD" floodOpacity="0.65" />
              </filter>
            </defs>

            {/* Background Pattern Fill */}
            <rect width="1000" height="500" fill="url(#abstractDots)" />

            {/* Subtle Tactical Coordinate Crosshairs and Gridlines */}
            <g stroke="#A9B1D6" strokeOpacity="0.06" strokeWidth="0.75" strokeDasharray="4 4">
              <line x1="0" y1="125" x2="1000" y2="125" />
              <line x1="0" y1="250" x2="1000" y2="250" strokeOpacity="0.1" />
              <line x1="0" y1="375" x2="1000" y2="375" />
              <line x1="250" y1="0" x2="250" y2="500" />
              <line x1="500" y1="0" x2="500" y2="500" strokeOpacity="0.1" />
              <line x1="750" y1="0" x2="750" y2="500" />
            </g>

            {/* Decorative Tactical Radar Crosshairs behind Stavanger (Current Node: 650, 100) */}
            <g stroke="#00E5FF" strokeOpacity="0.15" fill="none" strokeWidth="0.75">
              <circle cx="650" cy="100" r="35" strokeDasharray="3 3" />
              <circle cx="650" cy="100" r="60" strokeDasharray="2 4" />
            </g>

            {/* Precision Flight Arcs connecting hardcoded coordinates */}
            {/* Arc 1: Huelva (550, 350) -> North Carolina (200, 225) */}
            <path
              d="M 550 350 Q 360 340 200 225"
              fill="none"
              stroke="#9D4EDD"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              filter="url(#glowPurple)"
              className="opacity-90"
            />

            {/* Arc 2: North Carolina (200, 225) -> Stavanger (650, 100) */}
            <path
              d="M 200 225 Q 400 70 650 100"
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="2.8"
              strokeDasharray="6 4"
              filter="url(#glowCyan)"
            />
          </svg>

          {/* Hardcoded Interactive HTML Markers & Anti-Overlap Labels */}
          {NODES.map((node) => {
            const isHovered = hoveredNodeId === node.id;
            const isSelected = selectedNodeId === node.id;
            const isCurrent = node.isCurrent;

            return (
              <div
                key={node.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 ${node.positionClass}`}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => setSelectedNodeId(node.id)}
              >
                {/* Marker Pin Beacon */}
                <div className="relative flex items-center justify-center cursor-pointer p-2 group">
                  {isCurrent ? (
                    <>
                      <span className="animate-ping absolute w-8 h-8 rounded-full bg-accent-cyan/40 opacity-75" />
                      <span className="w-5 h-5 rounded-full bg-accent-cyan/25 border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_18px_#00E5FF]">
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="animate-pulse absolute w-6 h-6 rounded-full bg-accent-purple/30" />
                      <span className="w-4 h-4 rounded-full bg-accent-purple/20 border-2 border-accent-purple flex items-center justify-center shadow-[0_0_12px_#9D4EDD]">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                      </span>
                    </>
                  )}
                </div>

                {/* Permanent Directional Label (Fixed Badge, Zero Overlap) */}
                {node.labelPosition === 'above' ? (
                  /* Stavanger: Label positioned ABOVE with negative margin (-mt-12) */
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 -mt-12 flex flex-col items-center pointer-events-none select-none">
                    <div
                      className={`px-2.5 py-1 rounded-md border backdrop-blur-md shadow-xl text-center whitespace-nowrap transition-all duration-200 ${
                        isSelected || isHovered
                          ? 'bg-[#0d0e17] border-accent-cyan text-accent-cyan shadow-[0_0_16px_rgba(0,229,255,0.4)] scale-105'
                          : 'bg-[#0d0e17]/90 border-accent-cyan/50 text-slate-200'
                      }`}
                    >
                      <p className="font-bold text-[11px] sm:text-xs text-accent-cyan flex items-center justify-center gap-1.5">
                        <span>{node.city}</span>
                        <span className="text-[10px] text-slate-300 font-normal">[{node.coords}]</span>
                      </p>
                      <p className="text-[10px] text-slate-300 font-mono">Current Location &bull; UiS (Year 4)</p>
                    </div>
                    {/* Tiny connector tick pointing down to marker */}
                    <div className="w-0.5 h-2 bg-accent-cyan/40" />
                  </div>
                ) : node.id === 'huelva' ? (
                  /* Huelva: Label positioned BELOW with top margin (mt-10) */
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 flex flex-col items-center pointer-events-none select-none">
                    {/* Tiny connector tick pointing up to marker */}
                    <div className="w-0.5 h-2 bg-accent-purple/40" />
                    <div
                      className={`px-2.5 py-1 rounded-md border backdrop-blur-md shadow-xl text-center whitespace-nowrap transition-all duration-200 ${
                        isSelected || isHovered
                          ? 'bg-[#0d0e17] border-accent-purple text-slate-100 shadow-[0_0_16px_rgba(157,78,221,0.4)] scale-105'
                          : 'bg-[#0d0e17]/90 border-white/15 text-slate-300'
                      }`}
                    >
                      <p className="font-bold text-[11px] sm:text-xs text-slate-100 flex items-center justify-center gap-1.5">
                        <span>{node.city}</span>
                        <span className="text-[10px] text-text-main/70 font-normal">[{node.coords}]</span>
                      </p>
                      <p className="text-[10px] text-accent-purple font-mono">BSc Computer Engineering</p>
                    </div>
                  </div>
                ) : (
                  /* North Carolina: Label positioned CENTERED BELOW with margin */
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 flex flex-col items-center pointer-events-none select-none">
                    {/* Tiny connector tick pointing up to marker */}
                    <div className="w-0.5 h-2 bg-accent-purple/40" />
                    <div
                      className={`px-2.5 py-1 rounded-md border backdrop-blur-md shadow-xl text-center whitespace-nowrap transition-all duration-200 ${
                        isSelected || isHovered
                          ? 'bg-[#0d0e17] border-accent-purple text-slate-100 shadow-[0_0_16px_rgba(157,78,221,0.4)] scale-105'
                          : 'bg-[#0d0e17]/90 border-white/15 text-slate-300'
                      }`}
                    >
                      <p className="font-bold text-[11px] sm:text-xs text-slate-100 flex items-center justify-center gap-1.5">
                        <span>{node.city}</span>
                        <span className="text-[10px] text-text-main/70 font-normal">[{node.coords}]</span>
                      </p>
                      <p className="text-[10px] text-accent-purple font-mono">321 Carpet &amp; Flooring</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Milestone Detail Card (Bottom HUD) */}
        <div className="w-full max-w-[880px] mt-3 p-3.5 rounded-lg bg-window/90 border border-white/10 backdrop-blur-md z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  activeNode.isCurrent
                    ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/40 shadow-[0_0_8px_rgba(0,229,255,0.3)]'
                    : 'bg-accent-purple/15 text-accent-purple border-accent-purple/40'
                }`}
              >
                {activeNode.tag}
              </span>
              <h4 className="font-bold text-slate-100 text-xs sm:text-sm">
                {activeNode.title}
              </h4>
            </div>
            <p className="text-xs text-slate-300">
              <span className="text-accent-cyan font-medium">
                {activeNode.city}, {activeNode.country}
              </span>{' '}
              &bull; {activeNode.role}{' '}
              {activeNode.institution && (
                <>&bull; <span className="text-text-main/70">{activeNode.institution}</span></>
              )}
            </p>
            <p className="text-[11px] text-text-main/80 leading-snug">
              {activeNode.desc}
            </p>
          </div>

          <div className="text-left sm:text-right text-[10px] text-text-main/60 font-mono shrink-0">
            <p className="text-emerald-400 font-semibold">{activeNode.coords}</p>
            <p className="text-slate-400">{activeNode.period}</p>
          </div>
        </div>

        {/* Global Trajectory Flow Indicator */}
        <div className="w-full max-w-[880px] mt-2 flex items-center justify-between gap-2 px-1 text-[10px] font-mono text-text-main/60">
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
