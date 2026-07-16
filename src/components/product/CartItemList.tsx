// src/components/product/CartItemList.tsx
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import type { CartItem } from '../../types';

interface CartItemListProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string | null, quantity: number) => void;
  onRemove: (productId: string, size: string | null) => void;
}

export function CartItemList({ items, onUpdateQuantity, onRemove }: CartItemListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={`${item.product.id}-${item.selectedSize}`}
          className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/85"
        >
          {/* Imagen del Producto */}
          <div className="w-20 h-20 rounded-lg bg-slate-950 overflow-hidden flex-shrink-0 border border-slate-800">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detalles del Producto */}
          <div className="flex-grow text-center sm:text-left min-w-0">
            <h4 className="font-bold text-slate-100 text-base truncate">{item.product.title}</h4>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{item.product.category}</p>
            {item.selectedSize && (
              <div className="mt-2">
                {/* Badge en variante neutral y sin dot indicador */}
                <Badge variant="neutral" dot={false} size="xs">
                  Talla: {item.selectedSize}
                </Badge>
              </div>
            )}
          </div>

          {/* Selector de Cantidades (ghost buttons) */}
          <div className="flex items-center border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
            <Button
              variant="ghost"
              size="sm"
              hasShadow={false}
              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
              className="rounded-none h-9 px-3 hover:bg-slate-900"
            >
              -
            </Button>
            <span className="px-4 font-semibold text-slate-300 text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              hasShadow={false}
              disabled={item.quantity >= item.product.stock}
              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
              className="rounded-none h-9 px-3 hover:bg-slate-900"
            >
              +
            </Button>
          </div>

          {/* Precio Acumulado */}
          <div className="text-center sm:text-right min-w-[110px]">
            <p className="text-lg font-extrabold text-white">
              ${(item.product.price * item.quantity).toLocaleString()} COP
            </p>
            <p className="text-xs text-slate-400">${item.product.price.toLocaleString()} COP c/u</p>
          </div>

          {/* Botón de Remover */}
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemove(item.product.id, item.selectedSize)}
            className="p-2.5 rounded-lg flex items-center justify-center"
            aria-label="Eliminar producto"
          >
            🗑️
          </Button>
        </article>
      ))}
    </div>
  );
}