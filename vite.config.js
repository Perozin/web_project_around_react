import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/web_project_around_react/',   // 👈 SUBSTITUA AQUI PELO NOME DO REPOSITÓRIO
  plugins: [react()],
  server: {
    port: 3000,
  },
});
