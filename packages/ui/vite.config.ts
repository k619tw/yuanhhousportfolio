import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project site
  base: '/yuanhhousportfolio/',
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
