import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 👇👇👇 server 객체가 defineConfig 안으로 들어와야 합니다. 👇👇👇
  server: {
    proxy: {
      // '/api'로 시작하는 요청은 전부 http://localhost:8080/으로 전달됩니다.
      '/api': {
        target: 'http://localhost:8080', // 백엔드 서버 주소
        changeOrigin: true, // CORS 에러를 막기 위해 true로 설정
      }
    }
  }
})