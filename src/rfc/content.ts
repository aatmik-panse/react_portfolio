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

/** Build date, so prerendered HTML and the hydrated page agree and dateModified stays fresh per deploy. */
export const lastUpdated: string = __BUILD_DATE__;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "2026-10-30" -> "October 2026", without locale or timezone dependence. */
export function monthYear(iso: string): string {
  const [year, month] = iso.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

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
