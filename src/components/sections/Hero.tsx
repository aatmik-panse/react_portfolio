import { Button } from '../ui/Button';
import { CdnImage } from '../ui/CdnImage';
import { Blob } from '../ui/Blob';
import { profile } from '../../data/profile';
import { cdn } from '../../lib/cdn';

export function Hero() {
  return (
    <section className="mx-auto max-w-content px-lg pt-section pb-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xxl items-center">
        <div className="lg:col-span-7 flex flex-col gap-lg">
          <p className="text-caption-up text-muted">{profile.name.toUpperCase()}</p>
          <h1 className="font-display text-display-lg lg:text-display-xl text-ink">
            {profile.tagline}
          </h1>
          <p className="text-body-md text-body max-w-xl">{profile.blurb}</p>
          <div className="flex flex-wrap gap-md pt-sm">
            <Button href={`mailto:${profile.email}`} variant="primary">
              Email me
            </Button>
            <Button href={profile.links.github} variant="secondary">
              GitHub ↗
            </Button>
            <Button href={profile.links.linkedin} variant="textLink">
              LinkedIn
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="absolute -top-8 -right-8 w-40 h-40 -z-10 opacity-70">
            <Blob tone="lavender" />
          </div>
          <div className="bg-surface-soft rounded-xl p-md overflow-hidden">
            <CdnImage
              src={cdn.hero}
              alt="Aatmik Panse"
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
