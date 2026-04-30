import { describe, it, expect } from 'vitest';
import { CDN_BASE, cdnUrl, cdn } from '../lib/cdn';

describe('CDN module', () => {
  it('CDN_BASE points to the apex aatmik.de', () => {
    expect(CDN_BASE).toBe('https://aatmik.de');
  });

  it('cdnUrl prepends the base to a given filename', () => {
    expect(cdnUrl('1.jpg')).toBe('https://aatmik.de/1.jpg');
    expect(cdnUrl('/2.jpg')).toBe('https://aatmik.de/2.jpg');
  });

  it('cdn.hero is the confirmed-uploaded 1.jpg', () => {
    expect(cdn.hero).toBe('https://aatmik.de/1.jpg');
  });
});
