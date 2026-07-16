import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextProps {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, selectedSize: string | null) => void;
  removeFromCart: (productId: string, selectedSize: string | null) => void;
  updateQuantity: (productId: string, selectedSize: string | null, quantity: number) => void;
  clearCart: () => void;
}

// Exportamos el contexto silenciando la regla de ESLint de exportación única de componentes
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Inicialización segura del estado con localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('oxivos_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Sincronización automática con localStorage
  useEffect(() => {
    localStorage.setItem('oxivos_cart', JSON.stringify(cart));
  }, [cart]);

  // =========================================================================
  // OPERACIONES DEL CARRITO
  // =========================================================================

  // A. Añadir al carrito controlando stock y variaciones de talla
  const addToCart = (product: Product, selectedSize: string | null) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        const existingItem = prevCart[existingItemIndex];
        const newQuantity = existingItem.quantity + 1;

        // Validación de stock físico real
        if (newQuantity > product.stock) {
          return prevCart; 
        }

        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = { ...existingItem, quantity: newQuantity };
        return updatedCart;
      }

      if (product.stock > 0) {
        return [...prevCart, { product, quantity: 1, selectedSize }];
      }

      return prevCart;
    });
  };

  // B. Eliminar elemento del carrito considerando id y talla
  const removeFromCart = (productId: string, selectedSize: string | null) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  // C. Actualizar cantidades de forma dinámica controlando límites de stock
  const updateQuantity = (productId: string, selectedSize: string | null, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          const validatedQuantity = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validatedQuantity };
        }
        return item;
      })
    );
  };

  // D. Vaciar carrito por completo
  const clearCart = () => setCart([]);

  // =========================================================================
  // VALORES CALCULADOS EN TIEMPO REAL
  // =========================================================================
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}