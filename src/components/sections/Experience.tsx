import { FeatureCard } from '../ui/FeatureCard';
import { experience } from '../../data/experience';

export function Experience() {
  const others = experience.filter((e) => !e.featured);
  return (
    <section className="mx-auto max-w-content px-lg py-section">
      <div className="mb-xl">
        <p className="text-caption-up text-muted mb-sm">EXPERIENCE</p>
        <h2 className="font-display text-display-md">Where I've shipped.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {others.map((e) => (
          <FeatureCard key={e.company} variant="cream">
            <p className="text-caption-up text-muted">{e.dates}</p>
            <h3 className="font-display text-title-lg">{e.company}</h3>
            <p className="text-title-md text-body-strong">{e.role}</p>
            <ul className="flex flex-col gap-xs mt-sm">
              {e.bullets.slice(0, 2).map((b, i) => (
                <li key={i} className="text-body-sm text-body leading-relaxed">
                  — {b}
                </li>
              ))}
            </ul>
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}
