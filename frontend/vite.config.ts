import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: '../static/dist', // Send files to Django's static folder
    emptyOutDir: true,        // Clean the folder before building
  },
  base: '/static/dist/',      // Tell React where to find its own JS/CSS files
})