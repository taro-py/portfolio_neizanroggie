/**
 * Notepad Component (about-me.txt)
 * Simulates a classic OS text editor with Synth-OS aesthetics, showing Neizan Roggie's bio.
 */
export default function Notepad() {
  const fileContent = `============================================================
ABOUT_ME.TXT - PERFIL DE DESARROLLADOR
Autor: Neizan Roggie
Entorno: Synth-OS v1.0
============================================================

¡Hola! 👋

Soy Neizan Roggie, estudiante de desarrollo web con trayectoria
internacional que abarca experiencias formativas en España, Estados
Unidos y Noruega.

Esta vivencia multicultural me ha otorgado una gran adaptabilidad,
visión global y una metodología de trabajo orientada a la resolución
eficiente de problemas.

------------------------------------------------------------
🚀 LO QUE ME APASIONA
------------------------------------------------------------
Me apasiona crear interfaces interactivas, modernas y escalables.
Disfruto explorando nuevos paradigmas frontend (como este entorno
de Sistema Operativo en el navegador), optimizando la fluidez de
las animaciones y cuidando cada microinteracción visual.

------------------------------------------------------------
🌍 TRAYECTORIA INTERNACIONAL
------------------------------------------------------------
• 🇪🇸 España: Raíces formativas en ingeniería y desarrollo web moderno.
• 🇺🇸 Estados Unidos: Inmersión lingüística, visión de producto y diseño ágil.
• 🇳🇴 Noruega: Estándares de calidad de código, disciplina y pensamiento analítico.

------------------------------------------------------------
🎯 OBJETIVO PROFESIONAL
------------------------------------------------------------
Contribuir en proyectos tecnológicos desafiantes donde pueda aportar
valor construyendo experiencias de usuario de clase mundial con React,
arquitectura limpia y tecnologías de vanguardia.

[EOF - Fin del documento]`;

  return (
    <div className="h-full w-full flex flex-col bg-os font-mono select-text">
      {/* Notepad Menu Bar */}
      <div className="h-7 px-3 bg-window/80 border-b border-white/5 flex items-center gap-4 text-xs text-text-main/80 select-none">
        <button type="button" className="hover:text-accent-cyan transition-colors">
          Archivo
        </button>
        <button type="button" className="hover:text-accent-cyan transition-colors">
          Edición
        </button>
        <button type="button" className="hover:text-accent-cyan transition-colors">
          Formato
        </button>
        <button type="button" className="hover:text-accent-cyan transition-colors">
          Ver
        </button>
        <button type="button" className="hover:text-accent-cyan transition-colors">
          Ayuda
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 p-4 overflow-auto text-xs sm:text-[13px] leading-relaxed text-slate-200 selection:bg-accent-cyan/25 selection:text-accent-cyan">
        <pre className="font-mono whitespace-pre-wrap break-words">{fileContent}</pre>
      </div>

      {/* Notepad Status Bar */}
      <div className="h-6 px-3 bg-window/60 border-t border-white/5 flex items-center justify-between text-[11px] text-text-main/60 select-none">
        <div className="flex items-center gap-4">
          <span>Línea 36, Columna 1</span>
          <span>Caracteres: {fileContent.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>100%</span>
          <span>Windows (CRLF)</span>
          <span className="text-accent-cyan/80">UTF-8</span>
        </div>
      </div>
    </div>
  );
}
