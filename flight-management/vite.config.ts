import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    
    devOptions: {
      enabled: false, 
      type: 'module',
    },
    
    manifest: {
      name: 'Flight Management Dashboard',
      short_name: 'Flight Manager',
      description: 'Professional flight booking and ticket management system',
      theme_color: '#06b6d4',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      orientation: 'portrait-primary',
      icons: [
        {
          src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%2306b6d4" width="192" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100" font-weight="bold" fill="white">FM</text></svg>',
          sizes: '192x192',
          type: 'image/svg+xml',
          purpose: 'any',
        },
        {
          src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%2306b6d4" width="512" height="512"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="300" font-weight="bold" fill="white">FM</text></svg>',
          sizes: '512x512',
          type: 'image/svg+xml',
          purpose: 'any',
        },
      ],
      categories: ['business', 'productivity'],
    },
    
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,svg,png,jpg,json}'],
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 5000000,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\./i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
      ],
    },
  }), cloudflare()],
})