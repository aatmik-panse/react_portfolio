import { Button } from '../ui/Button';
import { Mountain } from '../ui/Mountain';
import { profile } from '../../data/profile';

export function Cta() {
  return (
    <section id="contact" className="mx-auto max-w-content px-lg py-section">
      <div className="relative overflow-hidden rounded-xl bg-surface-soft p-xxl lg:p-section">
        <div className="relative z-10 flex flex-col gap-md max-w-2xl">
          <h2 className="font-display text-display-md text-ink">Let's build something.</h2>
          <p className="text-body-md text-body">
            I'm available for freelance and full-time work. Drop a line — I usually reply within
            a day.
          </p>
          <div className="flex flex-wrap gap-md mt-sm">
            <Button href={`mailto:${profile.email}`} variant="primary">
              Email {profile.email}
            </Button>
            <Button href={profile.links.linkedin} variant="secondary">
              LinkedIn ↗
            </Button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 opacity-50 pointer-events-none">
          <Mountain tone="ochre" />
        </div>
      </div>
    </section>
  );
}
