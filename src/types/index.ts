
// Tipo de opción para el selector de tallas
export interface SizeOption {
    size: string;
    isAvailable: boolean;
  }
  
  // Representación estricta de un Producto
  export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
    // Inventario total general
    stock: number;
    // Opciones de tallas del producto
    sizes?: SizeOption[];
  }
  
  // Representación de un elemento dentro de nuestro carrito
  export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string | null; // Nulo si el producto no tiene tallas (ej: accesorios)
  }
  
  // Estructura de Filtros y Ordenamiento para la barra de búsquedas
  export interface ProductFilters {
    searchQuery: string;
    category: string;
    sortBy: 'price-asc' | 'price-desc' | 'popular' | 'default';
  }