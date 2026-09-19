import { useState } from 'react';
import { Download, ExternalLink, FileCode, CheckCircle, FileText, Eye, Printer } from 'lucide-react';

/**
 * ResumeViewer Component
 * High-fidelity CV viewer reproducing the official LaTeX resume document,
 * complete with dual view modes (Document & PDF Embed), interactive links, and direct download.
 */
export default function ResumeViewer({ onClose }) {
  const [viewMode, setViewMode] = useState('doc'); // 'doc' | 'pdf'

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#0d0e15] font-mono select-none overflow-hidden">
      {/* Top Document Toolbar */}
      <div className="h-10 px-3 sm:px-4 bg-window/95 border-b border-white/10 flex items-center justify-between text-xs text-text-main shrink-0 gap-2">
        {/* Left: Terminal Path & Artifact Badge */}
        <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px] min-w-0">
          <FileCode className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
          <span className="truncate hidden sm:inline">neizan@os : ~/resume $ view</span>
          <span className="sm:hidden truncate">resume.pdf</span>
          <div className="hidden md:flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-wider">
            <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
            <span>OFFICIAL CV</span>
          </div>
        </div>

        {/* Center: View Mode Toggle */}
        <div className="flex items-center bg-black/40 border border-white/10 rounded p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setViewMode('doc')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all ${
              viewMode === 'doc'
                ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Interactive LaTeX Styled View"
          >
            <FileText className="w-3 h-3" />
            <span>Document</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('pdf')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all ${
              viewMode === 'pdf'
                ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Native PDF Preview"
          >
            <Eye className="w-3 h-3" />
            <span>PDF View</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {viewMode === 'doc' && (
            <button
              type="button"
              onClick={handlePrint}
              className="hidden lg:flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 transition-colors"
              title="Print Document"
            >
              <Printer className="w-3 h-3" />
              <span>Print</span>
            </button>
          )}

          <a
            href="/neizan_roggie_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-accent-cyan transition-colors"
            title="Open original PDF in new tab"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">Open PDF</span>
          </a>

          <a
            href="/neizan_roggie_resume.pdf"
            download="Neizan_Roggie_CV.pdf"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-cyan/15 hover:bg-accent-cyan/25 border border-accent-cyan/40 text-[11px] text-accent-cyan font-medium transition-all shadow-[0_0_10px_rgba(0,229,255,0.15)]"
            title="Download original PDF file"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Download</span>
          </a>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 rounded hover:bg-white/10 text-[11px] text-text-main hover:text-slate-200 transition-colors ml-1"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'pdf' ? (
        /* Native PDF iframe reader */
        <div className="flex-1 w-full h-full bg-[#11121c] relative flex flex-col">
          <iframe
            src="/neizan_roggie_resume.pdf#view=FitH"
            title="Neizan Roggie Martínez CV"
            className="w-full h-full border-0 flex-1"
          />
        </div>
      ) : (
        /* High-Fidelity LaTeX Folio Document View */
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 flex justify-center items-start bg-[#0a0b10] select-text">
          <div
            className="w-full max-w-[760px] bg-white text-slate-900 rounded-sm shadow-2xl p-6 sm:p-10 md:p-12 border border-slate-300 flex flex-col relative transition-all"
            style={{
              fontFamily:
                '"Latin Modern Roman", "Computer Modern", Georgia, Cambria, "Times New Roman", serif',
            }}
          >
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-2 border-b border-transparent">
              {/* Left Column: Name & Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Neizan Roggie Martínez
                </h1>
                <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1 font-sans">
                  BSc Software Engineering Student
                </p>
              </div>

              {/* Right Column: Contact & Profiles */}
              <div className="text-left sm:text-right text-[11px] sm:text-xs leading-relaxed font-sans text-slate-700 shrink-0">
                <div>
                  <a
                    href="mailto:neizanroggie7@gmail.com"
                    className="text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    neizanroggie7@gmail.com
                  </a>
                  <span className="text-slate-900 font-medium"> » Email</span>
                </div>
                <div>
                  <a
                    href="https://github.com/taro-py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    github.com/taro-py
                  </a>
                  <span className="text-slate-900 font-medium"> » GitHub</span>
                </div>
                <div>
                  <a
                    href="https://linkedin.com/in/neizan-roggie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    linkedin.com/in/neizan-roggie
                  </a>
                  <span className="text-slate-900 font-medium"> » LinkedIn</span>
                </div>
                <div>
                  <a
                    href="https://neizanroggie.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    neizanroggie.com
                  </a>
                  <span className="text-slate-900 font-medium"> » Web</span>
                </div>
                <div>
                  <span>Stavanger, Norway / Huelva, Spain</span>
                  <span className="text-slate-900 font-medium"> » Location</span>
                </div>
              </div>
            </div>

            {/* Section 1: Summary */}
            <div className="mt-3">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wide border-b border-slate-900 pb-0.5 mb-1.5">
                Summary
              </h2>
              <p className="text-xs sm:text-[13px] leading-relaxed text-slate-800 text-justify">
                Aspiring FULL-STACK Software Engineer with a solid foundation in systems
                development, algorithms, and Data. Currently undertaking a 4th-year
                international exchange program at UiS, diving deep into advanced software
                engineering, distributed systems, Numerical Modeling and robotics.
              </p>
            </div>

            {/* Section 2: Education */}
            <div className="mt-3.5">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wide border-b border-slate-900 pb-0.5 mb-2">
                Education
              </h2>
              
              <div className="space-y-2.5">
                {/* UiS */}
                <div>
                  <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                    <span className="font-bold text-slate-900">
                      Universitetet i Stavanger (UiS)
                    </span>
                    <span className="text-slate-800">Stavanger, Norway</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                    <span className="italic text-slate-700">
                      BSc Computer Engineering (Exchange)
                    </span>
                    <span className="text-slate-800">2026 – 2027</span>
                  </div>
                </div>

                {/* UHU */}
                <div>
                  <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                    <span className="font-bold text-slate-900">
                      Universidad de Huelva (UHU)
                    </span>
                    <span className="text-slate-800">Huelva, Spain</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                    <span className="italic text-slate-700">
                      BSc Computer Engineering
                    </span>
                    <span className="text-slate-800">2023 – 2027</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Experience */}
            <div className="mt-3.5">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wide border-b border-slate-900 pb-0.5 mb-2">
                Experience
              </h2>

              <div className="space-y-3">
                {/* 321 Carpet and Flooring */}
                <div>
                  <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                    <span className="font-bold text-slate-900">
                      321 Carpet and Flooring
                    </span>
                    <span className="text-slate-800">North Carolina, USA</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                    <span className="italic text-slate-700">
                      Floor Installer and Carpet Specialist (Summer Work & Travel)
                    </span>
                    <span className="text-slate-800">Jun 2024 – Sep 2024</span>
                  </div>
                  <ul className="mt-1 space-y-0.5 text-xs sm:text-[12.5px] text-slate-800 list-none pl-1">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[10px] leading-relaxed text-slate-600 select-none">◦</span>
                      <span>Immersive professional experience in the US.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[10px] leading-relaxed text-slate-600 select-none">◦</span>
                      <span>
                        Developed fluent English communication and high adaptability in demanding
                        physical logistics and teamwork environments.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Data Collector RWS */}
                <div>
                  <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                    <span className="font-bold text-slate-900">Data Collector</span>
                    <span className="text-slate-800">Fully Remote</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs sm:text-[13px]">
                    <span className="italic text-slate-700">RWS</span>
                    <span className="text-slate-800">Sep 2024 – Present</span>
                  </div>
                  <ul className="mt-1 space-y-0.5 text-xs sm:text-[12.5px] text-slate-800 list-none pl-1">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[10px] leading-relaxed text-slate-600 select-none">◦</span>
                      <span>I am registered as a data collector with RWS, fully remote.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[10px] leading-relaxed text-slate-600 select-none">◦</span>
                      <span>
                        My role involves taking on short-term assignments (ranging from three days to a
                        week) and performing tasks such as data analysis and AI training, as well as
                        managing and optimizing user interfaces and web pages.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4: Projects */}
            <div className="mt-3.5">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wide border-b border-slate-900 pb-0.5 mb-2">
                Projects
              </h2>

              <div className="space-y-2.5">
                {/* APP phone company */}
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    APP phone company
                  </div>
                  <div className="italic text-slate-700 text-xs sm:text-[12.5px]">
                    Backend Developer (C++, OOP)
                  </div>
                  <div className="mt-0.5 flex items-start gap-1.5 text-xs sm:text-[12.5px] text-slate-800 pl-1">
                    <span className="text-[10px] leading-relaxed text-slate-600 select-none">◦</span>
                    <span>
                      Object-Oriented Programming and robust systems logic implementation for mobile
                      telecommunication customer and billing management.
                    </span>
                  </div>
                </div>

                {/* Alpha Beta implementation tic tac toe */}
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    Alpha Beta implementation tic tac toe
                  </div>
                  <div className="italic text-slate-700 text-xs sm:text-[12.5px]">
                    AI & Algorithms Developer (Python)
                  </div>
                  <div className="mt-0.5 flex items-start gap-1.5 text-xs sm:text-[12.5px] text-slate-800 pl-1">
                    <span className="text-[10px] leading-relaxed text-slate-600 select-none">◦</span>
                    <span>
                      Adversarial search AI engine implementing the Minimax algorithm with Alpha-Beta
                      pruning for optimal game-tree evaluation.
                    </span>
                  </div>
                </div>

                {/* Greedy algorithms implementation for bar tournament */}
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    Greedy algorithms implementation for bar tournament
                  </div>
                  <div className="italic text-slate-700 text-xs sm:text-[12.5px]">
                    Algorithms Developer (Python / C++)
                  </div>
                  <div className="mt-0.5 flex items-start gap-1.5 text-xs sm:text-[12.5px] text-slate-800 pl-1">
                    <span className="text-[10px] leading-relaxed text-slate-600 select-none">◦</span>
                    <span>
                      Algorithmic optimization solving bracket pairing, resource allocation, and
                      tournament match scheduling using greedy heuristics.
                    </span>
                  </div>
                </div>

                {/* Numerical-Modeling-on-Python */}
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    Numerical-Modeling-on-Python
                  </div>
                  <div className="italic text-slate-700 text-xs sm:text-[12.5px]">
                    Data Science Developer (Python)
                  </div>
                  <div className="mt-0.5 flex items-start gap-1.5 text-xs sm:text-[12.5px] text-slate-800 pl-1">
                    <span className="text-[10px] leading-relaxed text-slate-600 select-none">◦</span>
                    <span>
                      Computational simulations and numerical methods for differential equations,
                      complex data modeling, and mathematical analysis.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Skills */}
            <div className="mt-3.5">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-wide border-b border-slate-900 pb-0.5 mb-2">
                Skills
              </h2>

              <div className="space-y-1 text-xs sm:text-[12.5px] text-slate-800">
                <div>
                  <span className="font-bold text-slate-900">Languages: </span>
                  <span>C++, C, Java, Python, SQL, GO, JavaScript</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Tools & Tech: </span>
                  <span>
                    Visual Studio Code, Tailwind CSS, Figma, Git, Cursor, Visual Studio, DBeaver,
                    Oracle
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Specialties: </span>
                  <span>
                    Data Structures, Object-Oriented Programming (OOP), Software Design Patterns,
                    Concurrency, AI algorithms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
