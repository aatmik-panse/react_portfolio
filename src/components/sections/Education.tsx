import { FeatureCard } from '../ui/FeatureCard';
import { Pill } from '../ui/Pill';
import { education } from '../../data/education';

export function Education() {
  return (
    <section className="mx-auto max-w-content px-lg py-section">
      <div className="mb-xl">
        <p className="text-caption-up text-muted mb-sm">EDUCATION</p>
        <h2 className="font-display text-display-md">Where I'm learning.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {education.map((e) => (
          <FeatureCard key={e.school} variant="cream">
            <p className="text-caption-up text-muted">{e.dates}</p>
            <h3 className="font-display text-title-lg">{e.school}</h3>
            <p className="text-title-md text-body-strong">{e.degree}</p>
            <p className="text-body-sm text-body">
              {e.score} · {e.location}
            </p>
            {e.awards && (
              <div className="flex flex-wrap gap-xs mt-sm">
                {e.awards.map((a) => (
                  <Pill key={a} tone="canvas">
                    {a}
                  </Pill>
                ))}
              </div>
            )}
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}
