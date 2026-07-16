import { useParams, Navigate } from 'react-router-dom';
import { ProductDetailContainer } from '../containers/ProductDetailContainer';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Si por alguna razón no hay ID en la URL, redirigimos al catálogo
  if (!id) {
    return <Navigate to="/products" replace />;
  }

  return <ProductDetailContainer productId={id} />;
}