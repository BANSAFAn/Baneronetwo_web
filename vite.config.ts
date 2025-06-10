
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ['**/*.glb', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Удалено использование componentTagger, так как функция не определена
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./"),
    },
  },
}));
