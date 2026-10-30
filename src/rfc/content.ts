import { experience } from '../data/experience';
import { featuredProjects, ossHighlights } from '../data/projects';
import { education } from '../data/education';
import { profile } from '../data/profile';

export { experience, featuredProjects, ossHighlights, education, profile };

export const links = {
  email: `mailto:${profile.email}`,
  github: profile.links.github,
  linkedin: profile.links.linkedin,
};

export const pitch =
  'I build AI visibility and search products, from the first client call to the shipped code.';

export const stack = [
  'TypeScript',
  'Next.js',
  'React',
  'Node.js',
  'Python',
  'Supabase',
  'Postgres',
  'Shopify',
  'Swift',
  'Go',
  'Tailwind CSS',
];
