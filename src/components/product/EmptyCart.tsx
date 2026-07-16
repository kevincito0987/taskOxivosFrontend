// src/components/product/EmptyCart.tsx
import { Button } from '../common/Button';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      {/* Icono animado con colores oscuros compatibles */}
      <div className="w-20 h-20 bg-slate-900/50 border border-slate-800 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">🛒</span>
      </div>

      {/* Textos de advertencia */}
      <h2 className="text-2xl font-extrabold text-slate-100 mb-2">
        Tu carrito está vacío, bro
      </h2>
      <p className="text-slate-400 max-w-sm mb-8 leading-relaxed text-sm">
        Parece que aún no has añadido ninguna de nuestras prendas o accesorios exclusivos a tu colección.
      </p>

      {/* Botón común estilizado */}
      <a href="/products">
        <Button variant="primary" size="md">
          Explorar Catálogo
        </Button>
      </a>
    </div>
  );
}