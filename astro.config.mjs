// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

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
  adapter: cloudflare(),  
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge",
      } : undefined,
    }
  }
});