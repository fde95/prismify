import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // Remova o additionalData se você usa @use no main.scss
        api: 'modern-compiler' // Use a API moderna do SASS
      },
    },
  },

  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue"],
        },
      },
    },
  },

  server: {
    port: 5173,
    open: true,
    cors: true,
  },

  preview: {
    port: 4173,
    open: true,
  },
});