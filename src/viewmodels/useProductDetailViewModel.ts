import { useState, useEffect, useMemo } from 'react';
import { PRODUCTS_MOCK } from '../data/products';
import { useCart } from '../hooks/useCart';
import type { Product } from '../types';

interface UseProductDetailViewModelProps {
  productId: string;
}

export function useProductDetailViewModel({ productId }: UseProductDetailViewModelProps) {
  const { addToCart, cart } = useCart();

  // Estados locales de la vista de detalle
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  // =========================================================================
  // EFECTO DE FETCHING CON SIMULACIÓN DE RETRASO
  // =========================================================================
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Retraso para simular petición de red y lucir el esqueleto
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const foundProduct = PRODUCTS_MOCK.find((p) => p.id === productId);

        if (foundProduct) {
          setProduct(foundProduct);
          // Auto-seleccionar la primera talla disponible si aplica
          const firstAvailable = foundProduct.sizes?.find((s) => s.isAvailable);
          if (firstAvailable) {
            setSelectedSize(firstAvailable.size);
          }
        } else {
          setError('El producto solicitado no está disponible.');
        }
      } catch (err) {
        setError('Ocurrió un error al cargar el producto.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // =========================================================================
  // LÓGICA DE NEGOCIO Y OPERACIONES DE STOCK
  // =========================================================================
  
  // Saber si el producto en general no tiene inventario
  const isOutOfStock = useMemo(() => {
    if (!product) return true;
    return product.stock === 0;
  }, [product]);

  // Consultar cuántas unidades de este producto con esta talla específica están ya en el carrito
  const quantityInCart = useMemo(() => {
    if (!product) return 0;
    const cartItem = cart.find(
      (item) => item.product.id === product.id && item.selectedSize === selectedSize
    );
    return cartItem ? cartItem.quantity : 0;
  }, [cart, product, selectedSize]);

  // Calcular el stock físico neto real disponible para agregar
  const availableStock = useMemo(() => {
    if (!product) return 0;
    return Math.max(0, product.stock - quantityInCart);
  }, [product, quantityInCart]);

  // =========================================================================
  // CONTROLADORES DE EVENTOS
  // =========================================================================
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setError(null);
    setQuantity(1); // Reseteo de seguridad de cantidad elegida al conmutar tallas
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return;

    if (newQty > availableStock) {
      setError(`¡Límite alcanzado! Solo quedan ${availableStock} unidades disponibles (ya tienes ${quantityInCart} en el carrito).`);
      return;
    }

    setError(null);
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Validación de requerimiento de talla
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError('Por favor, selecciona una talla antes de añadir.');
      return;
    }

    // Validación de excedente de stock físico
    if (availableStock <= 0 || isOutOfStock) {
      setError('No hay suficiente inventario disponible.');
      return;
    }

    // Agregar la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }

    setSuccessMessage(true);
    setQuantity(1);
    setError(null);

    // Ocultar banner de éxito tras unos segundos
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  // Mapeo seguro de tallas para el componente visual SizeSelector
  const formattedSizes = useMemo(() => {
    if (!product?.sizes) return [];
    return product.sizes.map((s) => ({
      size: s.size,
      isAvailable: s.isAvailable,
    }));
  }, [product]);

  return {
    product,
    selectedSize,
    quantity,
    isLoading,
    error,
    successMessage,
    isOutOfStock,
    availableStock,
    formattedSizes,
    handleSizeChange,
    handleQuantityChange,
    handleAddToCart,
  };
}