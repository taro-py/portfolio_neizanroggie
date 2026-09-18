import { Folder, ExternalLink, HardDrive } from 'lucide-react';

/**
 * GitHub Brand SVG Icon
 */
function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

const PROJECTS = [
  {
    id: 'app-phone-company',
    title: 'APP phone company',
    desc: 'Object-Oriented Programming and robust systems logic implementation for mobile telecommunication customer and billing management.',
    stack: ['C++', 'OOP', 'Backend'],
    githubUrl: 'https://github.com/taro-py/Practica2_MP',
    status: 'SYSTEMS',
  },
  {
    id: 'alpha-beta-tictactoe',
    title: 'Alpha Beta implementation tic tac toe',
    desc: 'Adversarial search AI engine implementing the Minimax algorithm with Alpha-Beta pruning for optimal game-tree evaluation.',
    stack: ['AI', 'Algorithms', 'MinMax'],
    githubUrl: 'https://github.com/taro-py/MinMax-Poda-Alfa-Beta',
    status: 'AI AGENTS',
  },
  {
    id: 'greedy-algorithms-tournament',
    title: 'Greedy algorithms implementation for bar tournament',
    desc: 'Algorithmic optimization solving bracket pairing, resource allocation, and tournament match scheduling using greedy heuristics.',
    stack: ['Algorithms', 'Data Structures', 'Logic'],
    githubUrl: 'https://github.com/taro-py/Algoritmos-Voraces',
    status: 'OPTIMIZATION',
  },
  {
    id: 'numerical-modeling-python',
    title: 'Numerical-Modeling-on-Python',
    desc: 'Computational simulations and numerical methods for differential equations, complex data modeling, and mathematical analysis.',
    stack: ['Python', 'Math Modeling', 'Data'],
    githubUrl: 'https://github.com/taro-py/Numerical-Modeling-on-Python',
    status: 'DATA & MATH',
  },
];

/**
 * ProjectsExplorer Component
 * Interactive directory browser showcasing featured projects in a responsive grid.
 */
export default function ProjectsExplorer() {
  return (
    <div className="h-full w-full flex flex-col bg-os font-mono select-none overflow-hidden">
      {/* Directory Address Bar */}
      <div className="h-9 px-4 bg-window/80 border-b border-white/5 flex items-center justify-between text-xs text-text-main shrink-0">
        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
          <HardDrive className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Location: <span className="text-accent-cyan">~/projects/</span></span>
        </div>
        <div className="text-[10px] text-text-main/60">
          <span>{PROJECTS.length} repositories mounted</span>
        </div>
      </div>

      {/* Projects Grid Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-lg bg-os border border-accent-purple/30 hover:border-accent-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              {/* Card Header: Title & Folder Icon */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-white/[0.04] border border-white/10 text-accent-cyan group-hover:scale-105 transition-transform">
                      <Folder className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-accent-cyan transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-accent-purple/15 text-accent-purple border border-accent-purple/30 shrink-0">
                    {project.status}
                  </span>
                </div>

                {/* Card Description */}
                <p className="text-xs sm:text-[13px] text-text-main/80 leading-relaxed pl-0.5">
                  {project.desc}
                </p>
              </div>

              {/* Card Footer: Tech Stack Badges & GitHub Link */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/10 text-text-main group-hover:border-accent-cyan/20 group-hover:text-slate-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Source Link Button */}
                <div className="flex justify-end pt-1">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 hover:border-accent-cyan/50 hover:bg-accent-cyan/10 hover:text-accent-cyan text-slate-200 text-xs font-mono font-medium transition-all group/btn cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Source</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
