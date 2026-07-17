// src/viewmodels/useProductDetailViewModel.ts
import { useState, useEffect, useMemo } from "react";
import { PRODUCTS_MOCK } from "../data/products";
import { useCart } from "../hooks/useCart";
import { USD_TO_COP_RATE } from "../utils/currency"; // 🌟 Importamos la tasa de cambio
import type { Product } from "../types";

interface UseProductDetailViewModelProps {
  productId: string;
}

export function useProductDetailViewModel({
  productId,
}: UseProductDetailViewModelProps) {
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const foundProduct = PRODUCTS_MOCK.find((p) => p.id === productId);

        if (foundProduct) {
          // 🌟 Adaptamos el precio a COP antes de meterlo al estado de la UI
          const adaptedProduct: Product = {
            ...foundProduct,
            price:
              foundProduct.price < 1000
                ? foundProduct.price * USD_TO_COP_RATE
                : foundProduct.price,
          };

          setProduct(adaptedProduct);

          const firstAvailable = adaptedProduct.sizes?.find(
            (s) => s.isAvailable
          );
          if (firstAvailable) {
            setSelectedSize(firstAvailable.size);
          }
        } else {
          setError("El producto solicitado no está disponible.");
        }
      } catch (err) {
        setError("Ocurrió un error al cargar el producto.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const isOutOfStock = useMemo(() => {
    if (!product) return true;
    return product.stock === 0;
  }, [product]);

  const quantityInCart = useMemo(() => {
    if (!product) return 0;
    const cartItem = cart.find(
      (item) =>
        item.product.id === product.id && item.selectedSize === selectedSize
    );
    return cartItem ? cartItem.quantity : 0;
  }, [cart, product, selectedSize]);

  const availableStock = useMemo(() => {
    if (!product) return 0;
    return Math.max(0, product.stock - quantityInCart);
  }, [product, quantityInCart]);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setError(null);
    setQuantity(1);
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return;

    if (newQty > availableStock) {
      setError(
        `¡Límite alcanzado! Solo quedan ${availableStock} unidades disponibles (ya tienes ${quantityInCart} en el carrito).`
      );
      return;
    }

    setError(null);
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError("Por favor, selecciona una talla antes de añadir.");
      return;
    }

    if (availableStock <= 0 || isOutOfStock) {
      setError("No hay suficiente inventario disponible.");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }

    setSuccessMessage(true);
    setQuantity(1);
    setError(null);

    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  const formattedSizes = useMemo(() => {
    if (!product?.sizes) return [];
    return product.sizes.map((s) => ({
      size: s.size,
      isAvailable: s.isAvailable,
    }));
  }, [product]);

  return {
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
  };
}
