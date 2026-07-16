import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn'; // Importa la utilidad para mezclar clases

// Definimos las propiedades específicas de nuestro botón flexible
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  fullWidth?: boolean;
  hasShadow?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;          // Icono opcional a la izquierda
  iconRight?: ReactNode;     // Icono opcional a la derecha
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  hasShadow = true,
  isLoading = false,
  icon,
  iconRight,
  className,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  
  // 1. Estilos base compartidos por todos los botones
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none';

  // 2. Variantes de colores (fondo, hover, texto, bordes, anillos de enfoque)
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 focus:ring-slate-700',
    outline: 'bg-transparent border border-slate-700 hover:bg-slate-900/50 hover:border-slate-500 text-slate-300 hover:text-white focus:ring-slate-600',
    danger: 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-slate-900 text-slate-400 hover:text-white focus:ring-slate-800',
  };

  // 3. Tamaños predefinidos (ancho/alto/padding/texto)
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
    none: '', // Por si quieres control total del tamaño desde fuera con className
  };

  // 4. Sombras dinámicas según la variante
  const shadows = hasShadow && !disabled && !isLoading ? {
    primary: 'shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-500/30',
    secondary: 'shadow-md shadow-slate-950/40',
    danger: 'shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-500/30',
    outline: '',
    ghost: '',
  }[variant] : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        shadows,
        fullWidth && 'w-full',
        className // Aquí recibe clases de Tailwind custom para sobreescribir ancho, alto, etc.
      )}
      {...props}
    >
      {/* Spinner Loader si está cargando */}
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Icono izquierdo si existe y no está cargando */}
      {!isLoading && icon && <span className="mr-2 inline-flex">{icon}</span>}
      
      {/* Texto del Botón */}
      <span>{isLoading ? 'Cargando...' : children}</span>

      {/* Icono derecho si existe */}
      {!isLoading && iconRight && <span className="ml-2 inline-flex">{iconRight}</span>}
    </button>
  );
}