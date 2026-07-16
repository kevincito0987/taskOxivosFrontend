import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS_MOCK } from '../data/products';
import type { Product } from '../types';

export function useProductListViewModel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // =========================================================================
  // EXTRAER PARÁMETROS DE LA URL
  // =========================================================================
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'featured';

  // Extraer las categorías únicas disponibles en el mock
  const categories = useMemo(() => {
    const rawCategories = PRODUCTS_MOCK.map((p) => p.category);
    return ['all', ...Array.from(new Set(rawCategories))];
  }, []);

  // =========================================================================
  // CONTROLADOR DE EFECTO (ESTADO DE CARGA)
  // =========================================================================
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy]);

  // =========================================================================
  // CONTROLADORES DE ACCIONES (MUTADORES DE ESTADO EN URL)
  // =========================================================================
  const updateFilter = (key: string, value: string) => {
    setIsLoading(true); // Encendemos el esqueleto inmediatamente al interactuar
    const newParams = new URLSearchParams(searchParams);
    
    if (value && value !== 'all' && value !== 'featured') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setIsLoading(true);
    setSearchParams(new URLSearchParams());
  };

  // =========================================================================
  // PROCESAMIENTO FILTRADO & ORDENADO (MEMORIZADO)
  // =========================================================================
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_MOCK];

    // 1. Filtrado por cadena de texto
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // 2. Filtrado por categoría
    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Criterios de ordenamiento
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Retornamos la API pública de la ViewModel
  return {
    searchQuery,
    selectedCategory,
    sortBy,
    categories,
    isLoading,
    filteredProducts,
    updateFilter,
    handleClearFilters,
  };
}