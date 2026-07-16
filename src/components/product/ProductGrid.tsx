import { ProductCard, type Product } from './ProductCard';
import { ProductCardSkeleton } from '../common/Skeletons';
import { PackageX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart: (product: Product) => void;
  onViewDetails: (id: string) => void;
}

export function ProductGrid({
  products,
  isLoading = false,
  onAddToCart,
  onViewDetails,
}: ProductGridProps) {
  
  // =========================================================================
  // 1. ESTADO DE CARGA REUTILIZANDO TU COMPONENTE COMPUESTO
  // =========================================================================
  if (isLoading) {
    return (
      <div 
        className="
          grid 
          grid-cols-1 
          [screen-width_<=_280px]:grid-cols-1 
          min-[280px]:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-3 
          xs:gap-4 
          sm:gap-6
        "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // =========================================================================
  // 2. CASO DE BORDE: SIN PRODUCTOS DISPONIBLES (EMPTY STATE)
  // =========================================================================
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-slate-900 bg-slate-950/10 backdrop-blur-md">
        <div className="rounded-full bg-slate-900/50 p-4 border border-slate-800 text-slate-500 mb-4">
          <PackageX className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-200">No products found</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-xs">
          We couldn't find any items matching your current filters. Try selecting another category!
        </p>
      </div>
    );
  }

  // =========================================================================
  // 3. RENDERIZADO DEL GRID (RESPONSIVO EXTREMO DESDE SMARTWATCH)
  // =========================================================================
  return (
    <div 
      className="
        grid 
        grid-cols-1 
        /* Smartwatch / Ultra-small screens (< 280px): 1 columna muy compacta */
        [screen-width_<=_280px]:grid-cols-1 
        /* Celulares estándar en adelante: 2 columnas */
        min-[280px]:grid-cols-2 
        /* Tablets: 3 columnas */
        md:grid-cols-3 
        /* Laptops y pantallas grandes: 4 columnas */
        lg:grid-cols-4 
        /* Espaciado responsivo para que no consuma aire en pantallas diminutas */
        gap-3 
        xs:gap-4 
        sm:gap-6
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}