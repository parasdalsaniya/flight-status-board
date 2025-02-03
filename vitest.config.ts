import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    css: true,
    coverage: {
      exclude: [
        'src/main.tsx',         // Ignore entry files
        'src/types/**',        // Ignore TypeScript types
        'test/**',            // Ignore test files themselves
        '*.config.js',
        '*.config.ts',
        '*.type.ts',
        'src/**/*.type.ts',
        'vitest.setup.ts',
        'src/vite-env.d.ts',
        'dist/**'
      ],
    },
  },
});
