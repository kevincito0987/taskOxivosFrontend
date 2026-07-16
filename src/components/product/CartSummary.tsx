// src/components/product/CartSummary.tsx
import { Button } from '../common/Button';
import type { CartItem } from '../../types';

interface CartSummaryProps {
  items: CartItem[];
  cartTotal: number;
  isProcessing: boolean;
  onCheckout: () => void;
}

export function CartSummary({ items, cartTotal, isProcessing, onCheckout }: CartSummaryProps) {
  const shipping = cartTotal > 150000 ? 0 : 15000; // Envío gratis en compras mayores a $150k COP
  const total = cartTotal + shipping;

  return (
    <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 space-y-6">
      <h3 className="text-lg font-bold text-slate-100 pb-2 border-b border-slate-900">
        Resumen del Pedido
      </h3>

      {/* desglose de subtotales */}
      <div className="space-y-3 text-sm text-slate-400">
        <div className="flex justify-between">
          <span>Subtotal ({items.reduce((acc, curr) => acc + curr.quantity, 0)} prod.)</span>
          <span className="font-semibold text-slate-200">${cartTotal.toLocaleString()} COP</span>
        </div>
        
        <div className="flex justify-between">
          <span>Envío</span>
          <span className={shipping === 0 ? "text-emerald-400 font-bold" : "font-semibold text-slate-200"}>
            {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()} COP`}
          </span>
        </div>

        {shipping > 0 && (
          <p className="text-[10px] text-slate-500 text-right">
            ¡Envío gratis en compras mayores a $150,000 COP!
          </p>
        )}

        <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-900">
          <span>Total</span>
          <span>${total.toLocaleString()} COP</span>
        </div>
      </div>

      {/* Botón de Checkout Integrado con el Estado de Carga Nativo */}
      <div className="pt-2">
        <Button
          variant="primary"
          fullWidth
          isLoading={isProcessing}
          onClick={onCheckout}
          className="py-3"
        >
          Proceder al Pago
        </Button>
      </div>
    </div>
  );
}