import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './components')
    }
  },
  server: {
    host: true,
    port: 5174,
    open: true,
    allowedHosts: ['.railway.app', '.be1st.io', 'localhost'],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  preview: {
    host: true,
    port: process.env.PORT || 4174,
    allowedHosts: true
  }
});