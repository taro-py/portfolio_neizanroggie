import { useState } from 'react';
import { Globe, MapPin, GraduationCap, Briefcase, Sparkles, Navigation } from 'lucide-react';

const NODES = [
  {
    id: 'huelva',
    city: 'Huelva',
    country: 'Spain',
    role: 'BSc Software Engineering',
    tag: 'ORIGIN NODE',
    institution: 'University of Huelva (UHU)',
    desc: 'Foundational computer science degree focusing on core systems programming (C/C++), data structures, Big-O complexity, and database architecture.',
    coords: '37.26° N, 6.94° W',
    period: 'Foundations (Years 1-3)',
    status: 'COMPLETED',
    isCurrent: false,
    color: 'purple',
    // SVG viewBox coordinates (1000 x 500)
    svgPos: { x: 481, y: 156 },
    // Normalized percentages for responsive HTML overlay
    percentPos: { x: 48.1, y: 31.2 },
    icon: GraduationCap,
  },
  {
    id: 'usa',
    city: 'North Carolina',
    country: 'USA',
    role: 'International Work Experience',
    tag: 'TRANSATLANTIC NODE',
    institution: 'Professional & Cultural Immersion',
    desc: 'Hands-on international professional experience in the United States, cultivating cross-cultural team collaboration, product agility, and systems administration.',
    coords: '35.76° N, 79.02° W',
    period: 'International Exchange',
    status: 'COMPLETED',
    isCurrent: false,
    color: 'purple',
    svgPos: { x: 275, y: 165 },
    percentPos: { x: 27.5, y: 33.0 },
    icon: Briefcase,
  },
  {
    id: 'stavanger',
    city: 'Stavanger',
    country: 'Norway',
    role: 'Exchange Program / 4th Year',
    tag: 'CURRENT LOCATION',
    institution: 'Universitetet i Stavanger (UiS)',
    desc: '4th-year international exchange program at UiS, diving deep into advanced software engineering, distributed systems, and collaborative development in Scandinavia.',
    coords: '58.97° N, 5.73° E',
    period: 'Active Academic Term (Year 4)',
    status: 'ACTIVE NOW',
    isCurrent: true,
    color: 'cyan',
    svgPos: { x: 516, y: 92 },
    percentPos: { x: 51.6, y: 18.4 },
    icon: Sparkles,
  },
];

/**
 * TrajectoryMap Component
 * World Dot Map visualizing Neizan Roggie's international journey (Spain -> USA -> Norway)
 * with interactive hover tooltips, SVG flight arcs, and high-tech Synth-OS aesthetics.
 */
export default function TrajectoryMap() {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState('stavanger');

  const activeNode = NODES.find((n) => n.id === (hoveredNodeId || selectedNodeId)) || NODES[2];

  return (
    <div className="h-full w-full flex flex-col bg-os font-mono select-none overflow-hidden relative">
      {/* Top Tactical Bar */}
      <div className="h-9 px-4 bg-window/85 border-b border-white/10 flex items-center justify-between text-xs text-text-main shrink-0 z-20">
        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
          <Globe className="w-3.5 h-3.5 text-accent-cyan" />
          <span>neizan@os : ~/geo $ dotmap --trajectory</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <span className="text-accent-cyan font-semibold tracking-wider">
            WORLD PROJECTION &bull; 3 NODES MAPPED
          </span>
        </div>

        <div className="text-[10px] text-text-main/60 hidden md:block">
          TARGET: <span className="text-accent-cyan">STAVANGER (58.97° N, 5.73° E)</span>
        </div>
      </div>

      {/* Main Dot Map Canvas */}
      <div className="flex-1 relative overflow-auto p-3 sm:p-6 flex flex-col justify-between items-center">
        {/* Map Viewport Container */}
        <div className="relative w-full max-w-[880px] aspect-[2/1] my-auto bg-[#0b0c14] rounded-lg border border-white/5 overflow-hidden shadow-2xl">
          {/* Subtle Grid Coordinates Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,#A9B1D6_1px,transparent_1px),linear-gradient(to_bottom,#A9B1D6_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
            aria-hidden="true"
          />

          {/* SVG World Dot Map & Trajectory Arcs */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full object-contain"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Dot Pattern for Continents */}
              <pattern
                id="worldDotGrid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.1" fill="#A9B1D6" fillOpacity="0.18" />
              </pattern>

              {/* Trajectory Arc Gradient (Purple -> Cyan) */}
              <linearGradient id="arcGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#9D4EDD" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="1" />
              </linearGradient>

              {/* Glowing filters for paths */}
              <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00E5FF" floodOpacity="0.6" />
              </filter>
              <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#9D4EDD" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* World Continents Silhouette Outlines (Filled with Dot Matrix) */}
            <g fill="url(#worldDotGrid)" stroke="#A9B1D6" strokeOpacity="0.15" strokeWidth="0.75">
              {/* North America */}
              <path d="M 120 70 Q 220 50 280 80 Q 320 120 300 180 Q 260 210 210 200 Q 180 250 140 220 Q 100 170 80 130 Z" />
              {/* Greenland */}
              <path d="M 330 40 Q 400 30 420 60 Q 390 100 350 90 Z" />
              {/* South America */}
              <path d="M 270 230 Q 340 250 350 310 Q 320 400 270 420 Q 240 330 250 260 Z" />
              {/* Europe & British Isles */}
              <path d="M 440 90 Q 490 70 540 90 Q 560 140 500 170 Q 450 160 440 120 Z" />
              <circle cx="455" cy="110" r="10" />
              {/* Scandinavia */}
              <path d="M 490 50 Q 530 40 540 80 Q 520 120 495 100 Z" />
              {/* Africa */}
              <path d="M 460 170 Q 550 180 570 260 Q 530 360 480 340 Q 440 250 450 190 Z" />
              {/* Asia */}
              <path d="M 550 80 Q 720 60 840 100 Q 880 180 820 250 Q 700 230 620 180 Q 560 140 550 90 Z" />
              {/* Japan */}
              <path d="M 850 130 Q 870 150 860 190 Z" />
              {/* Australia */}
              <path d="M 750 300 Q 850 290 870 350 Q 820 410 760 380 Q 730 340 750 300 Z" />
            </g>

            {/* Subtle Latitude Lines */}
            <line x1="0" y1="125" x2="1000" y2="125" stroke="#A9B1D6" strokeOpacity="0.05" strokeDasharray="3 3" />
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#A9B1D6" strokeOpacity="0.08" strokeDasharray="4 4" />
            <line x1="0" y1="375" x2="1000" y2="375" stroke="#A9B1D6" strokeOpacity="0.05" strokeDasharray="3 3" />

            {/* Curving Trajectory Arcs */}
            {/* Arc 1: Huelva (Spain) -> North Carolina (USA) */}
            <path
              d="M 481 156 Q 370 100 275 165"
              fill="none"
              stroke="#9D4EDD"
              strokeWidth="2.5"
              strokeDasharray="5 4"
              filter="url(#glowPurple)"
              className="opacity-80"
            />

            {/* Arc 2: North Carolina (USA) -> Stavanger (Norway) */}
            <path
              d="M 275 165 Q 385 45 516 92"
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="2.8"
              strokeDasharray="6 4"
              filter="url(#glowCyan)"
            />
          </svg>

          {/* Interactive HTML Markers & Tooltips Overlay */}
          {NODES.map((node) => {
            const isHovered = hoveredNodeId === node.id;
            const isSelected = selectedNodeId === node.id;
            const isCurrent = node.isCurrent;

            return (
              <div
                key={node.id}
                style={{
                  left: `${node.percentPos.x}%`,
                  top: `${node.percentPos.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => setSelectedNodeId(node.id)}
              >
                {/* Marker Pin Beacon */}
                <div className="relative flex items-center justify-center cursor-pointer p-2 group">
                  {isCurrent ? (
                    <>
                      <span className="animate-ping absolute w-8 h-8 rounded-full bg-accent-cyan/40 opacity-75" />
                      <span className="w-5 h-5 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_15px_#00E5FF]">
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="animate-pulse absolute w-6 h-6 rounded-full bg-accent-purple/30" />
                      <span className="w-4 h-4 rounded-full bg-accent-purple/20 border-2 border-accent-purple flex items-center justify-center shadow-[0_0_10px_#9D4EDD]">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                      </span>
                    </>
                  )}

                  {/* Pin label (compact) */}
                  <span
                    className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono px-1.5 py-0.5 rounded border transition-all ${
                      isCurrent
                        ? 'bg-black/90 border-accent-cyan text-accent-cyan font-bold shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                        : isSelected
                        ? 'bg-black/90 border-accent-purple text-slate-100'
                        : 'bg-black/70 border-white/10 text-text-main/70 group-hover:text-slate-200'
                    }`}
                  >
                    {node.city}
                  </span>
                </div>

                {/* Dark Card Hover Tooltip */}
                {isHovered && (
                  <div
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-64 p-3 rounded-lg bg-[#0d0e17]/95 border backdrop-blur-md shadow-2xl z-40 transition-all animate-in fade-in zoom-in-95 duration-150 pointer-events-none ${
                      isCurrent
                        ? 'border-accent-cyan/60 shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                        : 'border-accent-purple/60 shadow-[0_0_20px_rgba(157,78,221,0.2)]'
                    }`}
                  >
                    {/* Tooltip Header */}
                    <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10 mb-2">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                          isCurrent
                            ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/40'
                            : 'bg-accent-purple/15 text-accent-purple border-accent-purple/40'
                        }`}
                      >
                        {node.tag}
                      </span>
                      <span className="text-[10px] text-text-main/60">{node.coords}</span>
                    </div>

                    {/* Tooltip Title */}
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className={`w-3.5 h-3.5 ${isCurrent ? 'text-accent-cyan' : 'text-accent-purple'}`} />
                      <h4 className="font-bold text-slate-100 text-xs">
                        {node.city}, {node.country}
                      </h4>
                    </div>

                    {/* Tooltip Subtitle */}
                    <p className="text-[11px] text-slate-300 font-semibold mb-1">
                      {node.role}
                    </p>

                    {/* Tooltip Description */}
                    <p className="text-[10px] text-text-main/80 leading-relaxed">
                      {node.desc}
                    </p>

                    {/* Arrow down pointer */}
                    <div
                      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#0d0e17] border-r border-b ${
                        isCurrent ? 'border-accent-cyan/60' : 'border-accent-purple/60'
                      }`}
                    />
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
                {activeNode.city}, {activeNode.country}
              </h4>
            </div>
            <p className="text-xs text-slate-300">
              {activeNode.role} &bull; <span className="text-text-main/70">{activeNode.institution}</span>
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
            <span>1. Huelva, Spain (Origin)</span>
          </div>
          <span className="text-white/20">&rarr;</span>
          <div className="flex items-center gap-1 text-slate-400">
            <Briefcase className="w-3 h-3 text-accent-purple" />
            <span>2. North Carolina, USA (Immersion)</span>
          </div>
          <span className="text-white/20">&rarr;</span>
          <div className="flex items-center gap-1 text-accent-cyan font-bold">
            <Sparkles className="w-3 h-3 text-accent-cyan" />
            <span>3. Stavanger, Norway (Current)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
