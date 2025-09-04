import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // String de atalho: todas as requisições para `/api` serão repassadas para o seu servidor de API
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,      
      }
    }
  }
})