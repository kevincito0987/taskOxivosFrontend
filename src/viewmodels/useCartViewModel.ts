// src/viewmodels/useCartViewModel.ts
import { useState } from 'react';
import { useCart } from '../hooks/useCart';

export function useCartViewModel() {
  const {
    cart,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isProcessingCheckout, setIsProcessingCheckout] = useState<boolean>(false);

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
    if (window.confirm('¿Estás seguro de que quieres vaciar tu carrito, bro?')) {
      clearCart();
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsProcessingCheckout(true);
    try {
      console.log('Iniciando checkout de los siguientes artículos:', cart);
      
      // Simulación de pasarela de pago (retraso de 2s)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      alert('¡Pedido procesado con éxito! Gracias por tu compra.');
      clearCart();
    } catch (error) {
      console.error('Error al procesar el checkout:', error);
      alert('Hubo un error al procesar tu compra. Por favor, intenta de nuevo.');
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  return {
    cart,
    cartCount,
    cartTotal,
    isProcessingCheckout,
    handleUpdateQuantity,
    handleRemove,
    handleClear,
    handleCheckout,
  };
}