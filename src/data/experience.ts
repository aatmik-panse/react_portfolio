export type Experience = {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  featured?: boolean;
  url?: string;
};

export const experience: Experience[] = [
  {
    company: 'Gradonix',
    role: 'Founder & Full Stack Engineer',
    dates: 'Aug 2025 - Jan 2026',
    location: 'Remote',
    featured: true,
    url: 'https://gradonix.com',
    bullets: [
      'Built an agentic AI grading platform that autonomously extracts, evaluates, and scores handwritten and typed student answers against dynamic marking schemes.',
      'Built scalable backend with Next.js, Node.js, MongoDB, Redis, and background job queues - grading time dropped from hours to under 2 minutes per paper.',
      'Onboarded 10+ teachers and reached 20+ monthly active users through direct outreach, product iteration, and real-world classroom deployments.',
    ],
  },
  {
    company: 'Skai Lama',
    role: 'Full Stack Developer Intern (MERN)',
    dates: 'Sep 2024 - Feb 2025',
    location: 'Remote',
    bullets: [
      'Shipped features for production Shopify apps that reduced onboarding and product creation time by 50%.',
      'Built subscription modal and billing flows within the Shopify app ecosystem.',
      'Optimized Core Web Vitals across Shopify storefront integrations.',
    ],
  },
  {
    company: 'Profitonium Apps',
    role: 'Full Stack Developer Intern (MERN)',
    dates: 'Jun 2024 - Aug 2024',
    location: 'Remote',
    bullets: [
      'Optimized Core Web Vitals focusing on CLS, improving layout stability and page experience.',
      'Implemented backend optimizations using locking mechanisms for concurrency and reliability.',
      'Contributed toward achieving BFS badge compliance via performance improvements.',
    ],
  },
  {
    company: 'Zolo Co-Living',
    role: 'Android Developer Intern',
    dates: 'Feb 2024 - May 2024',
    location: 'Remote',
    bullets: [
      'Built an Android book-sharing app in a 2-member team using Kotlin and XML.',
      'Implemented borrowing, posting, and transaction history features.',
      'App actively used by 5,000 users.',
    ],
  },
];
