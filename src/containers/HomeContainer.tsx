import { useHomeViewModel } from "../viewmodels/useHomeViewModel";
import { ProductGrid } from "../components/product/ProductGrid";
import { Button } from "../components/common/Button";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
// Importamos tu interfaz global renombrada para evitar conflictos
import type { Product as GlobalProduct } from "../types";
import { Terminal, Cpu, Sparkles, ArrowRight, Layers } from "lucide-react";

// Tasa de cambio estática: 1 USD = 4,000 COP
const USD_TO_COP_RATE = 4000;

export function HomeContainer() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    isLoading,
    featuredProducts,
    handleExploreCatalog,
    handleNewsletterSubmit,
  } = useHomeViewModel();

  // Convertimos los precios de los productos destacados en tiempo de ejecución
  const featuredProductsInCOP = featuredProducts.map((product) => ({
    ...product,
    price: product.price * USD_TO_COP_RATE,
  }));

  return (
    <div className="space-y-24 pb-20">
      {/* 🌟 HERO SECTION CON IMAGEN DE FONDO ADAPTADA */}
      <section
        className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-slate-900 bg-cover bg-right sm:bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 6, 23, 0.95) 30%, rgba(2, 6, 23, 0.4) 70%, rgba(2, 6, 23, 0.85)), url('https://i.imgur.com/kHmd1x6.png')`,
        }}
      >
        {/* Efectos de luces sutiles encima del fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-6 animate-fade-in mx-auto lg:mx-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Colección Limitada Disponible
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto lg:mx-0">
            Eleva tu Entorno con <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              Estilo y Código Impecable
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium dropped-shadow">
            La fusión perfecta entre indumentaria exclusiva para desarrolladores
            y soluciones web robustas de última generación listas para
            producción.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            {/* 🌟 CORRECCIÓN: Se usa la prop iconRight nativa y se elimina el flex/gap del className */}
            <Button
              variant="primary"
              onClick={handleExploreCatalog}
              iconRight={
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              }
              className="py-3 px-8 text-sm uppercase tracking-wider font-extrabold w-full sm:w-auto group"
            >
              Explorar Catálogo
            </Button>
            <a href="#about" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="py-3 px-8 text-sm uppercase tracking-wider font-extrabold w-full sm:w-auto"
              >
                Saber Más
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* PILARES DE VALOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-950/40 border border-slate-900 hover:border-slate-800/80 p-8 rounded-2xl transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Hecho por Devs
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cada prenda y solución digital está inspirada en las necesidades
              reales del día a día de un ingeniero de software.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-slate-900 hover:border-slate-800/80 p-8 rounded-2xl transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Máximo Rendimiento
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Soluciones construidas bajo arquitecturas optimizadas para
              velocidades de carga ultrarápidas y escalabilidad inmediata.
            </p>
          </div>

          <div className="bg-slate-950/40 border border-slate-900 hover:border-slate-800/80 p-8 rounded-2xl transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Material Premium
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trabajamos con los mejores proveedores para garantizar materiales
              textiles duraderos y componentes de software limpios.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Los Favoritos de la Comunidad
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              La selección de productos mejor valorados por profesionales de la
              tecnología.
            </p>
          </div>

          {/* 🌟 CORRECCIÓN: Se usa la prop iconRight nativa para el botón del catálogo */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExploreCatalog}
            iconRight={<ArrowRight className="w-3 h-3" />}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 self-start sm:self-auto"
          >
            Ver todos los productos
          </Button>
        </div>

        <ProductGrid
          products={featuredProductsInCOP}
          isLoading={isLoading}
          onAddToCart={(product) => {
            const globalProduct = product as unknown as GlobalProduct;

            const defaultSize =
              globalProduct.sizes && globalProduct.sizes.length > 0
                ? globalProduct.sizes[0].size
                : null;

            addToCart(globalProduct, defaultSize);
          }}
          onViewDetails={(id) => {
            navigate(`/product/${id}`);
          }}
        />
      </section>

      {/* BANNER DE NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-950/40 border border-slate-900 p-8 md:p-12 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                Comunidad Oxivos
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                ¿Quieres enterarte de los nuevos lanzamientos antes que nadie?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                Únete a nuestra newsletter para recibir descuentos exclusivos,
                recursos de desarrollo gratis y alertas de drops limitados de
                ropa técnica.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get("email") as string;
                  handleNewsletterSubmit(email);
                  e.currentTarget.reset();
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Tu correo de desarrollador..."
                  className="w-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 focus:border-blue-500/50 rounded-xl py-3 px-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="py-3 px-6 text-xs uppercase tracking-wider font-extrabold whitespace-nowrap"
                >
                  Suscribirse
                </Button>
              </form>
              <span className="text-[10px] text-slate-500 mt-2 block text-center sm:text-left">
                No hacemos spam. Solo drops y contenido de alto valor para devs.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
