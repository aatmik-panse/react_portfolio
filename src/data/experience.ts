export type Experience = {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  url?: string;
};

export const experience: Experience[] = [
  {
    company: 'getSichtbar',
    role: 'Technical Product Lead',
    dates: 'Jun 2026 - Present',
    url: 'https://getsichtbar.com',
    bullets: [
      'Lead product and engineering for an AI-visibility platform that helps brands get found in search engines and AI-generated answers, serving e-commerce, deep tech, agencies and hospitality groups.',
      'Work directly with clients from discovery to delivery, turning business needs into shipped features across architecture and hands-on development.',
      'Shipped 4,000+ commits in 4 months across Next.js, TypeScript, Supabase and Shopify integrations, including GEO/citation tracking, content pipelines and Slack automations.',
    ],
  },
  {
    company: 'Bulky: Bulk AI Image Editor',
    role: 'Founder & Full Stack Engineer',
    dates: 'Feb 2026 - Present',
    url: 'https://apps.shopify.com/vto',
    bullets: [
      'Building a Shopify app that generates studio-quality product photos in bulk and edits entire catalogs at scale using AI, for any product category.',
      'Cuts the cost of high-quality product photography for merchants from per-shoot studio rates to per-image API costs.',
      'Stack: Shopify App Bridge, Node.js, Python, image generation pipelines.',
    ],
  },
  {
    company: 'Profitonium Apps',
    role: 'Software Development Engineer',
    dates: 'Mar 2025 - May 2026',
    bullets: [
      'Built and maintained features for production Shopify apps used by merchants worldwide.',
      'Improved app performance and Core Web Vitals to meet Built for Shopify (BFS) standards.',
      'Worked across the stack on backend reliability, concurrency handling and storefront integrations.',
    ],
  },
  {
    company: 'Gradonix',
    role: 'Founder & Full Stack Engineer',
    dates: 'Aug 2025 - Feb 2026',
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
    bullets: [
      'Built an Android book-sharing app in a 2-member team using Kotlin and XML.',
      'Implemented borrowing, posting, and transaction history features.',
      'App actively used by 5,000 users.',
    ],
  },
];
