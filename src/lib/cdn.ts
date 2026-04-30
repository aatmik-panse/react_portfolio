export const CDN_BASE = 'https://aatmik.de';

export function cdnUrl(filename: string): string {
  const clean = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${CDN_BASE}/${clean}`;
}

export const cdn = {
  hero: cdnUrl('1.jpg'),
} as const;
