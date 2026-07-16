// src/components/product/ProductDetailContainer.tsx
import { useProductDetailViewModel } from '../viewmodels/useProductDetailViewModel';
import { ProductDetailSkeleton } from '../components/common/Skeletons';
import { RatingStars } from '../components/common/RatingStars';
import { SizeSelector } from '../components/product/SizeSelector';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailContainerProps {
  productId: string; // ID recibido desde el enrutador
}

export function ProductDetailContainer({ productId }: ProductDetailContainerProps) {
  // Instanciamos la ViewModel especializada pasando el ID del producto
  const {
    product,
    selectedSize,
    quantity,
    isLoading,
    error,
    successMessage,
    isOutOfStock,
    availableStock,
    formattedSizes,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  } = useProductDetailViewModel({ productId });

  // Formateador de divisas nativo
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // =========================================================================
  // ESTADOS EXTREMOS (CARGA Y ERROR)
  // =========================================================================
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-950/30 border border-red-900/50 text-red-400 mb-4 text-2xl">
          ⚠️
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3">Producto no encontrado</h2>
        <p className="text-slate-400 max-w-sm mx-auto mb-8 text-sm">
          {error || 'El producto solicitado no existe.'}
        </p>
        <a href="#catalog">
          <Button variant="outline">
            Volver a la Tienda
          </Button>
        </a>
      </div>
    );
  }

  // =========================================================================
  // RENDER DE LA INTERFAZ PRINCIPAL (VISTA DECLARATIVA)
  // =========================================================================
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      
      {/* Botón superior de retorno */}
      <div className="mb-8">
        <a 
          href="#catalog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* 1. SECCIÓN DE IMAGEN */}
        <section className="lg:col-span-6 relative aspect-square rounded-2xl bg-slate-950/40 border border-slate-900 overflow-hidden flex items-center justify-center group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-slate-900/10 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-300" />
          
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none z-15" />
        </section>

        {/* 2. DETALLES DEL PRODUCTO & COMPRA */}
        <section className="lg:col-span-6 flex flex-col justify-center lg:pl-4">
          
          {/* Categoría y Disponibilidad */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-cyan-400 uppercase border border-slate-800">
              {product.category}
            </span>
            <Badge 
              variant={isOutOfStock ? 'danger' : 'success'} 
              dot={!isOutOfStock} 
              size="sm"
            >
              {isOutOfStock ? 'Sin Existencias' : 'Disponible'}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {product.title}
          </h1>
          
          {/* Valoración (Rating) */}
          {product.rating && (
            <div className="flex items-center gap-3 mb-6 bg-slate-900/30 w-fit px-3 py-1.5 rounded-lg border border-slate-900">
              <RatingStars rating={product.rating.rate} readOnly size="sm" />
              <span className="text-xs font-bold text-slate-300">{product.rating.rate}</span>
              <span className="h-3 w-px bg-slate-800" />
              <span className="text-[11px] font-medium text-slate-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}

          {/* Precio */}
          <div className="mb-6 pb-6 border-b border-slate-900">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-slate-500 font-semibold ml-2">USD + Impuestos</span>
          </div>

          {/* Descripción */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Selector de Tallas */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <SizeSelector
                sizes={formattedSizes}
                selectedSize={selectedSize}
                onSizeChange={handleSizeChange}
              />
            </div>
          )}

          {/* Selector de Cantidad */}
          <div className="mb-8 space-y-3">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block">
              Cantidad
            </span>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <Button
                  variant="ghost"
                  size="sm"
                  hasShadow={false}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="rounded-none h-11 px-4 hover:bg-slate-900"
                >
                  -
                </Button>
                <span className="px-6 font-extrabold text-slate-300 text-base">
                  {isOutOfStock ? 0 : quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  hasShadow={false}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={availableStock <= 0 || isOutOfStock}
                  className="rounded-none h-11 px-4 hover:bg-slate-900"
                >
                  +
                </Button>
              </div>

              {/* Info de Disponibilidad */}
              {product.stock > 0 ? (
                <span className="text-xs text-slate-500 font-semibold">
                  {availableStock} disponibles para esta variante.
                </span>
              ) : (
                <span className="text-xs text-red-500 font-extrabold uppercase tracking-wide">
                  Agotado temporalmente
                </span>
              )}
            </div>
          </div>

          {/* Mensajes semánticos de error y éxito */}
          {error && (
            <div className="p-4 mb-6 bg-red-950/20 border-l-2 border-red-500 text-red-400 text-xs font-semibold rounded-r-xl border border-red-900/30 animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          {successMessage && (
            <div className="p-4 mb-6 bg-emerald-950/20 border-l-2 border-emerald-500 text-emerald-400 text-xs font-semibold rounded-r-xl border border-emerald-900/30 animate-fade-in">
              🎉 ¡Agregado con éxito al carrito, bro!
            </div>
          )}

          {/* Botón de compra */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            disabled={availableStock <= 0 || isOutOfStock}
            className="py-4 text-sm tracking-wider uppercase font-black flex items-center justify-center gap-2.5"
          >
            <ShoppingCart className="w-4 h-4" />
            {isOutOfStock 
              ? 'Agotado' 
              : availableStock <= 0 
              ? 'Sin Stock Disponible' 
              : 'Añadir al Carrito'
            }
          </Button>

          {/* Sellos de garantía */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-900 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-blue-400 mb-2" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Envío rápido</span>
              <span className="text-[9px] text-slate-500 mt-0.5">Seguimiento incluido</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mb-2" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Garantía</span>
              <span className="text-[9px] text-slate-500 mt-0.5">Compra 100% segura</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-5 h-5 text-blue-400 mb-2" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Cambio fácil</span>
              <span className="text-[9px] text-slate-500 mt-0.5">30 días de cobertura</span>
            </div>
          </div>

        </section>
        
      </div>
    </main>
  );
}