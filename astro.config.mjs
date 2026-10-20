import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  image: {
    layout: 'constrained',
    breakpoints: [390, 640, 960, 1440, 1920],
  },
  devToolbar: { enabled: false },
});
