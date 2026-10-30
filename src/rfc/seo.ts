import { education, experience, profile } from './content';

export const SITE_URL = 'https://www.aatmik.de/';

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

/** schema.org ProfilePage + Person graph, built from the same data the page renders. */
export function buildJsonLd(lastUpdated: string) {
  const current = experience[0];
  const personId = `${SITE_URL}#person`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}#profile`,
        url: SITE_URL,
        name: seo.title,
        description: seo.description,
        dateModified: lastUpdated,
        inLanguage: 'en',
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
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
      },
    ],
  };
}
