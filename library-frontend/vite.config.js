import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configure Vite to handle font files
  build: {
    assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
  },
});
