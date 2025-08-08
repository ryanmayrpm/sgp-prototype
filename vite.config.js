import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      // 👇 copy from your Preview tab URL, e.g. 'jt4zn3-5173.csb.app'
      'YOUR-SANDBOX-HOST.csb.app',
    ],
    port: 5173,
    host: true,
    hmr: { clientPort: 443 },
  },
})
