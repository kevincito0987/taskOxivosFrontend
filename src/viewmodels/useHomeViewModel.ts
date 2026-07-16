// src/viewmodels/useHomeViewModel.ts
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importamos el hook de navegación
import { PRODUCTS_MOCK } from '../data/products';

export function useHomeViewModel() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // 👈 Inicializamos el navegador

  // Simulación de carga asíncrona para lucir los esqueletos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Selección optimizada de productos destacados
  const featuredProducts = useMemo(() => {
    const highRated = PRODUCTS_MOCK.filter(
      (product) => (product.rating?.rate ?? 0) >= 4.5
    );
    
    return highRated.length >= 3 ? highRated.slice(0, 4) : PRODUCTS_MOCK.slice(0, 4);
  }, []);

  // 👈 Ahora redirige físicamente a la página de productos en vez de hacer scroll local
  const handleExploreCatalog = () => {
    navigate('/products');
  };

  const handleNewsletterSubmit = (email: string) => {
    console.log('Registrando desarrollador en newsletter:', email);
    alert('¡Te has registrado con éxito, bro! Atento a tu bandeja.');
  };

  return {
    isLoading,
    featuredProducts,
    handleExploreCatalog,
    handleNewsletterSubmit,
  };
}