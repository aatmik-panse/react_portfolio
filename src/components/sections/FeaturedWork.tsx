import { FeatureCard } from '../ui/FeatureCard';
import { Pill } from '../ui/Pill';
import { Button } from '../ui/Button';
import { experience } from '../../data/experience';

export function FeaturedWork() {
  const featured = experience.find((e) => e.featured);
  if (!featured) return null;
  return (
    <section id="work" className="mx-auto max-w-content px-lg py-section">
      <div className="flex items-center gap-md mb-xl">
        <Pill tone="cream">FEATURED</Pill>
        <p className="text-caption-up text-muted">Currently building</p>
      </div>
      <FeatureCard variant="teal" className="lg:p-xxl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <div className="lg:col-span-7 flex flex-col gap-md">
            <h2 className="font-display text-display-md">{featured.company}</h2>
            <p className="text-title-md opacity-90">{featured.role}</p>
            <p className="text-body-sm opacity-75">
              {featured.dates} · {featured.location}
            </p>
            <ul className="mt-md flex flex-col gap-sm">
              {featured.bullets.map((b, i) => (
                <li key={i} className="text-body-md leading-relaxed opacity-95">
                  - {b}
                </li>
              ))}
            </ul>
            {featured.url && (
              <div className="mt-lg">
                <Button href={featured.url} variant="onColor">
                  Visit gradonix.com ↗
                </Button>
              </div>
            )}
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="aspect-video w-full rounded-lg bg-surface-dark-elevated/40 grid place-items-center text-on-primary/50 text-caption-up">
              PRODUCT SHOT - UPLOAD AS /2.jpg
            </div>
          </div>
        </div>
      </FeatureCard>
    </section>
  );
}
