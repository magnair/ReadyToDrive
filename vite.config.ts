import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ReadyToDrive/', // Replace with your repo name
  build: {
    outDir: 'dist',
  },
})
