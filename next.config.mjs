import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ESM-compatible way to get __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Start of Change ---
const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.cjs'); // <-- Change .js to .cjs
// --- End of Change ---

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;