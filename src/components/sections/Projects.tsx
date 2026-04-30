import { FeatureCard } from '../ui/FeatureCard';
import { Pill } from '../ui/Pill';
import { Button } from '../ui/Button';
import { featuredProjects } from '../../data/projects';

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-content px-lg py-section">
      <div className="mb-xl">
        <p className="text-caption-up text-muted mb-sm">PROJECTS</p>
        <h2 className="font-display text-display-md">Things I built and shipped.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {featuredProjects.map((p) => (
          <FeatureCard key={p.title} variant={p.color}>
            {p.date && <p className="text-caption-up opacity-70">{p.date}</p>}
            <h3 className="font-display text-title-lg">{p.title}</h3>
            <p className="text-body-md leading-relaxed">{p.description}</p>
            <div className="flex flex-wrap gap-xs mt-sm">
              {p.tech.map((t) => (
                <Pill key={t} tone="canvas">
                  {t}
                </Pill>
              ))}
            </div>
            <div className="flex flex-wrap gap-md mt-md">
              {p.live && (
                <Button href={p.live} variant="onColor">
                  Live ↗
                </Button>
              )}
              {p.repo && (
                <Button href={p.repo} variant="textLink">
                  Repo
                </Button>
              )}
            </div>
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}
