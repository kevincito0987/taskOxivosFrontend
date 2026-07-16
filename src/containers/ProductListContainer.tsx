// src/components/product/ProductListContainer.tsx
import { useProductListViewModel } from '../viewmodels/useProductListViewModel';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/common/Button';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

export function ProductListContainer() {
  // Conectamos la ViewModel específica para esta vista
  const {
    searchQuery,
    selectedCategory,
    sortBy,
    categories,
    isLoading,
    filteredProducts,
    updateFilter,
    handleClearFilters,
  } = useProductListViewModel();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="catalog">
      {/* CONTENEDOR DE ENCABEZADO Y CONTROL DE BÚSQUEDA */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-900">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Catálogo Oxivos
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Explora soluciones web listas para producción y merchandising exclusivo.
          </p>
        </div>

        {/* Input de Búsqueda Premium */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Buscar productos..."
            className="w-full bg-slate-950/60 border border-slate-900 hover:border-slate-800 focus:border-blue-500/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-900 text-slate-400 hover:text-white"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* BARRA DE FILTROS DESKTOP Y ORDENAMIENTO */}
      <div className="flex items-center justify-between py-6 gap-4">
        {/* Chips de Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => updateFilter('category', category)}
                className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all duration-300 whitespace-nowrap capitalize ${
                  isActive
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                    : 'bg-slate-950/30 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-white'
                }`}
              >
                {category === 'all' ? 'Ver Todos' : category}
              </button>
            );
          })}
        </div>

        {/* Select de Ordenamiento */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="appearance-none bg-slate-950/60 border border-slate-900 hover:border-slate-800 rounded-xl py-2 pl-9 pr-8 text-xs font-bold text-slate-300 focus:outline-none focus:border-blue-500/50 cursor-pointer transition-all"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
            </select>
          </div>

          {/* Botón de limpiar filtros activos */}
          {(selectedCategory !== 'all' || searchQuery !== '' || sortBy !== 'featured') && (
            <Button
              variant="ghost"
              size="sm"
              hasShadow={false}
              onClick={handleClearFilters}
              className="p-2 h-9 rounded-xl border border-slate-900 hover:bg-slate-900"
              title="Limpiar Filtros"
            >
              <SlidersHorizontal className="w-4 h-4 text-red-400" />
            </Button>
          )}
        </div>
      </div>

      {/* CONTENIDO DEL GRID DE PRODUCTOS */}
      <div className="mt-4">
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          onAddToCart={(product) => {
            console.log('Añadiendo al carrito:', product.title);
          }}
          onViewDetails={(id) => {
            console.log('Navegando al detalle:', id);
          }}
        />
      </div>
    </section>
  );
}