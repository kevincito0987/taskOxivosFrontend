import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  inStock?: boolean;  // Propiedad clave para evaluar stock rápidamente[cite: 2]
  size?: 'xs' | 'sm' | 'md';
  dot?: boolean;      // Agrega un circulito indicador animado
}

export function Badge({
  children,
  variant,
  inStock,
  size = 'sm',
  dot = true,
  className,
  ...props
}: BadgeProps) {
  
  // 1. Si el usuario pasa la prop 'inStock', sobreescribimos la variante automáticamente[cite: 2]
  let activeVariant = variant || 'neutral';
  let badgeText = children;

  if (typeof inStock === 'boolean') {
    activeVariant = inStock ? 'success' : 'danger';
    badgeText = inStock ? 'En Stock' : 'Agotado';
  }

  // 2. Estilos base
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide transition-all duration-150';

  // 3. Tamaños
  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-sm',
  };

  // 4. Mapeo de colores estéticos para modo oscuro (fondo semitransparente + texto brillante)
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/25',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/25',
    info: 'bg-sky-500/10 text-sky-400 border border-sky-500/25',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700',
  };

  // 5. Colores para el dot indicador (glowing effect)
  const dotColors = {
    success: 'bg-emerald-400',
    danger: 'bg-rose-400',
    warning: 'bg-amber-400',
    info: 'bg-sky-400',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        baseStyles,
        sizes[size],
        variants[activeVariant],
        className
      )}
      {...props}
    >
      {/* Círculo indicador con animación de pulso si dot es true */}
      {dot && (
        <span className="relative flex h-2 w-2 mr-1.5">
          {/* Animación ping (solo para éxitos, advertencias o información para no saturar) */}
          {activeVariant !== 'danger' && activeVariant !== 'neutral' && (
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotColors[activeVariant])}></span>
          )}
          <span className={cn("relative inline-flex rounded-full h-2 w-2", dotColors[activeVariant])}></span>
        </span>
      )}
      
      {badgeText}
    </span>
  );
}