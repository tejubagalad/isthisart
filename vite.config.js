import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external access
    allowedHosts: [
      "localhost",
      ".ngrok-free.app" // Allows any ngrok tunnel
    ]
  }
})
