import { cn } from '../../lib/cn';

type Tone = 'ochre' | 'peach' | 'lavender' | 'mint' | 'teal';

export function Mountain({
  className,
  tone = 'ochre',
}: {
  className?: string;
  tone?: Tone;
}) {
  const fills: Record<Tone, string> = {
    ochre: '#e8b94a',
    peach: '#ffb084',
    lavender: '#b8a4ed',
    mint: '#a4d4c5',
    teal: '#1a3a3a',
  };
  return (
    <svg
      viewBox="0 0 1280 200"
      preserveAspectRatio="none"
      role="img"
      aria-label="Decorative mountain horizon"
      className={cn('w-full h-auto', className)}
    >
      <path
        d="M0,200 L0,140 L160,80 L260,120 L420,40 L580,140 L740,60 L880,130 L1040,50 L1180,110 L1280,80 L1280,200 Z"
        fill={fills[tone]}
        opacity="0.85"
      />
      <path
        d="M0,200 L0,170 L120,130 L300,160 L480,110 L640,170 L820,120 L1000,160 L1160,130 L1280,150 L1280,200 Z"
        fill={fills[tone]}
        opacity="0.55"
      />
    </svg>
  );
}
