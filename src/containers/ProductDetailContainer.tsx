// src/components/product/ProductDetailContainer.tsx
import { useState } from "react";
import { useProductDetailViewModel } from "../viewmodels/useProductDetailViewModel";
import { ProductDetailSkeleton } from "../components/common/Skeletons";
import { RatingStars } from "../components/common/RatingStars";
import { SizeSelector } from "../components/product/SizeSelector";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { ShoppingCart, ArrowLeft, MessageSquare, Send } from "lucide-react";

interface ProductDetailContainerProps {
  productId: string;
}

interface UserReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const USD_TO_COP_RATE = 4000;

export function ProductDetailContainer({
  productId,
}: ProductDetailContainerProps) {
  const {
    product,
    selectedSize,
    quantity,
    isLoading,
    error,
    successMessage,
    isOutOfStock,
    availableStock,
    formattedSizes,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  } = useProductDetailViewModel({ productId });

  // 🌟 ESTADOS PARA EL MANEJO DINÁMICO DE RATING Y COMENTARIOS
  const [userRating, setUserRating] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>("");
  const [reviews, setReviews] = useState<UserReview[]>([
    {
      id: "1",
      user: "Anonymous Dev",
      rating: 5,
      comment:
        "La calidad del material es increíble, ideal para largas jornadas programando.",
      date: "Hace 2 días",
    },
  ]);

  const formatPrice = (value: number) => {
    return (
      new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(value * USD_TO_COP_RATE) + " COP"
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0)
      return alert("Por favor, selecciona una calificación en estrellas, bro.");
    if (!commentText.trim()) return;

    const newReview: UserReview = {
      id: Date.now().toString(),
      user: "You (Dev Context)",
      rating: userRating,
      comment: commentText,
      date: "Ahora mismo",
    };

    setReviews([newReview, ...reviews]);
    setCommentText("");
    setUserRating(0); // Resetear
  };

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetailSkeleton />
      </div>
    );
  if (!product)
    return (
      <div className="text-center py-20 text-white">Producto no encontrado</div>
    );

  // Calculamos el promedio dinámico sumando las reviews del estado local
  const totalReviewsCount = product.rating
    ? product.rating.count + reviews.length
    : reviews.length;
  const averageRating = product.rating ? product.rating.rate : 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="mb-8">
        <a
          href="#catalog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* IMAGEN */}
        <section className="lg:col-span-6 relative aspect-square rounded-2xl bg-slate-950/40 border border-slate-900 overflow-hidden flex items-center justify-center group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </section>

        {/* DETALLES */}
        <section className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-cyan-400 uppercase border border-slate-800">
              {product.category}
            </span>
            <Badge
              variant={isOutOfStock ? "danger" : "success"}
              dot={!isOutOfStock}
              size="sm"
            >
              {isOutOfStock ? "Sin Existencias" : "Disponible"}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {product.title}
          </h1>

          {/* Muestra del Score global consolidado */}
          <div className="flex items-center gap-3 mb-6 bg-slate-900/30 w-fit px-3 py-1.5 rounded-lg border border-slate-900">
            <RatingStars rating={averageRating} readOnly size="sm" />
            <span className="text-xs font-bold text-slate-300">
              {averageRating.toFixed(1)}
            </span>
            <span className="h-3 w-px bg-slate-800" />
            <span className="text-[11px] font-medium text-slate-500">
              ({totalReviewsCount} reviews)
            </span>
          </div>

          <div className="mb-6 pb-6 border-b border-slate-900">
            <span className="text-3xl font-black text-white">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            {product.description}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <SizeSelector
                sizes={formattedSizes}
                selectedSize={selectedSize}
                onSizeChange={handleSizeChange}
              />
            </div>
          )}

          {/* CANTIDAD */}
          <div className="mb-8 space-y-3">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block">
              Cantidad
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-800 rounded-xl bg-slate-950">
                <Button
                  variant="ghost"
                  size="sm"
                  hasShadow={false}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="h-11 px-4"
                >
                  -
                </Button>
                <span className="px-6 font-extrabold text-slate-300">
                  {isOutOfStock ? 0 : quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  hasShadow={false}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={availableStock <= 0 || isOutOfStock}
                  className="h-11 px-4"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* 🌟 CORRECCIÓN AQUÍ: Pasamos el icono por prop nativa e incrementamos el padding vertical */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            disabled={availableStock <= 0 || isOutOfStock}
            icon={<ShoppingCart className="w-4 h-4" />}
            className="py-4 text-sm font-black uppercase tracking-wider"
          >
            Añadir al Carrito
          </Button>
        </section>
      </div>

      {/* =========================================================================
          SECCIÓN NUEVA: SISTEMA INTERACTIVO DE FEEDBACK & REVIEWS DE OXIVOS
          ========================================================================= */}
      <section className="mt-20 pt-10 border-t border-slate-900 max-w-4xl">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 mb-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          Feedback del Producto
        </h2>
        <p className="text-xs text-slate-500 mb-8">
          Deja tu review técnica del drop o lee lo que opina la comunidad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Formulario de Votación */}
          <form
            onSubmit={handleReviewSubmit}
            className="md:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-200">
              Añadir tu Calificación
            </h3>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Tu Puntuación
              </label>
              <RatingStars
                rating={userRating}
                readOnly={false}
                size="lg"
                onChange={(val) => setUserRating(val)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Comentario
              </label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="¿Qué tal te pareció el fit o la calidad del código, bro?..."
                rows={3}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 resize-none transition-all"
                required
              />
            </div>

            {/* 🌟 CORRECCIÓN AQUÍ: Pasamos el icono por la prop iconRight nativa */}
            <Button
              type="submit"
              variant="outline"
              size="sm"
              iconRight={<Send className="w-3 h-3" />}
              className="w-full h-10 text-xs uppercase font-extrabold tracking-wider"
            >
              Enviar Review
            </Button>
          </form>

          {/* Feed de Comentarios */}
          <div className="md:col-span-7 space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl bg-slate-950/20 border border-slate-900 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    {rev.user}
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold">
                    {rev.date}
                  </span>
                </div>
                <RatingStars rating={rev.rating} readOnly size="sm" />
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
