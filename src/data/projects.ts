export type ProjectColor = 'lavender' | 'peach' | 'ochre' | 'cream';

export type Project = {
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  live?: string;
  color: ProjectColor;
  date?: string;
};

export const featuredProjects: Project[] = [
  {
    title: 'PhotoSage',
    description:
      'iOS app for private, ultra-fast photo search. On-device ML using CLIP - search your camera roll with natural language. 100 installs in the first week.',
    tech: ['Swift', 'SwiftUI', 'CLIP', 'CoreML'],
    color: 'lavender',
    date: 'Feb 2025',
  },
  {
    title: 'redisInGO',
    description:
      'A toy Redis server reimplemented in Go. RESP protocol, expiry, and core commands - built to learn the wire format and event loop from scratch.',
    tech: ['Go', 'TCP', 'RESP'],
    repo: 'https://github.com/aatmik-panse/redisInGO',
    color: 'peach',
  },
  {
    title: 'synap',
    description:
      'Personal knowledge graph. Links notes, repos, and conversations into a queryable second brain.',
    tech: ['Python', 'LLMs', 'Vector DB'],
    repo: 'https://github.com/aatmik-panse/synap',
    color: 'ochre',
  },
  {
    title: 'Fitz',
    description:
      'Shopify app for bulk AI-generated product images and virtual try-on. Helps merchants ship clean, on-brand storefront imagery without studio shoots.',
    tech: ['JavaScript', 'Shopify', 'Python', 'AI'],
    repo: 'https://github.com/aatmik-panse/tryonforshopify',
    live: 'https://apps.shopify.com/vto',
    color: 'cream',
  },
  {
    title: 'ascend',
    description:
      'Goal-tracking web app. Habits, streaks, and weekly reviews wrapped in a focused single-page surface.',
    tech: ['JavaScript', 'React'],
    repo: 'https://github.com/aatmik-panse/ascend',
    live: 'https://ascend-teal.vercel.app',
    color: 'lavender',
  },
];

export type OssRepo = {
  name: string;
  description: string;
  language: string;
  url: string;
  pushed: string;
};

export const ossHighlights: OssRepo[] = [
  {
    name: 'chrome-reader',
    description: 'Chrome extension for distraction-free reading.',
    language: 'TypeScript',
    url: 'https://github.com/aatmik-panse/chrome-reader',
    pushed: 'Apr 2026',
  },
  {
    name: 'shopify-openenv-rl',
    description: 'RL playground for the Shopify open environment.',
    language: 'Python',
    url: 'https://github.com/aatmik-panse/shopify-openenv-rl',
    pushed: 'Apr 2026',
  },
  {
    name: 'whisper-flow',
    description: 'Streaming voice-to-text pipeline.',
    language: 'JavaScript',
    url: 'https://github.com/aatmik-panse/whisper-flow',
    pushed: 'Jun 2025',
  },
  {
    name: 'redisInGO',
    description: 'A toy Redis server reimplemented in Go.',
    language: 'Go',
    url: 'https://github.com/aatmik-panse/redisInGO',
    pushed: 'May 2025',
  },
  {
    name: 'ascend',
    description: 'Goal-tracking web app - habits, streaks, and weekly reviews.',
    language: 'JavaScript',
    url: 'https://github.com/aatmik-panse/ascend',
    pushed: 'May 2025',
  },
];
