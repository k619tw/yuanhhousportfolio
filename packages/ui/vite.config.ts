import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // User site (yuanhhou.github.io) serves from root
  base: '/',
  build: {
    outDir: 'dist',
    // Uncomment below if you also want library output
    // lib: {
    //   entry: 'src/index.ts',
    //   name: 'YuanhhouUI',
    //   fileName: (format) => `yuanhhou-ui.${format}.js`
    // }
  }
})
