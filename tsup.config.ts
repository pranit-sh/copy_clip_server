// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: true,
  dts: false, // set to true if you want .d.ts output
});
