import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto expone el servidor a la red (0.0.0.0) para que Docker pueda mapearlo[cite: 2]
    port: 5173, // Asegura que use el puerto que tenemos configurado en VS Code y Docker[cite: 2]
    strictPort: true, // Si el puerto ya está ocupado, da un error en lugar de saltar a otro aleatorio
    watch: {
      usePolling: true, // Crucial para que el Hot Reload funcione dentro de contenedores Docker de forma fluida
    },
  },
});
