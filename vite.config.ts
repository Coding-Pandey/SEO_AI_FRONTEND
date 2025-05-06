import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all interfaces so it's accessible externally
    port: 5173       // Optional: can be omitted if default is okay
  }
})

