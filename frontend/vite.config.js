import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // tambahkan .jsx di sini
  },
  build: {
    outDir: 'dist'
  },
  server: {
    host: true,
    port: 5173
  }
})
