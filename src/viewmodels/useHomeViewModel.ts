import { useState, useEffect, useMemo } from 'react';
import { PRODUCTS_MOCK } from '../data/products';

export function useHomeViewModel() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    
    // Si hay muy pocos con rating alto, tomamos los primeros 4 por defecto
    return highRated.length >= 3 ? highRated.slice(0, 4) : PRODUCTS_MOCK.slice(0, 4);
  }, []);

  const handleExploreCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'catalog'; 
    }
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