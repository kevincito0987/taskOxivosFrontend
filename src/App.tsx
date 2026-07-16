// src/App.tsx
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Inyectamos nuestro ruteador global */}
      <AppRoutes />
    </div>
  );
}

export default App;