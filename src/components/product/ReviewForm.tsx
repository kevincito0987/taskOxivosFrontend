import { useState } from 'react';
import { RatingStars } from '../common/RatingStars'; 
import { Button } from '../common/Button';           

export function ReviewForm() { // Agregamos 'export' para que lo puedas importar donde quieras
  // Empezamos con 0 estrellas (vacío)
  const [userRating, setUserRating] = useState<number>(0);

  const handleSubmit = () => {
    console.log("Calificación guardada con éxito:", userRating);
  };

  return (
    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 max-w-sm">
      <h3 className="text-white font-bold mb-2">¿Qué tal te pareció este producto?</h3>
      
      {/* Componente interactivo */}
      <div className="my-4">
        <RatingStars 
          rating={userRating} 
          readOnly={false} 
          size="lg" 
          onChange={(newRating) => setUserRating(newRating)} 
        />
      </div>

      <p className="text-sm text-slate-400 mb-4">
        Has seleccionado: <span className="text-amber-400 font-bold">{userRating} estrellas</span>
      </p>

      <Button variant="primary" onClick={handleSubmit} disabled={userRating === 0}>
        Enviar Calificación
      </Button>
    </div>
  );
}