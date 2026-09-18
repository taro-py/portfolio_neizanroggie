import { useState } from 'react';
import { Globe, GraduationCap, Briefcase, Sparkles, Navigation } from 'lucide-react';

const NODES = [
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
    // Exact Equirectangular coordinates (viewBox: 1000 x 500)
    svgPos: { x: 480.7, y: 146.5 },
    percentPos: { x: 48.1, y: 29.3 },
    icon: GraduationCap,
  },
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
    svgPos: { x: 280.5, y: 150.7 },
    percentPos: { x: 28.1, y: 30.1 },
    icon: Briefcase,
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
    svgPos: { x: 515.9, y: 86.2 },
    percentPos: { x: 51.6, y: 17.2 },
    icon: Sparkles,
  },
];

/**
 * TrajectoryMap Component
 * High-fidelity World Map SVG visualizing Neizan Roggie's journey (Spain -> USA -> Norway)
 * with minimalist hover tooltips, SVG flight arcs, and high-tech Synth-OS aesthetics.
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
          <span>guest@synth-os : ~/geo $ dotmap --trajectory</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <span className="text-accent-cyan font-semibold tracking-wider">
            GLOBAL PROJECTION &bull; 3 NODES ACTIVE
          </span>
        </div>

        <div className="text-[10px] text-text-main/60 hidden md:block">
          CURRENT: <span className="text-accent-cyan">STAVANGER, NORWAY (58.97° N, 5.73° E)</span>
        </div>
      </div>

      {/* Main Map Viewport Canvas */}
      <div className="flex-1 relative overflow-auto p-3 sm:p-6 flex flex-col justify-between items-center">
        {/* Map Container */}
        <div className="relative w-full max-w-[880px] aspect-[2/1] my-auto bg-[#0b0c14] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
          {/* Coordinate Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#A9B1D6_1px,transparent_1px),linear-gradient(to_bottom,#A9B1D6_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
            aria-hidden="true"
          />

          {/* SVG World Map & Trajectory Arcs */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full object-contain"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Subtle Dot Pattern for Continents */}
              <pattern
                id="worldDotGrid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.1" fill="#A9B1D6" fillOpacity="0.12" />
              </pattern>

              {/* Trajectory Arc Gradient (Purple -> Cyan) */}
              <linearGradient id="arcGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#9D4EDD" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="1" />
              </linearGradient>

              {/* Glowing filters */}
              <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00E5FF" floodOpacity="0.7" />
              </filter>
              <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#9D4EDD" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Latitude & Longitude Reference Meridians */}
            <g stroke="#A9B1D6" strokeOpacity="0.07" strokeDasharray="3 3" strokeWidth="0.75">
              {/* Latitudes */}
              <line x1="0" y1="83" x2="1000" y2="83" />   {/* 60° N */}
              <line x1="0" y1="166" x2="1000" y2="166" /> {/* 30° N */}
              <line x1="0" y1="250" x2="1000" y2="250" strokeOpacity="0.12" /> {/* Equator */}
              <line x1="0" y1="333" x2="1000" y2="333" /> {/* 30° S */}
              <line x1="0" y1="416" x2="1000" y2="416" /> {/* 60° S */}
              {/* Longitudes */}
              <line x1="250" y1="0" x2="250" y2="500" /> {/* 90° W */}
              <line x1="500" y1="0" x2="500" y2="500" strokeOpacity="0.12" /> {/* Prime Meridian */}
              <line x1="750" y1="0" x2="750" y2="500" /> {/* 90° E */}
            </g>

            {/* Realistic Detailed World Continents SVG */}
            <g
              fill="url(#worldDotGrid)"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeDasharray="2.5 2"
              className="text-text-main/30"
            >
              {/* North America (Alaska, Canada, USA, Mexico, Central America) */}
              <path
                d="M 68 76 L 85 64 L 115 58 L 138 56 L 160 52 L 185 62 L 208 52 L 232 58 L 246 72 L 235 84 L 212 80 L 216 102 L 238 110 L 258 92 L 274 100 L 286 116 L 278 134 L 282 152 L 285 174 L 274 178 L 262 168 L 250 176 L 236 172 L 214 196 L 202 188 L 196 210 L 206 222 L 232 226 L 246 238 L 242 246 L 224 240 L 206 234 L 186 208 L 182 174 L 174 144 L 154 124 L 136 114 L 112 98 L 88 92 L 68 84 Z"
              />
              {/* Alaska Peninsulas & Aleutians */}
              <path d="M 68 76 L 50 85 L 36 92 L 48 95 L 64 88 Z" />

              {/* Greenland */}
              <path
                d="M 342 32 L 372 26 L 400 38 L 396 68 L 364 74 L 338 54 Z"
              />

              {/* Caribbean Islands */}
              <circle cx="288" cy="208" r="3" />
              <circle cx="304" cy="214" r="2.5" />

              {/* South America */}
              <path
                d="M 248 244 L 278 232 L 305 236 L 336 252 L 358 272 L 354 302 L 338 334 L 318 372 L 288 412 L 274 442 L 262 444 L 258 418 L 264 374 L 254 318 L 244 274 L 240 248 Z"
              />
              {/* Falkland Islands */}
              <circle cx="295" cy="435" r="2" />

              {/* Europe & Mediterranean */}
              {/* Iberian Peninsula (Spain & Portugal with Huelva at ~481, 146) */}
              <path
                d="M 466 142 L 484 140 L 496 145 L 498 160 L 482 163 L 470 158 L 468 146 Z"
              />
              {/* France & Western/Central Europe */}
              <path
                d="M 484 138 L 500 130 L 516 128 L 512 114 L 492 118 L 482 134 Z"
              />
              {/* British Isles (Ireland & Great Britain) */}
              <path d="M 464 102 L 474 98 L 472 112 L 462 114 Z" />
              <path d="M 478 90 L 490 84 L 488 110 L 476 114 Z" />
              {/* Scandinavia (Norway with Stavanger at ~516, 86, Sweden, Finland) */}
              <path
                d="M 504 54 L 530 48 L 546 64 L 542 86 L 522 96 L 514 86 L 508 68 Z"
              />
              {/* Denmark */}
              <path d="M 508 92 L 514 90 L 512 98 L 506 96 Z" />
              {/* Italy & Sicily */}
              <path d="M 510 138 L 524 138 L 532 158 L 522 164 L 514 150 Z" />
              <circle cx="524" cy="170" r="2.5" />
              {/* Eastern Europe & Balkans */}
              <path
                d="M 524 130 L 560 124 L 586 138 L 556 160 L 534 156 Z"
              />
              {/* Greece & Crete */}
              <path d="M 542 160 L 552 162 L 548 172 L 538 168 Z" />
              <circle cx="548" cy="176" r="2" />

              {/* Africa */}
              <path
                d="M 464 166 L 510 162 L 550 168 L 566 178 L 576 196 L 590 226 L 570 262 L 546 322 L 516 372 L 496 366 L 476 322 L 460 262 L 438 230 L 434 206 L 450 186 Z"
              />
              {/* Madagascar */}
              <path d="M 578 320 L 590 326 L 584 360 L 574 350 Z" />

              {/* Asia & Middle East */}
              {/* Arabian Peninsula */}
              <path d="M 560 182 L 590 184 L 606 210 L 586 236 L 564 216 Z" />
              {/* Indian Subcontinent */}
              <path d="M 626 186 L 656 186 L 666 220 L 650 252 L 634 220 L 620 196 Z" />
              <circle cx="654" cy="260" r="2.5" /> {/* Sri Lanka */}
              {/* Central Asia, Siberia & Russian Far East */}
              <path
                d="M 560 114 L 650 98 L 750 84 L 850 78 L 892 94 L 862 124 L 822 138 L 762 144 L 682 150 L 602 160 L 560 144 Z"
              />
              {/* China & East Asia Coast */}
              <path
                d="M 700 160 L 762 160 L 786 180 L 772 216 L 726 220 L 702 196 Z"
              />
              {/* Korean Peninsula */}
              <path d="M 788 168 L 798 170 L 794 186 L 786 182 Z" />
              {/* Japanese Archipelago */}
              <path d="M 816 144 L 836 150 L 826 176 L 812 170 Z" />
              <circle cx="832" cy="136" r="3" /> {/* Hokkaido */}
              {/* Southeast Asia (Indochina & Malay Peninsula) */}
              <path d="M 714 216 L 740 220 L 736 256 L 710 240 Z" />
              {/* Maritime Southeast Asia (Indonesia & Philippines) */}
              <path d="M 720 270 L 756 274 L 782 280 L 802 270 L 792 286 L 742 286 Z" />
              <circle cx="774" cy="242" r="3.5" />
              <circle cx="782" cy="254" r="3" />
              <circle cx="832" cy="274" r="5" /> {/* New Guinea */}

              {/* Australia & Oceania */}
              <path
                d="M 748 316 L 790 300 L 822 316 L 836 346 L 822 382 L 782 386 L 746 366 L 740 336 Z"
              />
              {/* Tasmania */}
              <path d="M 800 396 L 812 396 L 808 406 L 798 404 Z" />
              {/* New Zealand (North & South Islands) */}
              <path d="M 876 376 L 892 386 L 872 422 L 860 412 Z" />
            </g>

            {/* Flight Trajectory Vector Arcs */}
            {/* Arc 1: Huelva (Spain: 480.7, 146.5) -> North Carolina (USA: 280.5, 150.7) */}
            <path
              d="M 480.7 146.5 Q 380 95 280.5 150.7"
              fill="none"
              stroke="#9D4EDD"
              strokeWidth="2.5"
              strokeDasharray="5 4"
              filter="url(#glowPurple)"
              className="opacity-90"
            />

            {/* Arc 2: North Carolina (USA: 280.5, 150.7) -> Stavanger (Norway: 515.9, 86.2) */}
            <path
              d="M 280.5 150.7 Q 390 35 515.9 86.2"
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="2.8"
              strokeDasharray="6 4"
              filter="url(#glowCyan)"
            />
          </svg>

          {/* Interactive Geographic Marker Nodes & Minimalist Tooltips */}
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
                {/* Marker Beacon */}
                <div className="relative flex items-center justify-center cursor-pointer p-2 group">
                  {isCurrent ? (
                    <>
                      <span className="animate-ping absolute w-7 h-7 rounded-full bg-accent-cyan/40 opacity-75" />
                      <span className="w-5 h-5 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_15px_#00E5FF]">
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="animate-pulse absolute w-5 h-5 rounded-full bg-accent-purple/30" />
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

                {/* Minimalist Hover Tooltip: Compact badge with Place Name & Coordinates */}
                {isHovered && (
                  <div
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0a0b12]/95 border backdrop-blur-md shadow-xl z-50 whitespace-nowrap pointer-events-none flex items-center gap-1.5 text-[10px] font-mono animate-in fade-in zoom-in-95 duration-100 ${
                      isCurrent
                        ? 'border-accent-cyan text-accent-cyan shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                        : 'border-accent-purple text-slate-200 shadow-[0_0_12px_rgba(157,78,221,0.3)]'
                    }`}
                  >
                    <span className="font-semibold text-slate-100">{node.city}</span>
                    <span className="text-text-main/70">[{node.coords}]</span>
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
