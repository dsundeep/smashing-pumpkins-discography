import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

const getGithubPagesBasePath = () => {
  let homepage = process.env.npm_package_homepage;

  if (!homepage) {
    try {
      const packageJsonUrl = new URL('./package.json', import.meta.url);
      const packageJson = JSON.parse(readFileSync(packageJsonUrl, 'utf-8'));
      homepage = packageJson.homepage;
    } catch {
      homepage = undefined;
    }
  }

  if (!homepage) {
    return '/smashing-pumpkins-discography/';
  }

  try {
    const path = new URL(homepage).pathname;
    return path.endsWith('/') ? path : `${path}/`;
  } catch {
    return '/';
  }
};

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? getGithubPagesBasePath() : '/',
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
}));
