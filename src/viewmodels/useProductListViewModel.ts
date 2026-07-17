// src/viewmodels/useProductListViewModel.ts
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS_MOCK } from "../data/products";
import { USD_TO_COP_RATE } from "../utils/currency"; // 🌟 Importamos la tasa de cambio
import type { Product } from "../types";

export function useProductListViewModel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "featured";

  const categories = useMemo(() => {
    const rawCategories = PRODUCTS_MOCK.map((p) => p.category);
    return ["all", ...Array.from(new Set(rawCategories))];
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy]);

  const updateFilter = (key: string, value: string) => {
    setIsLoading(true);
    const newParams = new URLSearchParams(searchParams);

    if (value && value !== "all" && value !== "featured") {
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
  // PROCESAMIENTO FILTRADO, CONVERTIDO & ORDENADO (MEMORIZADO)
  // =========================================================================
  const filteredProductsInCOP = useMemo(() => {
    // 1. Mapeamos la lista original convirtiendo los precios base a COP
    let result: Product[] = PRODUCTS_MOCK.map((product) => ({
      ...product,
      price:
        product.price < 1000 ? product.price * USD_TO_COP_RATE : product.price,
    }));

    // 2. Filtrado por cadena de texto
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // 3. Filtrado por categoría
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 4. Criterios de ordenamiento (Ahora funciona perfecto porque todos son valores en COP)
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return {
    searchQuery,
    selectedCategory,
    sortBy,
    categories,
    isLoading,
    filteredProducts: filteredProductsInCOP, // 🌟 Retorna la lista unificada en COP
    updateFilter,
    handleClearFilters,
  };
}
