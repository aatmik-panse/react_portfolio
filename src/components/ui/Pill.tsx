import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'cream' | 'canvas' | 'onDark';

export function Pill({
  children,
  tone = 'cream',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const styles: Record<Tone, string> = {
    cream: 'bg-surface-card text-ink',
    canvas: 'bg-canvas text-ink border border-hairline',
    onDark: 'bg-on-primary/15 text-on-primary',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-sm py-xxs text-caption',
        styles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
