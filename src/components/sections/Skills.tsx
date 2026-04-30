import { Pill } from '../ui/Pill';
import { skills } from '../../data/skills';

export function Skills() {
  const groups: { label: string; items: readonly string[] }[] = [
    { label: 'Languages', items: skills.languages },
    { label: 'Frameworks', items: skills.frameworks },
    { label: 'Tools', items: skills.tools },
    { label: 'Libraries', items: skills.libraries },
  ];
  return (
    <section id="about" className="mx-auto max-w-content px-lg py-section">
      <div className="mb-xl">
        <p className="text-caption-up text-muted mb-sm">SKILLS</p>
        <h2 className="font-display text-display-md">What I work with.</h2>
      </div>
      <div className="flex flex-col gap-lg">
        {groups.map((g) => (
          <div key={g.label} className="grid grid-cols-12 gap-md items-start">
            <p className="col-span-12 md:col-span-3 text-title-md text-body-strong">{g.label}</p>
            <div className="col-span-12 md:col-span-9 flex flex-wrap gap-xs">
              {g.items.map((s) => (
                <Pill key={s} tone="cream">
                  {s}
                </Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
