import { useState } from 'react';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';
import { cn } from '../../lib/cn';

const items = [
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-sm border-b border-hairline">
      <div className="mx-auto max-w-content h-16 px-lg flex items-center justify-between">
        <a href="#top" className="font-display text-title-lg tracking-[-0.02em]">
          {profile.name}
        </a>
        <ul className="hidden md:flex items-center gap-xl">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="text-nav text-body hover:text-ink">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-md">
          <Button href={`mailto:${profile.email}`} variant="primary">
            Get in touch
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-sm rounded-md min-h-[44px] min-w-[44px]"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-5 h-0.5 bg-ink mb-1.5" />
          <span className="block w-5 h-0.5 bg-ink mb-1.5" />
          <span className="block w-5 h-0.5 bg-ink" />
        </button>
      </div>
      <div className={cn('md:hidden border-t border-hairline', !open && 'hidden')}>
        <ul className="px-lg py-md flex flex-col gap-md">
          {items.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                className="block text-nav text-body py-sm"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            </li>
          ))}
          <li>
            <Button href={`mailto:${profile.email}`} variant="primary" className="w-full">
              Get in touch
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
