import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:
      process.env.VITE_MOCK_WS === 'true'
        ? {
            '../services/ws.service': path.resolve(
              __dirname,
              'src/mocks/ws.mock.ts'
            ),
          }
        : undefined,
  },
});
