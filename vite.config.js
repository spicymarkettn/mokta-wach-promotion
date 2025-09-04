import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Base path for GitHub Pages - use the repository name
      // Change 'mokta-wach-promotion' to your actual repository name
      base: '/mokta-wach-promotion/',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Output directory for the build
        outDir: 'dist',
        // Generate a 404.html file for GitHub Pages SPA routing
        rollupOptions: {
          output: {
            manualChunks: undefined
          }
        }
      }
    };
});