// src/viewmodels/useHomeViewModel.ts
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_MOCK } from "../data/products";
import { USD_TO_COP_RATE } from "../utils/currency"; // 🌟 Importamos la constante utilitaria

export function useHomeViewModel() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Simulación de carga asíncrona para lucir los esqueletos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Selección optimizada de productos destacados con transformación a COP integrada
  const featuredProductsInCOP = useMemo(() => {
    const highRated = PRODUCTS_MOCK.filter(
      (product) => (product.rating?.rate ?? 0) >= 4.5
    );

    const baseProducts =
      highRated.length >= 3 ? highRated.slice(0, 4) : PRODUCTS_MOCK.slice(0, 4);

    // 🌟 Mapeamos el precio de los productos destacados para que las vistas manejen números limpios en COP
    return baseProducts.map((product) => ({
      ...product,
      price:
        product.price < 1000 ? product.price * USD_TO_COP_RATE : product.price,
    }));
  }, []);

  const handleExploreCatalog = () => {
    navigate("/products");
  };

  const handleNewsletterSubmit = (email: string) => {
    console.log("Registrando desarrollador en newsletter:", email);
    alert("¡Te has registrado con éxito, bro! Atento a tu bandeja.");
  };

  return {
    isLoading,
    featuredProducts: featuredProductsInCOP, // 🌟 Retorna los destacados con precios reales adaptados
    handleExploreCatalog,
    handleNewsletterSubmit,
  };
}
