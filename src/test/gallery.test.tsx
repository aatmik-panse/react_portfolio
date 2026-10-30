import { describe, expect, it } from 'vitest';
import { pages, render, sitemap } from '../entry-server';
import { isGalleryPath } from '../App';
import { buildGalleryJsonLd, buildJsonLd, GALLERY_URL } from '../rfc/seo';
import { photos } from '../rfc/gallery';

describe('gallery', () => {
  it('routes /gallery with or without a trailing slash', () => {
    expect(isGalleryPath('/gallery')).toBe(true);
    expect(isGalleryPath('/gallery/')).toBe(true);
    expect(isGalleryPath('/')).toBe(false);
  });

  it('prerenders every photo with descriptive alt text naming the person', () => {
    const html = render('/gallery/');
    for (const p of photos) {
      expect(p.alt).toMatch(/^Aatmik Panse /);
      expect(html).toContain(`src="${p.src}"`);
      expect(html).toContain(`alt="${p.alt}"`);
    }
  });

  it('stays unlinked from the homepage', () => {
    expect(render('/')).not.toContain('/gallery');
  });

  it('is discoverable through the sitemap with image entries', () => {
    const xml = sitemap();
    expect(xml).toContain(`<loc>${GALLERY_URL}</loc>`);
    for (const p of photos) expect(xml).toContain(`<image:loc>https://www.aatmik.de${p.src}</image:loc>`);
  });

  it('describes the photos as ImageObjects about the person', () => {
    const gallery = buildGalleryJsonLd('2026-10-30')['@graph'][0] as { associatedMedia: { about: unknown }[] };
    expect(gallery.associatedMedia).toHaveLength(photos.length);
    expect(gallery.associatedMedia[0].about).toEqual({ '@id': 'https://www.aatmik.de/#person' });
  });

  it('gives each prerendered page its own canonical URL', () => {
    expect(pages().map((p) => [p.file, p.head.url])).toEqual([
      ['index.html', 'https://www.aatmik.de/'],
      ['gallery/index.html', GALLERY_URL],
    ]);
  });

  it('lists "Aatmik" as an alternate name for first-name searches', () => {
    const person = buildJsonLd('2026-10-30')['@graph'][1] as Record<string, unknown>;
    expect(person.alternateName).toBe('Aatmik');
  });
});
