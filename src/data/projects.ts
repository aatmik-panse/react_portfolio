export type Project = {
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  live?: string;
};

export const featuredProjects: Project[] = [
  {
    title: 'PhotoSage',
    description:
      'iOS app for private, ultra-fast photo search. On-device ML using CLIP - search your camera roll with natural language. 100 installs in the first week.',
    tech: ['Swift', 'SwiftUI', 'CLIP', 'CoreML'],
  },
  {
    title: 'redisInGO',
    description:
      'A toy Redis server reimplemented in Go. RESP protocol, expiry, and core commands - built to learn the wire format and event loop from scratch.',
    tech: ['Go', 'TCP', 'RESP'],
    repo: 'https://github.com/aatmik-panse/redisInGO',
  },
  {
    title: 'chrome-reader',
    description:
      'Chrome extension that strips ads, sidebars, and clutter from any article for a clean reading layout. Tiny content-script footprint, TypeScript end-to-end.',
    tech: ['TypeScript', 'Chrome Extensions', 'MV3'],
    repo: 'https://github.com/aatmik-panse/chrome-reader',
  },
  {
    title: 'Bulky',
    description:
      'Shopify app for bulk AI-generated product images and virtual try-on. Helps merchants ship clean, on-brand storefront imagery without studio shoots.',
    tech: ['JavaScript', 'Shopify', 'Python', 'AI'],
    repo: 'https://github.com/aatmik-panse/tryonforshopify',
    live: 'https://apps.shopify.com/vto',
  },
];

export type OssRepo = {
  name: string;
  url: string;
};

export const ossHighlights: OssRepo[] = [
  {
    name: 'chrome-reader',
    url: 'https://github.com/aatmik-panse/chrome-reader',
  },
  {
    name: 'shopify-openenv-rl',
    url: 'https://github.com/aatmik-panse/shopify-openenv-rl',
  },
  {
    name: 'whisper-flow',
    url: 'https://github.com/aatmik-panse/whisper-flow',
  },
];
