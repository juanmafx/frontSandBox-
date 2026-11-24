import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { contentSecurityPolicyPlugin } from './tooling/contentSecurityPolicy.ts';

export default defineConfig({
  base: '/frontSandBox-/',
  plugins: [react(), contentSecurityPolicyPlugin()],
  build: {
    outDir: 'build',
    assetsInlineLimit: 0,
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'tooling/**/*.test.ts', 'db/**/*.test.ts'],
    restoreMocks: true,
  },
});
