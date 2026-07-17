import { useCartViewModel } from "../viewmodels/useCartViewModel";
import { CartItemList } from "../components/product/CartItemList";
import { CartSummary } from "../components/product/CartSummary";
import { EmptyCart } from "../components/product/EmptyCart";
import { Button } from "../components/common/Button";

// Tasa de cambio estática: 1 USD = 4,000 COP
const USD_TO_COP_RATE = 4000;

export function CartContainer() {
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

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  // Mapeamos los artículos dentro del carrito para asegurar que sus propiedades reflejen el valor real en COP
  const cartItemsInCOP = cart.map((item) => {
    // Si el precio ya viene inflado por los componentes anteriores (ej: > 1000), lo dejamos igual;
    // si viene en formato base USD (ej: 85), lo convertimos multiplicando por la tasa.
    const productPrice =
      item.product.price < 1000
        ? item.product.price * USD_TO_COP_RATE
        : item.product.price;
    return {
      ...item,
      product: {
        ...item.product,
        price: productPrice,
      },
    };
  });

  // Ajustamos el subtotal total sumando dinámicamente los ítems ya convertidos
  const totalInCOP = cartItemsInCOP.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encabezado Principal */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Tu Carrito de Compras
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestiona los artículos de tu orden antes de proceder a la pasarela
            de pago.
          </p>
        </div>

        <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 self-start sm:self-auto">
          {cartCount} {cartCount === 1 ? "artículo" : "artículos"}
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

          {/* Pasamos los artículos adaptados a COP reales */}
          <CartItemList
            items={cartItemsInCOP}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
          />
        </section>

        {/* LADO DERECHO: Resumen de Compra Dinámico */}
        <aside className="sticky top-28">
          {/* Pasamos la sumatoria ajustada en COP */}
          <CartSummary
            items={cartItemsInCOP}
            cartTotal={totalInCOP}
            isProcessing={isProcessingCheckout}
            onCheckout={handleCheckout}
          />
        </aside>
      </div>
    </main>
  );
}
