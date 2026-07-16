// src/components/product/SizeSelector.tsx
import { cn } from '../../utils/cn';

interface SizeOption {
  size: string;
  isAvailable: boolean;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: string | null;
  onSizeChange: (size: string) => void;
  className?: string;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
  className,
}: SizeSelectorProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Label de la sección */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          Select Size
        </span>
        {selectedSize && (
          <span className="text-xs font-semibold text-blue-400 animate-fade-in">
            Selected: {selectedSize}
          </span>
        )}
      </div>

      {/* Contenedor de Botones (Responsivo extremo) */}
      <div 
        className="flex flex-wrap gap-2.5"
        role="radiogroup"
        aria-label="Product size selector"
      >
        {sizes.map(({ size, isAvailable }) => {
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSizeChange(size)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Size ${size}${!isAvailable ? ' - Out of stock' : ''}`}
              className={cn(
                // Base Layout: Botones cuadrados limpios con transiciones suaves
                "relative flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-xs font-bold transition-all duration-200 select-none",
                
                // 1. Estado: Disponible pero NO seleccionado
                isAvailable && !isSelected && "border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50 hover:text-white active:scale-95",
                
                // 2. Estado: SELECCIONADO (Estética premium resplandeciente en azul)
                isSelected && "border-blue-500 bg-blue-600/10 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.15)]",
                
                // 3. Estado: SIN STOCK (Bloqueado y con indicador visual)
                !isAvailable && "border-slate-900/50 bg-slate-950/20 text-slate-600 cursor-not-allowed overflow-hidden"
              )}
            >
              {/* Texto de la talla */}
              <span className={cn(isSelected && "scale-105 transition-transform")}>
                {size}
              </span>

              {/* Línea diagonal decorativa elegante si no hay stock */}
              {!isAvailable && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="h-[1px] w-full max-w-[80%] bg-slate-800/80 rotate-45 transform" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}