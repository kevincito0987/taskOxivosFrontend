// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';

// Importación de tus componentes de diseño global
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Contenedor flexible para garantizar que el Footer siempre quede al fondo */}
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
        
        {/* 1. Header persistente en todas las vistas */}
        <Header />

        {/* 2. Área de contenido dinámico de las páginas */}
        <div className="flex-grow">
          <Routes>
            {/* Ruta principal: Landing / HomePage */}
            <Route path="/" element={<HomePage />} />

            {/* Listado del Catálogo de Productos */}
            <Route path="/products" element={<ProductsPage />} />

            {/* Detalle Dinámico de Producto */}
            <Route path="/product/:id" element={<ProductDetailPage />} />

            {/* Carrito de Compras */}
            <Route path="/cart" element={<CartPage />} />

            {/* Redirección de seguridad para páginas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* 3. Footer persistente en todas las vistas */}
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}