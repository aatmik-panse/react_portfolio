# Portfolio Redesign — Design Spec

**Date:** 2026-04-30
**Owner:** Aatmik Panse
**Site:** aatmik.de (apex = R2 image CDN, www = Vercel app)
**Status:** Approved by user, ready for implementation plan.

## Goal

Replace the current `create-react-app` portfolio with a simpler, modern site that:

1. Surfaces the resume content (Gradonix, Skai Lama, Profitonium, Zolo, PhotoSage, education, skills) and a curated selection of GitHub projects.
2. Uses the **Clay.com-inspired design system** the user supplied (cream canvas, saturated single-color feature cards, Inter 500 with negative letter-spacing as the Plain Black substitute, 96px section rhythm, cream footer).
3. Loads all images from the existing CDN at `https://aatmik.de/<file>` (R2 + Cloudflare, no transforms).
4. Replaces Clay's commissioned 3D claymation with **SVG abstract shapes** (mountains, blobs) in brand colors.
5. Ships fast: Lighthouse ≥95 on all four axes; no CLS regressions; bundle <150KB JS gzipped on the home route.

## Non-goals (v1)

- 3D claymation art / mascot characters.
- Pink feature card (Clay maps pink to outbound/sequencer — no fit on a portfolio).
- Hover micro-animations beyond Tailwind transitions.
- Light/dark toggle (Clay system is cream-only).
- Blog / writing surface, i18n, analytics.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Build | **Vite 5** | CRA is deprecated; Vite is the default modern React bundler. Faster HMR, smaller bundles, ESM. |
| Framework | **React 18** | No change from current site. |
| Language | **TypeScript** | User ships TS in real work (Grado, Synap, chrome-reader). Matches actual stack. |
| Styling | **Tailwind 3** with the full Clay token set in `tailwind.config.ts` | The Clay spec is token-based — Tailwind makes the contract enforceable in markup. Replaces all hand-rolled CSS files. |
| Routing | **react-router-dom 6** | Already a dep. Single-page scroll on `/` with hash anchors; reserve `/projects` and other paths for future. |
| Fonts | `@fontsource-variable/inter` (self-hosted) | Plain Black is licensed-only; Inter at weight 500 with -0.05em letter-spacing is Clay's documented fallback. Self-hosted avoids Google Fonts FOUT. |
| Deploy | **Vercel** at `www.aatmik.de` | Apex is reserved for R2 CDN. Removes `gh-pages` script. |

## Routing

Single-page scroll with hash anchors: `/#work`, `/#projects`, `/#about`, `/#contact`. The current `HomePage` + `ProjectPage` two-route split is dropped — the new design fits comfortably on one scroll.

A `vercel.json` SPA rewrite ensures hash-anchor deep links survive refresh.

## Sections (top to bottom)

| # | Section | Component | Surface | Notes |
|---|---|---|---|---|
| 1 | Top nav | `Nav` | `colors.canvas` (cream, 64px tall) | Wordmark left ("Aatmik"), anchors center (Work, Projects, About, Contact), `Resume ↗` button right (links to PDF when uploaded to CDN). |
| 2 | Hero | `Hero` | `colors.canvas` | 7/5 grid. Left: Inter 500 display "Building products people actually use." (-2.5px tracking, 72px), sub-line, button row (`Email me` primary, `GitHub` secondary). Right: `hero-illustration-card` on `surface-soft` holding `/1.jpg` framed at `rounded.xl`, plus a faint SVG mountain backdrop. |
| 3 | Featured work — Gradonix | `FeaturedWork` | `colors.brand-teal` (Clay's "featured" voltage) | Single saturated teal card. Title, role, dates, 3-bullet description from resume, CTA `Visit gradonix.com ↗`. Right slot reserved for product UI fragment (future `/2.jpg` upload). |
| 4 | Experience | `Experience` | `colors.surface-card` (cream) | Three cream `feature-card-cream` cards in a row: Skai Lama (Sep 2024–Feb 2025) → Profitonium Apps (Jun–Aug 2024) → Zolo Co-Living (Feb–May 2024). Each: company, role, dates, two resume bullets. |
| 5 | Projects | `Projects` | mixed | 3-up grid cycling **lavender → peach → ochre** (no repeat colors). Card 1 (lavender): PhotoSage. Card 2 (peach): one of `synap` / `whisper-flow` / `ascend` — chosen for demo quality. Card 3 (ochre): one of `tryonforshopify` / `chrome-reader`. Each card: title, 2-line description, tech tags, repo + live link. Defaults are configurable in `data/projects.ts`. |
| 6 | Open source | `OpenSource` | `colors.canvas` with hairline border | A compact `product-mockup-card` rendering recent repos as a `git log`-style list. Pulls from a static array in `data/projects.ts` (not live GitHub API on v1). |
| 7 | Skills | `Skills` | `colors.canvas` | Three rows by category — Languages / Frameworks / Tools. `badge-pill` style with `caption` type (13px / 500). Sourced from resume. |
| 8 | Education | `Education` | `colors.surface-card` | Two cream cards side-by-side: Scaler School Of Technology (CGPA 8.75) + BIT Pilani (CGR 9.0). Dean's List 2025 badge inside Scaler card. |
| 9 | CTA | `Cta` | `colors.surface-soft`, `cta-band-illustrated` | "Let's build something" h2 in `display-md`, sub-line, `mailto:dev.aatmik@gmail.com` primary button. SVG mountain row at the bottom. |
| 10 | Footer | `Footer` | `colors.surface-soft` (cream — never dark) | 4 columns: Sections / Profiles (LinkedIn, GitHub, X) / Projects (Gradonix, PhotoSage) / Contact (email, phone). Bottom strip: SVG horizon line. |

### Color cycling rule
Per Clay spec ("Don't repeat the same brand-color card twice in a row"): the page uses **teal → cream → lavender → peach → ochre → cream → cream**. The two cream sections (Experience and Education) are separated by Projects' three-color band, so the rhythm reads correctly.

## Component & file layout

```
src/
  lib/
    cdn.ts                # CDN URL config — { hero: '/1.jpg', gradonix: '/2.jpg', ... }
    cn.ts                 # classnames helper (clsx + tailwind-merge)
  components/
    ui/
      Button.tsx          # variants: primary | secondary | onColor | textLink
      FeatureCard.tsx     # variants: teal | lavender | peach | ochre | cream
      Pill.tsx            # badge-pill
      Mountain.tsx        # SVG horizon (claymation substitute)
      Blob.tsx            # SVG shape generator
      CdnImage.tsx        # <img> with width/height/loading=lazy/decoding=async, optional srcset
    sections/
      Nav.tsx
      Hero.tsx
      FeaturedWork.tsx
      Experience.tsx
      Projects.tsx
      OpenSource.tsx
      Skills.tsx
      Education.tsx
      Cta.tsx
      Footer.tsx
  data/
    profile.ts            # name, blurb, links — single source of truth for content
    experience.ts
    projects.ts
    skills.ts
    education.ts
  styles/
    index.css             # Tailwind directives + display class
  App.tsx
  main.tsx
tailwind.config.ts
postcss.config.js
index.html
vite.config.ts
vercel.json               # SPA rewrite to /index.html
tsconfig.json
```

## Tailwind token map

`tailwind.config.ts` extends the theme with the entire Clay token set:

```ts
theme: {
  extend: {
    colors: {
      canvas: '#fffaf0',
      'surface-soft': '#faf5e8',
      'surface-card': '#f5f0e0',
      'surface-strong': '#ebe6d6',
      'surface-dark': '#0a1a1a',
      hairline: '#e5e5e5',
      ink: '#0a0a0a',
      'body-strong': '#1a1a1a',
      body: '#3a3a3a',
      muted: '#6a6a6a',
      'muted-soft': '#9a9a9a',
      'on-primary': '#ffffff',
      brand: {
        pink: '#ff4d8b', // reserved, unused on v1
        teal: '#1a3a3a',
        lavender: '#b8a4ed',
        peach: '#ffb084',
        ochre: '#e8b94a',
        mint: '#a4d4c5',
        coral: '#ff6b5a',
      },
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    fontFamily: {
      display: ['"Inter Variable"', 'Inter', '-apple-system', 'sans-serif'],
      sans: ['"Inter Variable"', 'Inter', '-apple-system', 'sans-serif'],
    },
    fontSize: {
      'display-xl': ['72px', { lineHeight: '1', letterSpacing: '-0.0347em', fontWeight: '500' }],
      'display-lg': ['56px', { lineHeight: '1.05', letterSpacing: '-0.0357em', fontWeight: '500' }],
      'display-md': ['40px', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '500' }],
      'display-sm': ['32px', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '500' }],
      'title-lg': ['24px', { lineHeight: '1.3', letterSpacing: '-0.0125em', fontWeight: '600' }],
      'title-md': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
      'title-sm': ['16px', { lineHeight: '1.4', fontWeight: '600' }],
      'body-md': ['16px', { lineHeight: '1.55' }],
      'body-sm': ['14px', { lineHeight: '1.55' }],
      caption: ['13px', { lineHeight: '1.4', fontWeight: '500' }],
      'caption-up': ['12px', { lineHeight: '1.4', letterSpacing: '0.125em', fontWeight: '600' }],
      button: ['14px', { lineHeight: '1', fontWeight: '600' }],
      nav: ['14px', { lineHeight: '1.4', fontWeight: '500' }],
    },
    spacing: {
      xxs: '4px', xs: '8px', sm: '12px', md: '16px',
      lg: '24px', xl: '32px', xxl: '48px', section: '96px',
    },
    borderRadius: {
      xs: '6px', sm: '8px', md: '12px', lg: '16px', xl: '24px', pill: '9999px',
    },
    maxWidth: {
      content: '1280px',
    },
  },
},
```

## CDN integration

### `lib/cdn.ts`

```ts
export const CDN_BASE = 'https://aatmik.de';

export const cdn = {
  hero: `${CDN_BASE}/1.jpg`, // confirmed uploaded — 1920x1080
  // Add as files are uploaded:
  // gradonix: `${CDN_BASE}/2.jpg`,
  // photosage: `${CDN_BASE}/3.jpg`,
  // synap: `${CDN_BASE}/4.jpg`,
  // ...
} as const;
```

### `CdnImage` component contract

```tsx
type Props = {
  src: string;          // full CDN URL
  alt: string;          // required
  width: number;        // required — prevents CLS
  height: number;       // required — prevents CLS
  sizes?: string;       // optional
  widths?: number[];    // optional — when set, builds srcset assuming -<w>.jpg suffix variants exist
  className?: string;
  priority?: boolean;   // hero: loading=eager + fetchpriority=high
};
```

- Default: `loading="lazy"`, `decoding="async"`.
- When `priority`: `loading="eager"`, `fetchpriority="high"`, no lazy hint.
- When `widths` set: builds `srcset="<base>-800.jpg 800w, <base>-1600.jpg 1600w"` — opt-in, never assumes variants exist.

### What CDN does NOT do
- No Cloudflare image transforms (`/cdn-cgi/image/...`) — user confirmed unsure / not enabled.
- No Vercel image optimization (apex is R2; `next/image`-style routing would add a billable hop).
- The CDN serves whatever bytes you upload; the component just adds attributes.

## Typography

- Single family: **Inter Variable**, self-hosted via `@fontsource-variable/inter`.
- Display headings use weight **500** (per Clay rule — "never bolder than 500") with negative tracking driven by Tailwind `fontSize` token.
- Body uses 400 / 500 / 600.
- No serif anywhere. No second display face.

## Accessibility & performance budgets

- **Lighthouse**: ≥95 on Performance, Accessibility, Best Practices, SEO. Verified locally before merge.
- **CLS**: 0.0 on home — every `<img>` carries explicit `width`/`height`.
- **LCP**: hero `1.jpg` flagged `priority` for eager fetch.
- **Touch targets**: ≥44×44px (Clay spec).
- **Contrast**: ink-on-cream ≈16:1, white-on-teal ≈8:1, ink-on-{lavender, peach, ochre} verified ≥4.5:1 against the saturated surface, all WCAG AA.
- **Reduced motion**: `prefers-reduced-motion` skips Tailwind transitions.
- **Bundle**: aim <150KB JS gzipped on initial load. No animation library.

## Data model

`data/profile.ts`:
```ts
export const profile = {
  name: 'Aatmik Panse',
  tagline: 'Building products people actually use.',
  blurb: '...', // 2 lines, derived from resume context
  email: 'dev.aatmik@gmail.com',
  phone: '+91 9424608520',
  links: {
    github: 'https://github.com/aatmik-panse',
    linkedin: 'https://linkedin.com/in/aatmikpanse',
  },
};
```

`data/experience.ts`: typed array of `{ company, role, dates, bullets[], featured? }`.

`data/projects.ts`: typed array of `{ title, description, tech[], repo?, live?, color: 'lavender'|'peach'|'ochre' }`.

`data/skills.ts`: typed `{ languages[], frameworks[], tools[], libraries[] }`.

`data/education.ts`: typed array of `{ school, degree, score, dates, awards?[] }`.

## Files to delete

- `src/components/{About,Card,Education,Experience,Footer,Home,Navbar,Projects,Skills,Tiles,Typing}/`
- `src/pages/{HomePage,ProjectPage}/`
- `src/App.css`, `src/index.css` (regenerated under Tailwind)
- `src/App.test.js`, `src/setupTests.js`, `src/reportWebVitals.js` (CRA-specific, no test surface on v1)
- `src/logo.svg` (unused)
- `src/assets/{codeImg,deskImg,dp,eqbImg}.webp` (replaced by CDN URLs)
- `package.json` deps to remove: `react-fast-marquee`, `react-responsive-masonry`, `react-scripts`, `gh-pages`, `web-vitals`, `@testing-library/*`
- `package.json` scripts to remove: `predeploy`, `deploy`, `eject`, `test`
- `bun.lockb` and `package-lock.json` will be regenerated. Keep **bun** as package manager (faster install, user already has `bun.lockb` checked in).

## New deps

- `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
- `tailwindcss`, `postcss`, `autoprefixer`
- `@fontsource-variable/inter`
- `clsx`, `tailwind-merge`
- Keep: `react`, `react-dom`, `react-router-dom`, `react-icons`

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Migrating CRA → Vite breaks the existing deploy mid-flight | Build the new site in-place but on a feature branch; cut over only after Vercel preview is verified visually and via Lighthouse. |
| Only `1.jpg` is on the CDN today; other slots are placeholders | `cdn.ts` is the single source of truth — adding an upload is a one-line change. Empty slots render the colored card without an image (the saturated surface is the primary voltage anyway). |
| Inter at 500 with negative tracking might not perfectly mimic Plain Black | The Clay spec itself names this as the documented fallback. Acceptable. |
| User added another image at a non-`/N.jpg` path | `cdn.ts` accepts any URL string; the convention is a default, not a constraint. |
| Vercel deploy collides with current `www.aatmik.de` config | The current site already deploys to Vercel on `www.aatmik.de`. We replace the source repo's deploy artifact, not the domain wiring. Apex (R2) is untouched. |

## Acceptance criteria

A reviewer should be able to verify:

1. `bun install && bun run dev` starts a Vite server on `localhost:5173` with no console errors or warnings.
2. The home page scrolls through all 10 sections in order, on Chrome and Safari.
3. Mobile viewport (375px): nav collapses, hero stacks, feature grids go 1-up, no horizontal scroll, all touch targets ≥44px.
4. Tablet (768px): feature grids go 2-up.
5. Desktop (1280px): hero is 7/5, feature grids 3-up.
6. The hero image (`/1.jpg`) loads from `https://aatmik.de/1.jpg` with `width="1920" height="1080"` attributes, `loading="eager"`, `fetchpriority="high"`. Network tab confirms it.
7. All other `<img>` tags carry width + height + `loading="lazy"`.
8. Lighthouse on the production build: ≥95 on all four axes, CLS = 0.
9. No card uses pink. No card repeats its color in adjacent positions. Footer is cream, not dark.
10. Resume content (companies, dates, bullets, skills, education, awards) matches the PDF at `/tmp/aatmik_resume.pdf` exactly.
11. The bundle size (Vite `dist/` JS gzipped) is under 150KB.
12. `vercel.json` rewrites all paths to `/index.html` so `/#work` survives refresh.

## Implementation order (high-level)

1. Scaffold Vite + React + TS + Tailwind, wire tokens.
2. Build `ui/*` primitives (Button, FeatureCard, Pill, CdnImage, Mountain, Blob).
3. Wire `data/*` modules from resume + repo data.
4. Build sections top-to-bottom: Nav → Hero → FeaturedWork → Experience → Projects → OpenSource → Skills → Education → Cta → Footer.
5. Mobile/tablet pass.
6. Lighthouse audit + fixes.
7. Delete old CRA surface.
8. `vercel.json` + deploy preview.

A detailed plan with task-level steps lives in the implementation plan, generated separately by the writing-plans skill.
