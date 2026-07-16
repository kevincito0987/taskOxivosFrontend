import { createContext, useState, useEffect, useContext } from 'react';
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

// 2. Solución al ESLint: Quitamos el 'export' de aquí para que no chille Fast Refresh
const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('oxivos_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('oxivos_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selectedSize: string | null) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        const existingItem = prevCart[existingItemIndex];
        const newQuantity = existingItem.quantity + 1;

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

  const removeFromCart = (productId: string, selectedSize: string | null) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

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

  const clearCart = () => setCart([]);

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

// 3. El Hook personalizado: Es una función (permitida por Fast Refresh) y centraliza el uso del contexto
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
}