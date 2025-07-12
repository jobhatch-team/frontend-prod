import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  server: {
    host: true, // Allow external connections
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://backend-prod-team-jobhatchs-projects.vercel.app',
        changeOrigin: true,
        secure: true,
        configure: (proxy, options) => {
          console.log('[VITE-PROXY] Configuring proxy for /api -> https://backend-prod-team-jobhatchs-projects.vercel.app');
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[VITE-PROXY] Proxying: ${req.method} ${req.url} -> ${proxyReq.getHeader('host')}${proxyReq.path}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[VITE-PROXY] Response: ${req.method} ${req.url} -> ${proxyRes.statusCode}`);
          });
          proxy.on('error', (err, req, res) => {
            console.error(`[VITE-PROXY] Error: ${req.method} ${req.url}`, err.message);
          });
        },
      },
    },
  },
});

