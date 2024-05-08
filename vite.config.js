import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './src/main.jsx' // Adjust the path to your actual entry point file
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});