// src/components/product/CartContainer.tsx
import { useCartViewModel } from '../viewmodels/useCartViewModel';
import { CartItemList } from '../components/product/CartItemList';
import { CartSummary } from '../components/product/CartSummary';
import { EmptyCart } from '../components/product/EmptyCart';
import { Button } from '../components/common/Button';

export function CartContainer() {
  // Consumimos la ViewModel específica del carrito
  const {
    cart,
    cartCount,
    cartTotal,
    isProcessingCheckout,
    handleUpdateQuantity,
    handleRemove,
    handleClear,
    handleCheckout,
  } = useCartViewModel();

  // 1. Estado Vacío: Renderiza tu componente premium EmptyCart
  if (cart.length === 0) {
    return <EmptyCart />;
  }

  // 2. Estado Activo: UI declarativa y limpia
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encabezado Principal */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Tu Carrito de Compras
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestiona los artículos de tu orden antes de proceder a la pasarela de pago.
          </p>
        </div>
        
        {/* Contador rápido en texto */}
        <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 self-start sm:self-auto">
          {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LADO IZQUIERDO: Listado de Items & Acciones */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center bg-slate-950/30 p-4 rounded-xl border border-slate-900">
            <h2 className="text-sm font-bold tracking-widest text-slate-200 uppercase">
              Artículos en tu orden
            </h2>
            
            <Button 
              variant="ghost"
              size="sm"
              hasShadow={false}
              onClick={handleClear}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg"
            >
              Vaciar carrito
            </Button>
          </div>

          {/* Componente del Listado */}
          <CartItemList 
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
          />
        </section>

        {/* LADO DERECHO: Resumen de Compra Dinámico */}
        <aside className="sticky top-28">
          <CartSummary 
            items={cart}
            cartTotal={cartTotal}
            isProcessing={isProcessingCheckout}
            onCheckout={handleCheckout}
          />
        </aside>
      </div>
    </main>
  );
}