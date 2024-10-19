import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on mode
  const env = loadEnv(mode, __dirname);

  const envPrefix = 'VITE_';
  const processEnv = {};
  
  // Only include VITE_ prefixed env variables
  Object.keys(env).forEach(key => {
    if (key.startsWith(envPrefix)) {
      processEnv[key] = env[key];
    }
  });

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'esbuild',
    },
    server: {
      port: 3000,
      proxy: mode === 'development' ? {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
      } : undefined,
    },
    define: {
      // Properly stringify environment variables
      __ENV__: JSON.stringify(processEnv),
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});