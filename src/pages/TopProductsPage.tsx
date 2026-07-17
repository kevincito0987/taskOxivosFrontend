// src/pages/TopProductsPage.tsx
import { useEffect, useState } from "react";
import { RatingStars } from "../components/common/RatingStars";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

// 🌟 Importamos tu hook oficial para manejar el estado global
import { useCart } from "../hooks/useCart";
// 🌟 Importamos el mockup local para inyectarle dinámicamente los nuevos productos en memoria
import { PRODUCTS_MOCK } from "../data/products";
// Importamos el tipo real de tu aplicación para mantener el tipado estricto
import type { Product } from "../types";

// Interfaz interna para mapear exactamente lo que responde la FakeStoreAPI
interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

const USD_TO_COP_RATE = 4000;

export function TopProductsPage() {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 Extraemos el addToCart real de tu hook useCart
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data: ApiProduct[] = await response.json();

        // Filtramos y adaptamos la API externa a la interfaz 'Product' de Oxivos
        const adaptedProducts: Product[] = data
          .filter((p) => p.rating && p.rating.rate >= 4.0)
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .map((p) => ({
            id: `ox-api-${p.id}`, // 🌟 Le damos un ID único y limpio que no choque con tus mocks locales
            title: p.title,
            // 🌟 Convertimos a COP desde el origen para mantener la arquitectura limpia
            price: p.price * USD_TO_COP_RATE,
            description: p.description,
            category: p.category,
            image: p.image,
            stock: 15, // Stock ficticio para que pase las validaciones
            rating: {
              rate: p.rating.rate,
              count: p.rating.count,
            },
            sizes: [], // Sin tallas por defecto
          }));

        // 🌟 Registramos los productos de la API dentro de tu PRODUCTS_MOCK en memoria
        adaptedProducts.forEach((newProduct) => {
          const exists = PRODUCTS_MOCK.some(
            (item) => item.id === newProduct.id
          );
          if (!exists) {
            PRODUCTS_MOCK.push(newProduct);
          }
        });

        setTopProducts(adaptedProducts);
      } catch (error) {
        console.error("Error cargando los top drops:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  // Formateador limpio sin lógica de multiplicación duplicada
  const formatPrice = (value: number) => {
    return (
      new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(value) + " COP"
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Header de la Sección */}
      <div className="mb-12 border-b border-slate-900 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Comunidad Oxivos
          </span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">
          Top Rated Drops
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-xl">
          Las soluciones web listas para producción y merchandising exclusivo
          mejor valorados por nuestro equipo y usuarios.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-2xl bg-slate-900/40 border border-slate-900 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product) => {
            // Safe guard por si 'rating' llegase a faltar en el objeto
            const productRating = product.rating?.rate ?? 0;

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-slate-950/40 border border-slate-900 p-4 flex flex-col justify-between transition-all duration-300 hover:border-slate-800 hover:shadow-[0_0_30px_rgba(37,99,235,0.05)]"
              >
                <div>
                  {/* Contenedor de la Imagen */}
                  <div className="relative aspect-square rounded-xl bg-slate-900/50 border border-slate-800/50 overflow-hidden mb-4 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center gap-1 backdrop-blur-sm">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-bold text-white">
                        {productRating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>

                  {/* Enlace dinámico con ID real único */}
                  <Link
                    to={`/product/${product.id}`}
                    className="hover:underline"
                  >
                    <h3 className="text-sm font-bold text-white line-clamp-2 min-h-[40px] tracking-tight hover:text-blue-400 transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="mt-2 mb-4">
                    <RatingStars rating={productRating} readOnly size="sm" />
                  </div>
                </div>

                {/* Precio y Acción */}
                <div className="mt-4 pt-4 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-sm font-black text-white">
                    {formatPrice(product.price)}
                  </span>

                  {/* Botón conectado al carrito */}
                  <button
                    onClick={() => addToCart(product, null)}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-600/10 transition-all active:scale-95"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
