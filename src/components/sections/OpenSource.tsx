import { ossHighlights } from '../../data/projects';

export function OpenSource() {
  return (
    <section className="mx-auto max-w-content px-lg py-section">
      <div className="mb-xl">
        <p className="text-caption-up text-muted mb-sm">OPEN SOURCE</p>
        <h2 className="font-display text-display-md">Recent on GitHub.</h2>
      </div>
      <div className="rounded-lg border border-hairline bg-canvas">
        <ul className="divide-y divide-hairline">
          {ossHighlights.map((r) => (
            <li key={r.name}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-12 gap-md px-lg py-md items-baseline hover:bg-surface-card"
              >
                <span className="col-span-12 md:col-span-3 font-display text-title-md text-ink">
                  {r.name}
                </span>
                <span className="col-span-12 md:col-span-6 text-body-sm text-body">
                  {r.description}
                </span>
                <span className="col-span-6 md:col-span-2 text-caption text-muted">
                  {r.language}
                </span>
                <span className="col-span-6 md:col-span-1 text-caption text-muted-soft text-right">
                  {r.pushed}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
