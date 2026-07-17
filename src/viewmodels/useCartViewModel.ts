// src/viewmodels/useCartViewModel.ts
import { useState, useMemo } from "react";
import { useCart } from "../hooks/useCart";
import { USD_TO_COP_RATE } from "../utils/currency"; // 🌟 Importamos la constante utilitaria

export function useCartViewModel() {
  const { cart, cartCount, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const [isProcessingCheckout, setIsProcessingCheckout] =
    useState<boolean>(false);

  // 🌟 Mapeamos los artículos dentro del carrito para asegurar que sus propiedades reflejen el valor real en COP
  const cartItemsInCOP = useMemo(() => {
    return cart.map((item) => {
      // Si el precio ya viene inflado por los componentes anteriores (ej: > 1000), lo dejamos igual;
      // si viene en formato base USD (ej: 85), lo convertimos multiplicando por la tasa.
      const productPrice =
        item.product.price < 1000
          ? item.product.price * USD_TO_COP_RATE
          : item.product.price;
      return {
        ...item,
        product: {
          ...item.product,
          price: productPrice,
        },
      };
    });
  }, [cart]);

  // 🌟 Ajustamos el subtotal total sumando dinámicamente los ítems ya convertidos
  const totalInCOP = useMemo(() => {
    return cartItemsInCOP.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [cartItemsInCOP]);

  const handleUpdateQuantity = (
    productId: string,
    selectedSize: string | null,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      removeFromCart(productId, selectedSize);
      return;
    }
    updateQuantity(productId, selectedSize, newQuantity);
  };

  const handleRemove = (productId: string, selectedSize: string | null) => {
    removeFromCart(productId, selectedSize);
  };

  const handleClear = () => {
    if (
      window.confirm("¿Estás seguro de que quieres vaciar tu carrito, bro?")
    ) {
      clearCart();
    }
  };

  const handleCheckout = async () => {
    if (cartItemsInCOP.length === 0) return;

    setIsProcessingCheckout(true);
    try {
      console.log(
        "Iniciando checkout de los siguientes artículos:",
        cartItemsInCOP
      );

      // Simulación de pasarela de pago (retraso de 2s)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("¡Pedido procesado con éxito! Gracias por tu compra.");
      clearCart();
    } catch (error) {
      console.error("Error al procesar el checkout:", error);
      alert(
        "Hubo un error al procesar tu compra. Por favor, intenta de nuevo."
      );
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  return {
    cartItemsInCOP, // 🌟 Pasamos los ítems ya adaptados
    totalInCOP, // 🌟 Pasamos la sumatoria ajustada numéricamente
    cartCount,
    isProcessingCheckout,
    handleUpdateQuantity,
    handleRemove,
    handleClear,
    handleCheckout,
  };
}
