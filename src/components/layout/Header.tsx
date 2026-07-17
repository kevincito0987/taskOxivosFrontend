// src/components/common/Header.tsx
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X, Globe, ChevronRight } from "lucide-react";

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export function Header({ cartCount = 0, onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md border-slate-900 shadow-lg"
          : "bg-slate-950/50 backdrop-blur-sm border-slate-900/50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.07] mix-blend-luminosity filter blur-[0.5px]"
          style={{
            backgroundImage:
              "url('/src/assets/images/vitaly-gariev-YHC8oV7tcdM-unsplash.jpg')",
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(circle_at_80%_50%,rgba(37,99,235,0.2),transparent_70%)]" />
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_10%_50%,rgba(6,182,212,0.08),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-opacity hover:opacity-90"
          >
            <div className="h-11 w-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300">
              <span className="text-base font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                OX
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white leading-none">
                OXIVOS
              </span>
              <span className="text-[8px] tracking-[0.25em] text-blue-400 font-bold uppercase mt-0.5">
                Web Development Agency
              </span>
            </div>
          </Link>

          {/* CENTRO: MENÚ NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`
              }
            >
              Store Catalog
            </NavLink>

            {/* 🌟 CAMBIO CLAVE: NavLink interactivo hacia la vista de mejor calificados */}
            <NavLink
              to="/top-rated"
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`
              }
            >
              Top Drops
            </NavLink>
            <span className="h-4 w-px bg-slate-800" />

            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold tracking-widest uppercase">
              <Globe className="w-3.5 h-3.5" />
              <span>ENG</span>
            </div>
          </nav>

          {/* DERECHA */}
          <div className="flex items-center gap-4">
            {onCartClick ? (
              <button
                onClick={onCartClick}
                className="relative p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            ) : (
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all inline-flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl md:hidden bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-900 bg-slate-950/95 backdrop-blur-lg">
          <div className="px-4 pt-3 pb-6 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200"
            >
              <span className="font-semibold">Home</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-200"
            >
              <span className="font-semibold">Store Catalog</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
            {/* 🌟 CAMBIO CLAVE MÓVIL: Cambiado a Link limpio hacia /top-rated */}
            <Link
              to="/top-rated"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              <span className="font-semibold">Top Drops</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
