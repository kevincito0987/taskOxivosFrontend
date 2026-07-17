// src/components/product/ProductCard.tsx
import { ShoppingCart, Eye } from "lucide-react";
import { formatToCOP } from "../../utils/currency"; // 🌟 Importación utilitaria

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (id: string) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  const { title, price, image, category, stock } = product;
  const isOutOfStock = stock === 0;

  // 🌟 Como en el catálogo el precio viene multiplicado por el container o cargado directo en COP,
  // delegamos el formateo de cara al usuario a la función utilitaria central.
  return (
    <div className="group relative flex flex-col w-full overflow-hidden rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-md transition-all duration-300 hover:border-slate-800 hover:bg-slate-950/80 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]">
      {/* Contenedor de la Imagen e Interacciones rápidas */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-900/50">
        {/* Badges Dinámicos */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          <span className="rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-cyan-400 uppercase border border-slate-800 backdrop-blur-sm">
            {category}
          </span>
          {isOutOfStock && (
            <span className="rounded-md bg-red-950/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-400 uppercase border border-red-900/50 backdrop-blur-sm animate-pulse">
              Out of Stock
            </span>
          )}
        </div>

        {/* Imagen */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 ${
            isOutOfStock
              ? "opacity-40 grayscale"
              : "opacity-90 group-hover:opacity-100"
          }`}
        />

        {/* Overlay de acción rápida en Hover */}
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-slate-950/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={() => onViewDetails(product.id)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1 space-y-1.5">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-200 group-hover:text-white transition-colors min-h-[40px]">
            {title}
          </h3>

          <div className="flex items-baseline justify-between pt-1">
            {/* 🌟 Renderizado limpio usando formatToCOP */}
            <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
              {formatToCOP(price < 1000 ? price * 4000 : price)}
            </span>
            {!isOutOfStock && (
              <span className="text-[11px] text-slate-500 font-medium">
                {stock} available
              </span>
            )}
          </div>
        </div>

        {/* Botón de Agregar al Carrito */}
        <div className="mt-5">
          <button
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold tracking-wide transition-all duration-300 ${
              isOutOfStock
                ? "bg-slate-900 text-slate-600 border border-slate-950 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-[0.98]"
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
