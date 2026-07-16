export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;         // URL de la imagen (de Imgur u otra fuente)
    category: string;      // Ej: 'Shoes', 'Shirts', 'Accessories'
    rating: number;        // De 1 a 5 para el componente de estrellitas
    inStock: boolean;      // Para habilitar/inhabilitar el botón de compra
    sizes?: string[];      // Array de tallas opcional, ej: ['S', 'M', 'L']
    colors?: string[];     // Array de colores opcional, ej: ['#000000', '#FFFFFF']
  }
  
  // Estos dos los necesitaremos más adelante cuando hagamos el carrito de compras, ¡ya los dejas listos!
  export interface CartItem extends Product {
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
  }