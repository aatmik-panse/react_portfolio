import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type FeatureCardVariant = 'teal' | 'lavender' | 'peach' | 'ochre' | 'cream';

const variants: Record<FeatureCardVariant, string> = {
  teal: 'bg-brand-teal text-on-primary',
  lavender: 'bg-brand-lavender text-ink',
  peach: 'bg-brand-peach text-ink',
  ochre: 'bg-brand-ochre text-ink',
  cream: 'bg-surface-card text-ink',
};

export function FeatureCard({
  variant,
  children,
  className,
}: {
  variant: FeatureCardVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl p-xl flex flex-col gap-md', variants[variant], className)}>
      {children}
    </div>
  );
}
