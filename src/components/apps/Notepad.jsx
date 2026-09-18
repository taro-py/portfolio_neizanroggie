import { FileText, ArrowUpRight } from 'lucide-react';

/**
 * Notepad Component (about-me.txt)
 * Classic OS text editor with Synth-OS aesthetics, showing Neizan Roggie's verified software engineer profile.
 */
export default function Notepad({ onOpenResume }) {
  const content = `4th-Year Software Engineering Student | University of Huelva (UHU) & Universitetet i Stavanger (UiS)

I am an aspiring FULL-STACK Software Engineer with a solid foundation in systems development, networking, AI and Data.

--- My Technical Stack ---

[Development and tools]
- Languages: C++, C, Java, Python, SQL, GO.
- IDE'S: Cursor, Visual Studio, PyCharm, Code::Blocks, Eclipse, Antigravity, Apache, Oracle, DBeaver, Figma.
- Specialties: Data Structures, Complexity Analysis (Big O), Object-Oriented Programming (OOP), Concurrency, Software Design Patterns, and API Development.
- AI: Agent development and Artificial Intelligence-oriented algorithms.

[Infrastructure and Networking]
- Systems: Ubuntu, Kali Linux, Arch Linux, MAC, Windows.
- Networking: Topology configuration (Cisco), traffic analysis (Wireshark), and remote management (PuTTY).
- Databases: Database design and management, including queries.

[Cybersecurity]
- Continuous self-taught learning in information security, applying networking and systems concepts to build more robust software, as well as finding vulnerabilities in Linux systems and servers.`;

  return (
    <div className="h-full w-full flex flex-col bg-os font-mono select-text">
      {/* Notepad Menu Bar (English) */}
      <div className="h-7 px-3 bg-window/80 border-b border-white/5 flex items-center gap-4 text-xs text-text-main/80 select-none">
        <button type="button" className="hover:text-accent-cyan transition-colors">
          File
        </button>
        <button type="button" className="hover:text-accent-cyan transition-colors">
          Edit
        </button>
        <button type="button" className="hover:text-accent-cyan transition-colors">
          Format
        </button>
        <button type="button" className="hover:text-accent-cyan transition-colors">
          View
        </button>
        <button type="button" className="hover:text-accent-cyan transition-colors">
          Help
        </button>
      </div>

      {/* Editor Content Area (Scrollable & Centered with max-w-4xl) */}
      <div className="flex-1 overflow-y-auto w-full p-4 sm:p-8 selection:bg-accent-cyan/25 selection:text-accent-cyan">
        <div className="max-w-4xl mx-auto w-full flex flex-col">
          <pre className="font-mono whitespace-pre-wrap break-words leading-relaxed text-slate-200 text-xs sm:text-[13px]">{content}</pre>

          {/* Interactive Glowing Resume Button */}
          <div className="mt-10 mb-8 pt-6 border-t border-white/10 select-none">
            <p className="text-[11px] text-text-main/60 mb-2.5 font-mono">
              // Execute command to inspect verified credentials:
            </p>
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onOpenResume();
              }}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded bg-accent-cyan/10 border-2 border-accent-cyan text-accent-cyan font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-accent-cyan hover:text-black hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              <span className="group-hover:translate-x-0.5 transition-transform">&gt; VIEW_RESUME.exe</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Notepad Status Bar (English) */}
      <div className="h-6 px-3 bg-window/60 border-t border-white/5 flex items-center justify-between text-[11px] text-text-main/60 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3 h-3 text-accent-cyan/70" />
            Ln 26, Col 1
          </span>
          <span>UTF-8 Document</span>
        </div>
        <div className="flex items-center gap-4">
          <span>100%</span>
          <span>Windows (CRLF)</span>
          <span className="text-accent-cyan/80 font-medium">UTF-8</span>
        </div>
      </div>
    </div>
  );
}
