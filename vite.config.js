import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/musicbrainz': {
        target: 'https://musicbrainz.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/musicbrainz/, ''),
      },
      '/api/coverart': {
        target: 'https://coverartarchive.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/coverart/, ''),
      },
    },
  },
});
