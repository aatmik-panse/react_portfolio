import { Mountain } from '../ui/Mountain';
import { profile } from '../../data/profile';

export function Footer() {
  const cols = [
    {
      title: 'Sections',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'Projects', href: '#projects' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Profiles',
      links: [
        { label: 'GitHub', href: profile.links.github },
        { label: 'LinkedIn', href: profile.links.linkedin },
      ],
    },
    {
      title: 'Projects',
      links: [
        { label: 'Gradonix', href: 'https://gradonix.com' },
        { label: 'PhotoSage', href: '#projects' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: profile.email, href: `mailto:${profile.email}` },
        { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
      ],
    },
  ];
  return (
    <footer className="bg-surface-soft border-t border-hairline mt-xxl">
      <div className="mx-auto max-w-content px-lg py-xxl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-xl">
          {cols.map((c) => (
            <div key={c.title} className="flex flex-col gap-sm">
              <p className="text-caption-up text-muted">{c.title}</p>
              <ul className="flex flex-col gap-xs">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-body-sm text-body hover:text-ink"
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-xxl text-caption text-muted-soft">
          © {new Date().getFullYear()} {profile.name}. Built in cream.
        </p>
      </div>
      <div className="opacity-60 pointer-events-none">
        <Mountain tone="peach" />
      </div>
    </footer>
  );
}
