// src/hooks/useCart.ts
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export function useCart() {
  const context = useContext(CartContext);
  
  // Si se intenta usar el hook fuera del Provider, lanzamos un error descriptivo
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}