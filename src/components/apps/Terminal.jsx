import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const BOOT_LOGS = [
  { text: 'SYNTH_OS KERNEL [v2.0.1-PROD.x86_64]', delay: 200, color: 'text-text-main' },
  { text: 'Copyright (C) 2026 Neizan Roggie. All rights reserved.', delay: 400, color: 'text-text-main/70' },
  { text: '[  OK  ] Initializing CPU microcode & quantum memory...', delay: 700, color: 'text-emerald-400' },
  { text: '[  OK  ] Mounting virtual drive /dev/portfolio_fs...', delay: 1000, color: 'text-emerald-400' },
  { text: '[  OK  ] Loading developer credentials: Neizan Roggie...', delay: 1300, color: 'text-emerald-400' },
  { text: '[  OK  ] Network established: Spain ↔ USA ↔ Norway nodes.', delay: 1600, color: 'text-accent-cyan' },
  { text: '[ EXEC ] Scanning developer competencies (skills-audit.sh)...', delay: 1900, color: 'text-accent-purple' },
];

const SKILLS = [
  {
    name: 'C / C++',
    desc: 'Core Logic, Data Structures, OOP, Memory Management.',
    tag: 'SYSTEMS',
    accent: 'text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10',
  },
  {
    name: 'Python & AI',
    desc: 'Algorithms, Agent Development, Data Processing.',
    tag: 'AI & DATA',
    accent: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
  },
  {
    name: 'Java & SQL',
    desc: 'Backend Architecture, Queries, Relational Databases.',
    tag: 'BACKEND',
    accent: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  },
  {
    name: 'Web & Full-Stack',
    desc: 'JavaScript, Go, React, Tailwind CSS.',
    tag: 'FULL-STACK',
    accent: 'text-accent-purple border-accent-purple/40 bg-accent-purple/10',
  },
];

/**
 * Terminal Component
 * Displays an automated boot sequence and comprehensive interactive shell environment.
 */
export default function Terminal({ onOpenApp, onClose }) {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [bootFinished, setBootFinished] = useState(false);
  const [currentDir, setCurrentDir] = useState('~');
  const [inputCommand, setInputCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const terminalEndRef = useRef(null);

  // Automated boot sequence effect
  useEffect(() => {
    let timers = [];

    BOOT_LOGS.forEach((log, index) => {
      const timer = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, log]);

        if (index === BOOT_LOGS.length - 1) {
          setTimeout(() => {
            setBootFinished(true);
          }, 300);
        }
      }, log.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedLogs, bootFinished, commandHistory]);

  // Tab key autocompletion
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputCommand;
      if (!current.trim()) return;

      const baseCommands = [
        'help',
        'ls',
        'cat',
        'open',
        'cd',
        'pwd',
        'skills',
        'clear',
        'date',
        'exit',
      ];

      const appNames = [
        'resume',
        'about',
        'projects',
        'map',
        'about-me.txt',
        'ResumeViewer.exe',
        'Trajectory.map',
        'Terminal.exe',
      ];

      const dirNames = ['projects', '~', '..'];

      const parts = current.split(' ');
      if (parts.length === 1) {
        // Autocompleting command name
        const partial = parts[0].toLowerCase();
        const match = baseCommands.find((c) => c.startsWith(partial));
        if (match) {
          if (['open', 'cat', 'cd'].includes(match)) {
            setInputCommand(`${match} `);
          } else {
            setInputCommand(match);
          }
        }
      } else if (parts.length >= 2) {
        // Autocompleting argument for open, cat, cd
        const cmd = parts[0].toLowerCase();
        const partialArg = parts.slice(1).join(' ').toLowerCase();

        let pool = [];
        if (cmd === 'open') {
          pool = appNames;
        } else if (cmd === 'cat') {
          pool = ['about-me.txt', 'resume', 'projects', 'map'];
        } else if (cmd === 'cd') {
          pool = dirNames;
        }

        const match = pool.find((item) =>
          item.toLowerCase().startsWith(partialArg)
        );
        if (match) {
          setInputCommand(`${parts[0]} ${match}`);
        }
      }
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const rawInput = inputCommand.trim();
    if (!rawInput) return;

    const parts = rawInput.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase().trim();

    let response = '';

    switch (cmd) {
      case 'help':
        response = `COMMAND REFERENCE (Synth-OS v2.0.1):
  ls [dir]     :: List files and repositories
  cat <file>   :: Output file contents or launch document
  open <name>  :: Launch application window (e.g. open resume, open map)
  cd <dir>     :: Change directory (~, projects, ..)
  pwd          :: Print current working directory
  contact      :: Launch mail client and display email address
  skills       :: Display technical stack and core competencies
  clear        :: Clear terminal screen history
  date         :: Display current system timestamp
  exit         :: Terminate session and close terminal window`;
        break;

      case 'pwd':
        response =
          currentDir === '~'
            ? '/home/guest'
            : `/home/guest/${currentDir.replace('~/', '')}`;
        break;

      case 'cd':
        if (!arg || arg === '~' || arg === '/home' || arg === '/home/guest') {
          setCurrentDir('~');
          response = 'Changed directory to ~ (home)';
        } else if (arg === '..' || arg === '../') {
          setCurrentDir('~');
          response = 'Changed directory to ~';
        } else if (
          arg === 'projects' ||
          arg === '/projects' ||
          arg === '~/projects'
        ) {
          setCurrentDir('~/projects');
          response = 'Changed directory to ~/projects';
        } else if (arg === 'about' || arg === 'resume' || arg === 'map') {
          response = `synth-sh: cd: ${arg}: Not a directory (it is a file/executable). Use 'open ${arg}' or 'cat ${arg}'.`;
        } else {
          response = `synth-sh: cd: no such directory: ${arg}`;
        }
        break;

      case 'ls':
        if (
          currentDir.includes('project') ||
          arg === 'projects' ||
          arg === '/projects'
        ) {
          response = `total 4 repositories
drwxr-xr-x 1 guest guest  APP-phone-company (C++, OOP)
drwxr-xr-x 1 guest guest  Alpha-Beta-tictactoe (AI, MinMax)
drwxr-xr-x 1 guest guest  Greedy-algorithms-tournament (Algorithms)
drwxr-xr-x 1 guest guest  Numerical-Modeling-on-Python (Data, Math)`;
        } else {
          response = `total 5 items
-rw-r--r-- 1 guest guest 1.2K  about-me.txt
-rwxr-xr-x 1 guest guest 840K  ResumeViewer.exe
drwxr-xr-x 2 guest guest 4.0K  projects/
-rwxr-xr-x 1 guest guest 512K  Trajectory.map
-rwxr-xr-x 1 guest guest 720K  Terminal.exe`;
        }
        break;

      case 'cat':
      case 'open':
        if (!arg) {
          response = `Usage: ${cmd} <file|name> (e.g. ${cmd} resume, ${cmd} about-me.txt, ${cmd} projects, ${cmd} map)`;
        } else {
          const opened = onOpenApp ? onOpenApp(arg) : false;
          if (opened) {
            response = `[OK] Dispatched GUI signal: Launched window instance for '${arg}'.`;
          } else {
            response = `synth-sh: ${cmd}: '${arg}': Unknown file or application. Type 'ls' to view available entries.`;
          }
        }
        break;

      case 'skills':
        response = `Core Technical Stack:
• C / C++: Core Logic, Data Structures, OOP, Memory Management.
• Python & AI: Algorithms, Agent Development, Data Processing.
• Java & SQL: Backend Architecture, Queries, Relational Databases.
• Web & Full-Stack: JavaScript, Go, React, Tailwind CSS.`;
        break;

      case 'about':
        if (onOpenApp) onOpenApp('about');
        response =
          'Neizan Roggie - Aspiring Full-Stack Software Engineer (Spain, USA, Norway). [Window opened]';
        break;

      case 'contact':
      case 'email':
      case 'mail':
        response =
          '[ OK ] Launching default mail client... You can also reach me directly at: neizanroggie7@gmail.com';
        if (typeof window !== 'undefined') {
          window.location.href = 'mailto:neizanroggie7@gmail.com';
        }
        break;

      case 'clear':
        setCommandHistory([]);
        setInputCommand('');
        return;

      case 'date':
        response = new Date().toUTCString();
        break;

      case 'exit':
        if (onClose) {
          onClose();
          return;
        }
        response = 'Terminal session terminated.';
        break;

      default:
        response = `synth-sh: command not found: '${cmd}'. Type 'help' to see available commands.`;
        break;
    }

    setCommandHistory((prev) => [
      ...prev,
      { dir: currentDir, command: rawInput, response },
    ]);
    setInputCommand('');
  };

  return (
    <div className="h-full w-full bg-os p-4 font-mono text-xs overflow-y-auto text-text-main flex flex-col justify-between selection:bg-accent-cyan/30 selection:text-accent-cyan">
      <div className="space-y-3">
        {/* Terminal Header Banner */}
        <div className="flex items-center gap-2 text-accent-cyan/80 pb-2 border-b border-white/5 select-none">
          <TerminalIcon className="w-4 h-4 text-accent-cyan" />
          <span className="font-semibold tracking-wider">NEIZAN_ROGGIE // INTERACTIVE TERMINAL</span>
        </div>

        {/* Boot Sequence Logs */}
        <div className="space-y-1">
          {displayedLogs.map((log, index) => (
            <div key={index} className={`font-mono text-[11px] leading-relaxed ${log.color}`}>
              {log.text}
            </div>
          ))}
        </div>

        {/* Skills Section (Rendered after boot completion) */}
        {bootFinished && (
          <div className="pt-3 space-y-3 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 text-slate-200 font-semibold tracking-wide border-t border-white/10 pt-3">
              <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
              <span>CORE SKILLS &amp; TECHNOLOGIES:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2.5 rounded bg-white/[0.03] border border-white/10 hover:border-accent-cyan/40 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-100 group-hover:text-accent-cyan transition-colors">
                      {skill.name}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono ${skill.accent}`}>
                      {skill.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-main/70 leading-snug">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-text-main/50 italic pt-1">
              Type 'help' in the prompt to view available system commands.
            </p>
          </div>
        )}

        {/* Command Output History */}
        {commandHistory.map((item, idx) => (
          <div key={idx} className="space-y-0.5 pt-1">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-accent-cyan">guest@synth-os:{item.dir}$</span>
              <span>{item.command}</span>
            </div>
            {item.response && (
              <div className="text-text-main/80 pl-4 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
                {item.response}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Command Prompt Line */}
      {bootFinished && (
        <form onSubmit={handleCommandSubmit} className="mt-4 pt-2 border-t border-white/5 flex items-center gap-2">
          <span className="text-accent-cyan font-bold select-none shrink-0">
            guest@synth-os:{currentDir}$
          </span>
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command (e.g. ls, open resume, help)..."
            className="flex-1 bg-transparent text-slate-100 outline-none font-mono text-xs placeholder:text-text-main/30"
            autoFocus
          />
          <span className="w-2 h-4 bg-accent-cyan animate-pulse shrink-0" />
        </form>
      )}

      <div ref={terminalEndRef} />
    </div>
  );
}
