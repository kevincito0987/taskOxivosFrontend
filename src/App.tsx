import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
          {/* Inyectamos nuestro ruteador global */}
          <AppRoutes />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
