import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start py-12 px-4 selection:bg-indigo-500 selection:text-white">
      {/* --- SECCIÓN HERO / LOGOS --- */}
      <section className="flex flex-col items-center text-center max-w-xl mx-auto mb-16">
        <div className="relative w-[170px] h-[180px] mb-8 flex items-center justify-center">
          {/* Base isométrica */}
          <img
            src={heroImg}
            className="absolute top-0 left-0 w-full h-full object-contain"
            alt="Base background"
          />
          {/* Logo React flotando y rotando suavemente */}
          <img
            src={reactLogo}
            className="absolute w-12 h-12 top-6 animate-[spin_15s_linear_infinite] drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            alt="React logo"
          />
          {/* Logo Vite flotando */}
          <img
            src={viteLogo}
            className="absolute w-12 h-12 bottom-12 animate-pulse drop-shadow-[0_0_15px_rgba(100,108,255,0.5)]"
            alt="Vite logo"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Get started
        </h1>

        <p className="text-slate-400 text-lg mb-6">
          Edit{" "}
          <code className="bg-slate-900 border border-slate-800 text-indigo-400 font-mono px-2 py-0.5 rounded text-sm">
            src/App.tsx
          </code>{" "}
          and save to test{" "}
          <code className="bg-slate-900 border border-slate-800 text-indigo-400 font-mono px-2 py-0.5 rounded text-sm">
            HMR
          </code>
        </p>

        {/* Botón de Contador Estilizado */}
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
          className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-150"
        >
          Count is {count}
        </button>
      </section>

      {/* Divisor */}
      <div className="w-full max-w-4xl border-t border-slate-900 my-4"></div>

      {/* --- SECCIÓN DE ENLACES / TARJETAS --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto px-2">
        {/* Tarjeta de Documentación */}
        <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-xl p-6 transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-6 h-6 text-indigo-400"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/icons.svg#documentation-icon"></use>
            </svg>
            <h2 className="text-xl font-bold text-white">Documentation</h2>
          </div>
          <p className="text-slate-400 text-sm mb-6">
            Your questions, answered
          </p>
          <ul className="flex flex-wrap gap-3">
            <li>
              <a
                href="https://vite.dev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm border border-slate-800 transition-colors"
              >
                <img className="w-4 h-4" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm border border-slate-800 transition-colors"
              >
                <img className="w-4 h-4" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>

        {/* Tarjeta de Redes / Comunidad */}
        <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-xl p-6 transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-6 h-6 text-indigo-400"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/icons.svg#social-icon"></use>
            </svg>
            <h2 className="text-xl font-bold text-white">Connect with us</h2>
          </div>
          <p className="text-slate-400 text-sm mb-6">Join the Vite community</p>
          <ul className="flex flex-wrap gap-2.5">
            <li>
              <a
                href="https://github.com/vitejs/vite"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-sm border border-slate-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://chat.vite.dev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-sm border border-slate-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a
                href="https://x.com/vite_js"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-sm border border-slate-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a
                href="https://bsky.app/profile/vite.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-sm border border-slate-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Espaciador final */}
      <div className="h-16"></div>
    </div>
  );
}

export default App;
