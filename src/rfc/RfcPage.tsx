import '@fontsource-variable/geist-mono';
import type { ReactNode } from 'react';
import { experience, featuredProjects, ossHighlights, education, links, stack, profile, lastUpdated, monthYear } from './content';

// RFC variant: print-emulating document, light-only by design.
const ACCENT = '#c4320a';

const SECTIONS = [
  { id: 'intro', title: 'Introduction' },
  { id: 'current', title: 'Current Deployment' },
  { id: 'prior', title: 'Prior Implementations' },
  { id: 'reference', title: 'Reference Implementations' },
  { id: 'deps', title: 'Dependencies' },
  { id: 'contact', title: "Author's Address" },
];

function H2({ n, id, children }: { n: number; id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-14 scroll-mt-8 font-bold">
      {n}. {children}
    </h2>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="underline decoration-1 underline-offset-[3px] hover:no-underline" style={{ color: ACCENT }}>
      {children}
    </a>
  );
}

export default function Rfc() {
  const [current, ...prior] = experience;
  return (
    <div className="min-h-[100dvh] bg-[#f6f6f4] text-[#1c1c1c]" style={{ fontFamily: '"Geist Mono Variable", monospace' }}>
      <main className="mx-auto max-w-[78ch] px-4 py-12 text-[14px] leading-[1.7] md:py-20">
        <header className="grid grid-cols-1 gap-1 text-[#55565a] sm:grid-cols-2">
          <div>
            <p>Independent Submission</p>
            <p>Request for Comments: 2026</p>
            <p>Category: Informational</p>
          </div>
          <div className="sm:text-right">
            <p>Aatmik Panse</p>
            <p>getSichtbar</p>
            <p>
              <time dateTime={lastUpdated}>{monthYear(lastUpdated)}</time>
            </p>
          </div>
        </header>

        <h1 className="mt-14 text-center text-2xl font-bold leading-snug md:text-[28px]">
          Aatmik Panse
        </h1>
        <p className="mt-3 text-center text-[#55565a]">Technical Product Lead. Engineer. Occasional founder.</p>

        <section className="mt-12">
          <h2 className="font-bold">Abstract</h2>
          <p className="mt-3 pl-[3ch]">
            Aatmik Panse is a Technical Product Lead at getSichtbar in Bengaluru, India, building AI visibility and
            search products from the first client call to the shipped code. getSichtbar helps
            e-commerce brands, deep tech companies, agencies and hotel chains get found in search engines and in
            AI-generated answers. This document is the short version, for engineers, founders and hiring teams.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 pl-[3ch]">
            <a href={links.email} className="px-4 py-2 font-bold text-white transition-transform active:scale-[0.98]" style={{ background: ACCENT }}>
              Email me
            </a>
            <a href={links.github} className="border border-[#1c1c1c] px-4 py-2 transition-colors hover:bg-[#1c1c1c] hover:text-[#f6f6f4]">
              GitHub
            </a>
          </div>
        </section>

        <nav className="mt-12" aria-label="Table of contents">
          <h2 className="font-bold">Table of Contents</h2>
          <ol className="mt-3 pl-[3ch]">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex gap-2 hover:underline">
                  <span>
                    {i + 1}. {s.title}
                  </span>
                  <span className="flex-1 overflow-hidden whitespace-nowrap text-[#a3a4a8]" aria-hidden>
                    {'.'.repeat(80)}
                  </span>
                  <span>{i + 2}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <H2 n={1} id="intro">Introduction</H2>
        <div className="mt-3 space-y-4 pl-[3ch]">
          <p>
            Aatmik works across product and engineering: discovery calls, product strategy, architecture and
            hands-on code. Most weeks that means TypeScript and Python, and shaping what gets built next.
          </p>
          <p>
            The key words "SHIP", "MEASURE" and "ITERATE" in this document are to be interpreted as Aatmik's
            default working loop.
          </p>
        </div>

        <H2 n={2} id="current">Current Deployment</H2>
        <div className="mt-3 pl-[3ch]">
          <p className="font-bold">
            {current.role}, <A href={current.url ?? links.github}>{current.company}</A>
          </p>
          <p className="text-[#55565a]">{current.dates}</p>
          <ul className="mt-3 space-y-2">
            {current.bullets.map((b) => (
              <li key={b} className="grid grid-cols-[3ch_1fr]">
                <span>o</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <H2 n={3} id="prior">Prior Implementations</H2>
        <div className="mt-3 space-y-6 pl-[3ch]">
          {prior.map((e, i) => (
            <div key={e.company + e.dates}>
              <p className="font-bold">
                3.{i + 1}. {e.url ? <A href={e.url}>{e.company}</A> : e.company}
              </p>
              <p className="text-[#55565a]">
                {e.role}, {e.dates}
              </p>
              <p className="mt-1">{e.bullets[0]}</p>
            </div>
          ))}
        </div>

        <H2 n={4} id="reference">Reference Implementations</H2>
        <div className="mt-3 space-y-5 pl-[3ch]">
          {featuredProjects.map((p) => (
            <div key={p.title}>
              <p className="font-bold">
                {p.live || p.repo ? <A href={(p.live ?? p.repo)!}>{p.title}</A> : p.title}
                <span className="font-normal text-[#55565a]"> [{p.tech.join(', ')}]</span>
              </p>
              <p className="mt-1">{p.description}</p>
            </div>
          ))}
          <p className="pt-2">
            Further source is available at{' '}
            {ossHighlights.slice(0, 3).map((r, i) => (
              <span key={r.name}>
                <A href={r.url}>{r.name}</A>
                {i < 2 ? ', ' : ''}
              </span>
            ))}{' '}
            and <A href={links.github}>github.com/aatmik-panse</A>.
          </p>
        </div>

        <H2 n={5} id="deps">Dependencies</H2>
        <div className="mt-3 pl-[3ch]">
          <p>Implementations of this author MUST be compatible with:</p>
          <p className="mt-3 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </p>
          <p className="mt-5">Normative references:</p>
          <ul className="mt-2">
            {education.map((ed) => (
              <li key={ed.school} className="grid grid-cols-[3ch_1fr]">
                <span>o</span>
                <span>
                  {ed.school}, {ed.degree}, {ed.score}.
                </span>
              </li>
            ))}
          </ul>
        </div>

        <H2 n={6} id="contact">Author's Address</H2>
        <address className="mt-3 pl-[3ch] not-italic">
          <p>{profile.name}</p>
          <p>getSichtbar</p>
          <p>{profile.location}</p>
          <p className="mt-3">
            Email: <A href={links.email}>{profile.email}</A>
          </p>
          <p>
            URI: <A href={links.linkedin}>linkedin.com/in/aatmikpanse</A>
          </p>
        </address>

        <footer className="mt-20 flex justify-between border-t border-[#d6d6d2] pt-4 text-[#77787c]">
          <span>Aatmik Panse</span>
          <span>Informational</span>
          <span>[Page 1]</span>
        </footer>
      </main>
    </div>
  );
}
