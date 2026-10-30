import { describe, expect, it } from 'vitest';
import { buildJsonLd, seo, SITE_URL } from '../rfc/seo';
import { render } from '../entry-server';

describe('structured data', () => {
  const graph = buildJsonLd('2026-10-30')['@graph'];
  const person = graph.find((n) => n['@type'] === 'Person') as Record<string, unknown>;
  const page = graph.find((n) => n['@type'] === 'ProfilePage') as Record<string, unknown>;

  it('describes the person with current employer and profiles', () => {
    expect(person.name).toBe('Aatmik Panse');
    expect(person.jobTitle).toBe('Technical Product Lead');
    expect(person.worksFor).toMatchObject({ name: 'getSichtbar' });
    expect(person.sameAs).toEqual(expect.arrayContaining(['https://github.com/aatmik-panse']));
  });

  it('points the profile page at the canonical www URL with a modified date', () => {
    expect(page.url).toBe(SITE_URL);
    expect(SITE_URL).toBe('https://www.aatmik.de/');
    expect(page.dateModified).toBe('2026-10-30');
  });

  it('keeps the meta description within snippet length', () => {
    expect(seo.description.length).toBeLessThanOrEqual(160);
  });
});

describe('prerender', () => {
  it('renders the full page to static HTML for non-JS crawlers', () => {
    const html = render();
    expect(html).toContain('<h1');
    expect(html).toContain('Aatmik Panse is a Technical Product Lead at getSichtbar');
    expect(html).toContain('Prior Implementations');
  });
});
