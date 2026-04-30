import { cn } from '../../lib/cn';

type Tone = 'lavender' | 'peach' | 'ochre' | 'mint' | 'coral';

export function Blob({
  className,
  tone = 'lavender',
}: {
  className?: string;
  tone?: Tone;
}) {
  const fills: Record<Tone, string> = {
    lavender: '#b8a4ed',
    peach: '#ffb084',
    ochre: '#e8b94a',
    mint: '#a4d4c5',
    coral: '#ff6b5a',
  };
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Decorative shape"
      className={cn('h-full w-full', className)}
    >
      <path
        d="M40,90 C30,40 90,10 130,30 C170,50 190,90 170,140 C150,190 80,200 50,170 C20,140 50,140 40,90 Z"
        fill={fills[tone]}
      />
    </svg>
  );
}
