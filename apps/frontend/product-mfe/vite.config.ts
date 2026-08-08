import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'product_mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductApp': './src/App.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
  },
  server: {
    port: 3101,
    strictPort: true,
    cors: true,
  },
});
