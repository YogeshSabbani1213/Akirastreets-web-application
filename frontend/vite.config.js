import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// WHY: This plugin lets Vite process Tailwind CSS using the official Vite integration.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
