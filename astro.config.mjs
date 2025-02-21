// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  env: {
    schema: {
      GRAPHQL_API_ENDPOINT: envField.string({
        context: 'client',
        access: 'public',
        optional: false,
      }),
      GRAPHQL_API_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: false,
      }),
    }
  },
  output: "server",
  integrations: [react(), tailwind()],
});