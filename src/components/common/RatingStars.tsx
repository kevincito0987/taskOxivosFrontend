import { useState } from 'react';
import { cn } from '../../utils/cn';

export interface RatingStarsProps {
  rating: number;                    // Valor actual (ej: 3)
  maxStars?: number;                 // Total de estrellas (por defecto 5)
  size?: 'sm' | 'md' | 'lg';         // Tamaño de las estrellas
  readOnly?: boolean;                // Si es true, el usuario no puede interactuar
  onChange?: (rating: number) => void; // Función para actualizar el estado al hacer clic
}

export function RatingStars({
  rating,
  maxStars = 5,
  size = 'md',
  readOnly = true,
  onChange,
}: RatingStarsProps) {
  // Estado local para manejar el efecto "hover" visual cuando el usuario pasa el mouse antes de dar clic
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Mapeo de tamaños con Tailwind
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  // Esta función decide qué valor de estrella pintar en base a si el usuario está haciendo hover o no
  const currentRating = hoverRating !== null ? hoverRating : rating;

  const handleStarClick = (value: number) => {
    if (!readOnly && onChange) {
      onChange(value);
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-1",
        !readOnly && "cursor-pointer" // Puntero de mano si es interactivo
      )}
      onMouseLeave={() => !readOnly && setHoverRating(null)} // Resetear hover al sacar el mouse
    >
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        
        // Determinamos si la estrella debe pintarse rellena o vacía
        const isFilled = starValue <= Math.floor(currentRating);
        
        // Manejamos estrellas intermedias (ej: 4.5) solo en modo lectura
        const isHalf = readOnly && !isFilled && currentRating % 1 !== 0 && starValue === Math.ceil(currentRating);

        return (
          <button
            key={starValue}
            type="button"
            disabled={readOnly}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            className={cn(
              "focus:outline-none transition-transform duration-100 p-0.5",
              !readOnly && "hover:scale-110 active:scale-95" // Microinteracción al interactuar
            )}
            aria-label={`Calificar con ${starValue} de ${maxStars} estrellas`}
          >
            {isHalf ? (
              // Icono de Estrella Media (para calificaciones de lectura como 4.5)
              <svg
                className={cn(starSizes[size], "text-amber-400 fill-amber-400")}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="halfGrad">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#334155" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#halfGrad)"
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            ) : (
              // Icono de Estrella Completa / Vacía
              <svg
                className={cn(
                  starSizes[size],
                  isFilled 
                    ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]" 
                    : "text-slate-700 fill-transparent stroke-slate-600 stroke-2"
                )}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </button>
        );
      })}
      
      {/* Etiqueta numérica opcional de ayuda para accesibilidad (solo modo lectura) */}
      {readOnly && (
        <span className="text-xs font-semibold text-slate-400 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}