import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

// ==========================================
// 1. COMPONENTE PRIMITIVO BASE (SKELETON)
// ==========================================
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangle' | 'circle' | 'text';
}

export function Skeleton({
  variant = 'rectangle',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        // Efecto pulse sutil usando los tonos slate oscuros que van con tu UI
        'animate-pulse bg-slate-800/50 rounded-lg border border-slate-700/20',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 w-full rounded-md',
        className
      )}
      {...props}
    />
  );
}

// ==========================================
// 2. COMPONENTE COMPUESTO: CARD SKELETON
// ==========================================
// Este simula exactamente tu tarjeta de producto individual
export function ProductCardSkeleton() {
  return (
    <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-900 flex flex-col gap-4 w-full max-w-sm">
      {/* Contenedor de la imagen */}
      <Skeleton className="aspect-square w-full rounded-xl" />

      {/* Categoría y Badge de stock */}
      <div className="flex justify-between items-center">
        <Skeleton variant="text" className="w-1/3 h-3" />
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>

      {/* Título del producto */}
      <div className="space-y-2">
        <Skeleton variant="text" className="w-11/12 h-5" />
        <Skeleton variant="text" className="w-3/4 h-3" />
      </div>

      {/* Calificación de estrellitas */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="circle" className="w-4 h-4" />
        ))}
      </div>

      {/* Precio y Botón de Añadir */}
      <div className="flex justify-between items-center mt-2">
        <Skeleton variant="text" className="w-1/4 h-6" />
        <Skeleton className="w-24 h-9 rounded-lg" />
      </div>
    </div>
  );
}

// ==========================================
// 3. COMPONENTE COMPUESTO: DETAIL SKELETON
// ==========================================
// Este simula la página detallada de un producto
export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto p-4">
      {/* Columna Izquierda: Imagen del producto */}
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full aspect-square rounded-2xl" />
        {/* Carrusel de miniaturas (thumbnails) */}
        <div className="flex gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-20 aspect-square rounded-lg" />
          ))}
        </div>
      </div>

      {/* Columna Derecha: Información y Compra */}
      <div className="flex flex-col gap-5 justify-center">
        <div className="space-y-2">
          {/* Badge */}
          <Skeleton className="w-20 h-6 rounded-full" />
          {/* Título */}
          <Skeleton variant="text" className="w-10/12 h-8" />
          {/* Calificación */}
          <div className="flex gap-1 items-center">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} variant="circle" className="w-4 h-4" />
              ))}
            </div>
            <Skeleton variant="text" className="w-10 h-4" />
          </div>
        </div>

        {/* Precio */}
        <Skeleton variant="text" className="w-1/3 h-8" />

        {/* Descripción corta */}
        <div className="space-y-2">
          <Skeleton variant="text" className="w-full h-3" />
          <Skeleton variant="text" className="w-full h-3" />
          <Skeleton variant="text" className="w-4/5 h-3" />
        </div>

        <hr className="border-slate-900 my-1" />

        {/* Selectores de Talla/Color */}
        <div className="space-y-3">
          <Skeleton variant="text" className="w-24 h-4" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-md" />
            ))}
          </div>
        </div>

        {/* Botón de compra gigante */}
        <Skeleton className="w-full h-12 rounded-xl mt-4" />
      </div>
    </div>
  );
}

// ==========================================
// 4. COMPONENTE COMPUESTO: BANNER SKELETON
// ==========================================
export interface BannerSkeletonProps {
  isLoading?: boolean;
}

export function BannerSkeleton({ isLoading = true }: BannerSkeletonProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/85 min-h-[220px] flex flex-col justify-center p-8 md:p-12 mb-8 shadow-2xl">
      
      {/* 1. Imagen de fondo corporativa con overlay azul oscuro */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] mix-blend-luminosity filter blur-[1px]"
        style={{ backgroundImage: "url('/src/assets/images/skeleton.jpg')" }}
      />
      {/* Radial glow azul de Oxivos */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(30,58,138,0.45),transparent_65%)]" />

      {/* 2. Contenido del banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Lado izquierdo: Logo e información */}
        <div className="space-y-4 max-w-2xl">
          {/* Fila del logo de Oxivos */}
          <div className="flex items-center gap-4">
            {/* Logo de Oxivos con su resplandor azul */}
            <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.25)] flex-shrink-0">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                OX
              </span>
            </div>
            {/* Títulos */}
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider text-white">
                OXIVOS
              </h2>
              <p className="text-xs tracking-widest text-blue-400 font-semibold">
                MERCADO LIBRE PARTNER AGENCY
              </p>
            </div>
          </div>

          {/* Textos simulados con Skeleton o reales según estado de carga */}
          {isLoading ? (
            <div className="space-y-3 pt-2">
              {/* Badge de Ronda */}
              <Skeleton className="w-40 h-6 rounded-full bg-slate-800/80" />
              {/* Título de la tarea */}
              <Skeleton variant="text" className="w-11/12 h-9 bg-slate-800/80" />
              {/* Párrafo descriptivo */}
              <div className="space-y-2 pt-1">
                <Skeleton variant="text" className="w-full h-3 bg-slate-800/80" />
                <Skeleton variant="text" className="w-5/6 h-3 bg-slate-800/80" />
              </div>
            </div>
          ) : (
            // Contenido Real cuando termina de cargar
            <div className="space-y-3 pt-2 animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase">
                Round 1 · Project Task
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Frontend Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Project Task</span>
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Congratulations on moving to Round 1! 🚀 This is a hands-on task to see how you think, build, and ship. It's a <strong className="text-white font-medium">frontend-only</strong> task using dummy data.
              </p>
            </div>
          )}
        </div>

        {/* Lado derecho decorativo (Opcional) */}
        {isLoading && (
          <div className="hidden lg:block w-32 h-32 rounded-2xl bg-slate-900/40 border border-slate-800/50 animate-pulse" />
        )}
      </div>
    </div>
  );
}