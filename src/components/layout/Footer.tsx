// src/components/layout/Footer.tsx
import { Mail, ArrowUp, ExternalLink } from 'lucide-react';
import { GitHub, LinkedIn } from '../common/Icons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-900 bg-slate-950/90 pt-16 pb-8">
      
      {/* =========================================================================
          1. INTEGRACIÓN DE TEXTURA DE FONDO & GLOWS DE OXIVOS
          ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-[0.05] mix-blend-luminosity filter blur-[0.5px]"
          style={{ backgroundImage: "url('/src/assets/images/vitaly-gariev-YHC8oV7tcdM-unsplash.jpg')" }}
        />
        {/* Glow Radial desde la esquina inferior izquierda (Azul Oxivos) */}
        <div className="absolute left-0 bottom-0 w-1/2 h-full bg-[radial-gradient(circle_at_15%_90%,rgba(37,99,235,0.15),transparent_60%)]" />
        {/* Glow Radial desde la esquina inferior derecha (Cian sutil) */}
        <div className="absolute right-0 bottom-0 w-1/3 h-2/3 bg-[radial-gradient(circle_at_85%_95%,rgba(6,182,212,0.06),transparent_55%)]" />
      </div>

      {/* =========================================================================
          2. CONTENIDO PRINCIPAL DEL FOOTER
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid superior */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Bloque 1: Logo, Descripción y Redes */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                <span className="text-sm font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  OX
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-white leading-none">
                  OXIVOS
                </span>
                <span className="text-[7px] tracking-[0.25em] text-blue-400 font-bold uppercase mt-0.5">
                  Web Development Agency
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We build high-performance web applications, specialized as a Mercado Libre Partner Agency. Merging design, velocity, and scalable code.
            </p>

            {/* Redes Sociales usando los Custom Icons con estados hover de grupo */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
              >
                <GitHub className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
              >
                <LinkedIn className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@oxivos.com"
                className="group p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 text-slate-400 hover:text-blue-400 transition-all duration-300"
              >
                <Mail className="w-4 h-4 transition-colors" />
              </a>
            </div>
          </div>

          {/* Bloque 2: Links Rápidos */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-slate-200 uppercase">
              Project Task
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#catalog" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Product Store
                </a>
              </li>
              <li>
                <a href="#features" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Tech Stack Used
                </a>
              </li>
              <li>
                <span className="text-slate-500 line-through cursor-not-allowed flex items-center gap-1.5">
                  Admin Dashboard <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400">Soon</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Bloque 3: Links de la Agencia */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-slate-200 uppercase">
              Agency Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="https://oxivos.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  Visit Official Website <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Custom Development
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Our Team & Culture
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            3. PIE DE PÁGINA (COPYRIGHT & GO TO TOP)
            ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Oxivos. All rights reserved. Built as a Senior Frontend Showcase.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 text-xs font-semibold text-slate-400 hover:text-white transition-all duration-300"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}