import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig ({
  plugins: [react ()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000, // Development port
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace (/^\/api/, ''),
      },
    },
  },
});