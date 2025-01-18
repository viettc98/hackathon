import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from '@rollup/plugin-inject'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer/", "Buffer"] })],
    },
  },
  define: {
    'process.env': {}
  }
});
