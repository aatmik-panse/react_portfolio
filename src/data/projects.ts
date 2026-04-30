export type ProjectColor = 'lavender' | 'peach' | 'ochre';

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
    title: 'synap',
    description:
      'Personal knowledge graph - links notes, repos, and conversations into a queryable second brain.',
    tech: ['Python', 'LLMs', 'Vector DB'],
    repo: 'https://github.com/aatmik-panse/synap',
    color: 'peach',
  },
  {
    title: 'tryonforshopify',
    description:
      'Shopify app that lets shoppers virtually try on apparel before checkout. Ships with the storefront in <1s LCP.',
    tech: ['JavaScript', 'Shopify', 'Python'],
    repo: 'https://github.com/aatmik-panse/tryonforshopify',
    color: 'ochre',
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
