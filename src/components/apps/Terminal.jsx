import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const BOOT_LOGS = [
  { text: 'SYNTH_OS KERNEL [v1.0.0-PROD.x86_64]', delay: 200, color: 'text-text-main' },
  { text: 'Copyright (C) 2026 Neizan Roggie. All rights reserved.', delay: 400, color: 'text-text-main/70' },
  { text: '[  OK  ] Initializing CPU microcode & quantum memory...', delay: 700, color: 'text-emerald-400' },
  { text: '[  OK  ] Mounting virtual drive /dev/portfolio_fs...', delay: 1000, color: 'text-emerald-400' },
  { text: '[  OK  ] Loading developer credentials: Neizan Roggie...', delay: 1300, color: 'text-emerald-400' },
  { text: '[  OK  ] Network established: Spain ↔ USA ↔ Norway nodes.', delay: 1600, color: 'text-accent-cyan' },
  { text: '[ EXEC ] Scanning developer competencies (skills-audit.sh)...', delay: 1900, color: 'text-accent-purple' },
];

const SKILLS = [
  {
    name: 'React',
    desc: 'React 19, Hooks avanzados, arquitectura de componentes, virtual DOM',
    tag: 'CORE FRONTEND',
    accent: 'text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10',
  },
  {
    name: 'Tailwind CSS',
    desc: 'Sistemas de diseño a medida, estética cyberpunk/synth, responsive layout',
    tag: 'STYLING',
    accent: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
  },
  {
    name: 'JavaScript',
    desc: 'ESNext, código asíncrono, modularidad, manipulación fluida de APIs',
    tag: 'LANGUAGE',
    accent: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  },
  {
    name: 'Git',
    desc: 'Control de versiones profesional, flujos GitFlow, CI/CD y despliegues',
    tag: 'WORKFLOW',
    accent: 'text-accent-purple border-accent-purple/40 bg-accent-purple/10',
  },
];

/**
 * Terminal Component
 * Displays an automated boot sequence and interactive skills list with Synth-OS aesthetics.
 */
export default function Terminal() {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [bootFinished, setBootFinished] = useState(false);
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

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputCommand.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    if (cmd === 'help') {
      response = 'Comandos disponibles: help, skills, about, clear, date';
    } else if (cmd === 'skills') {
      response = 'Skills principales: React, Tailwind CSS, JavaScript, Git.';
    } else if (cmd === 'about') {
      response = 'Neizan Roggie - Desarrollador Frontend Internacional (España, USA, Noruega).';
    } else if (cmd === 'clear') {
      setCommandHistory([]);
      setInputCommand('');
      return;
    } else if (cmd === 'date') {
      response = new Date().toString();
    } else {
      response = `synth-sh: comando no reconocido: '${cmd}'. Escribe 'help' para ver la lista.`;
    }

    setCommandHistory((prev) => [...prev, { command: inputCommand, response }]);
    setInputCommand('');
  };

  return (
    <div className="h-full w-full bg-os p-4 font-mono text-xs overflow-y-auto text-text-main flex flex-col justify-between selection:bg-accent-cyan/30 selection:text-accent-cyan">
      <div className="space-y-3">
        {/* Terminal Header Banner */}
        <div className="flex items-center gap-2 text-accent-cyan/80 pb-2 border-b border-white/5 select-none">
          <TerminalIcon className="w-4 h-4 text-accent-cyan" />
          <span className="font-semibold tracking-wider">NEIZAN_ROGIE // TERMINAL INTERACTIVA</span>
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
              <span>HABILIDADES Y TECNOLOGÍAS PRINCIPALES:</span>
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
              Escribe 'help' en el prompt para ver comandos disponibles.
            </p>
          </div>
        )}

        {/* Command Output History */}
        {commandHistory.map((item, idx) => (
          <div key={idx} className="space-y-0.5 pt-1">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-accent-cyan">neizan@synth-os:~$</span>
              <span>{item.command}</span>
            </div>
            {item.response && (
              <div className="text-text-main/80 pl-4 whitespace-pre-wrap">
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
            neizan@synth-os:~$
          </span>
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            placeholder="escribe un comando..."
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
