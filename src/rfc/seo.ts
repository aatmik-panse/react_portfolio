import { education, experience, profile } from './content';
import { photos } from './gallery';

export const SITE_URL = 'https://www.aatmik.de/';
export const GALLERY_URL = `${SITE_URL}gallery/`;
const PERSON_ID = `${SITE_URL}#person`;

export type PageHead = { title: string; description: string; url: string; image: string };

export const seo = {
  title: 'Aatmik Panse - Technical Product Lead at getSichtbar',
  description:
    'Aatmik Panse is a Technical Product Lead at getSichtbar in Bengaluru, building AI visibility and search products for e-commerce, deep tech, agencies and hotels.',
  image: 'https://cdn.aatmik.de/1.jpg',
  sameAs: [
    'https://github.com/aatmik-panse',
    'https://www.linkedin.com/in/aatmikpanse/',
    'https://x.com/panseaatmik',
  ],
};

export const homeHead: PageHead = { title: seo.title, description: seo.description, url: SITE_URL, image: seo.image };

export const galleryHead: PageHead = {
  title: 'Photos of Aatmik Panse',
  description: 'Photos of Aatmik Panse, Technical Product Lead at getSichtbar, away from the keyboard.',
  url: GALLERY_URL,
  image: new URL(photos[0].src, SITE_URL).href,
};

function person() {
  const current = experience[0];
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    alternateName: 'Aatmik',
    givenName: 'Aatmik',
    familyName: 'Panse',
    url: SITE_URL,
    image: seo.image,
    email: `mailto:${profile.email}`,
    jobTitle: current.role,
    worksFor: { '@type': 'Organization', name: current.company, url: current.url },
    address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
    alumniOf: education.map((ed) => ({ '@type': 'CollegeOrUniversity', name: ed.school })),
    knowsAbout: [
      'AI visibility',
      'Generative engine optimization',
      'Search engine optimization',
      'Product management',
      'Shopify app development',
      'TypeScript',
      'Next.js',
      'Python',
    ],
    sameAs: seo.sameAs,
  };
}

/** WebSite node: lets Google show "Aatmik" as the site name in results. */
function website() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'Aatmik',
    alternateName: ['Aatmik Panse', 'aatmik.de'],
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en',
  };
}

/** schema.org WebSite + ProfilePage + Person graph, built from the same data the page renders. */
export function buildJsonLd(lastUpdated: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website(),
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}#profile`,
        url: SITE_URL,
        name: seo.title,
        description: seo.description,
        dateModified: lastUpdated,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}#website` },
        mainEntity: { '@id': PERSON_ID },
      },
      person(),
    ],
  };
}

export function buildGalleryJsonLd(lastUpdated: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ImageGallery',
        '@id': `${GALLERY_URL}#gallery`,
        url: GALLERY_URL,
        name: galleryHead.title,
        description: galleryHead.description,
        dateModified: lastUpdated,
        about: { '@id': PERSON_ID },
        associatedMedia: photos.map((p) => ({
          '@type': 'ImageObject',
          contentUrl: new URL(p.src, SITE_URL).href,
          width: p.width,
          height: p.height,
          caption: p.alt,
          about: { '@id': PERSON_ID },
        })),
      },
      person(),
    ],
  };
}

/** Sitemap with image entries so Google Images picks up the gallery even though nothing links to it. */
export function buildSitemap(lastUpdated: string): string {
  const images = photos
    .map(
      (p) => `
    <image:image>
      <image:loc>${new URL(p.src, SITE_URL).href}</image:loc>
    </image:image>`,
    )
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${lastUpdated}</lastmod>
  </url>
  <url>
    <loc>${GALLERY_URL}</loc>
    <lastmod>${lastUpdated}</lastmod>${images}
  </url>
</urlset>
`;
}
