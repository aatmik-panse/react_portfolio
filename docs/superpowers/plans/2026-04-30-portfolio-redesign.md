# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current `create-react-app` portfolio at aatmik.de with a Clay.com-inspired single-page site built on Vite + React + TypeScript + Tailwind, sourcing images from the existing R2 CDN at `https://aatmik.de/<file>`.

**Architecture:** A Vite-bundled React 18 SPA. All design tokens live in `tailwind.config.ts`. Each section is a leaf component pulling typed data from `src/data/*`. Images are routed through a single `CdnImage` component that takes a CDN URL and renders an `<img>` with explicit width/height + lazy/priority hints. SVG `Mountain` and `Blob` components substitute for Clay's commissioned 3D illustrations.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind 3, react-router-dom 6, `@fontsource-variable/inter`, clsx, tailwind-merge, Vitest + @testing-library/react. Deploy via Vercel on `www.aatmik.de`.

**Spec:** `docs/superpowers/specs/2026-04-30-portfolio-redesign-design.md`

---

## File Structure

```
react_portfolio/
├── index.html                            (NEW - Vite entry)
├── package.json                          (REWRITE)
├── tsconfig.json                         (NEW)
├── tsconfig.node.json                    (NEW)
├── vite.config.ts                        (NEW)
├── tailwind.config.ts                    (NEW)
├── postcss.config.js                     (NEW)
├── vercel.json                           (NEW)
├── .gitignore                            (UPDATE)
├── public/
│   ├── favicon.ico                       (KEEP — copied from current public/)
│   └── robots.txt                        (KEEP)
└── src/
    ├── main.tsx                          (NEW)
    ├── App.tsx                           (NEW)
    ├── styles/
    │   └── index.css                     (NEW)
    ├── lib/
    │   ├── cdn.ts                        (NEW)
    │   └── cn.ts                         (NEW)
    ├── data/
    │   ├── profile.ts                    (NEW)
    │   ├── experience.ts                 (NEW)
    │   ├── projects.ts                   (NEW)
    │   ├── skills.ts                     (NEW)
    │   └── education.ts                  (NEW)
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx                (NEW)
    │   │   ├── FeatureCard.tsx           (NEW)
    │   │   ├── Pill.tsx                  (NEW)
    │   │   ├── CdnImage.tsx              (NEW)
    │   │   ├── Mountain.tsx              (NEW)
    │   │   └── Blob.tsx                  (NEW)
    │   └── sections/
    │       ├── Nav.tsx                   (NEW)
    │       ├── Hero.tsx                  (NEW)
    │       ├── FeaturedWork.tsx          (NEW)
    │       ├── Experience.tsx            (NEW)
    │       ├── Projects.tsx              (NEW)
    │       ├── OpenSource.tsx            (NEW)
    │       ├── Skills.tsx                (NEW)
    │       ├── Education.tsx             (NEW)
    │       ├── Cta.tsx                   (NEW)
    │       └── Footer.tsx                (NEW)
    └── test/
        ├── setup.ts                      (NEW)
        ├── cdn.test.ts                   (NEW)
        ├── Button.test.tsx               (NEW)
        ├── FeatureCard.test.tsx          (NEW)
        └── CdnImage.test.tsx             (NEW)
```

**Files deleted at the end (Task 22):**
- `src/App.css`, `src/App.js`, `src/App.test.js`, `src/index.css`, `src/index.js`, `src/logo.svg`, `src/reportWebVitals.js`, `src/setupTests.js`
- `src/components/{About,Card,Education,Experience,Footer,Home,Navbar,Projects,Skills,Tiles,Typing}/`
- `src/pages/{HomePage,ProjectPage}/`
- `src/assets/{codeImg,deskImg,dp,eqbImg}.webp`

---

## Task 1: Snapshot the current site state

This is a safety task. Before deleting anything, capture the current `src/` so we can recover content if needed.

**Files:**
- Create: `.archive/legacy-cra-src/` (just a directory copy, not committed long-term)

- [ ] **Step 1: Create archive copy of current src**

Run:
```bash
mkdir -p .archive
cp -r src .archive/legacy-cra-src
```

- [ ] **Step 2: Add `.archive/` to .gitignore**

Edit `.gitignore`, append:

```
.archive/
```

- [ ] **Step 3: Commit gitignore**

```bash
git add .gitignore
git commit -m "chore: ignore .archive snapshot directory"
```

---

## Task 2: Strip CRA and write new package.json

**Files:**
- Modify: `package.json` (full rewrite)
- Delete: `package-lock.json`, `bun.lockb` (regenerated after install)

- [ ] **Step 1: Rewrite package.json**

Overwrite `package.json` with:

```json
{
  "name": "aatmik-portfolio",
  "private": true,
  "version": "0.2.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@fontsource-variable/inter": "^5.1.0",
    "clsx": "^2.1.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^6.28.0",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/node": "^22.10.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.7.2",
    "vite": "^5.4.11",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Delete old lockfiles**

```bash
rm -f package-lock.json bun.lockb
```

- [ ] **Step 3: Install with bun**

```bash
bun install
```

Expected: produces a fresh `bun.lockb`. No errors. `react`, `vite`, `tailwindcss` resolved.

- [ ] **Step 4: Commit package set**

```bash
git add package.json bun.lockb
git rm -f package-lock.json
git commit -m "chore: replace CRA with Vite + React + TS + Tailwind deps"
```

---

## Task 3: Vite + TypeScript config

**Files:**
- Create: `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`

- [ ] **Step 1: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
} as any);
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Write `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "tailwind.config.ts", "postcss.config.js"]
}
```

- [ ] **Step 4: Write `index.html` at repo root**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#fffaf0" />
    <title>Aatmik Panse — Building products people actually use.</title>
    <meta name="description" content="Founder of Gradonix. Full-stack engineer working in React, Next.js, Node, MongoDB, Swift, and Python." />
    <meta property="og:title" content="Aatmik Panse" />
    <meta property="og:description" content="Building products people actually use." />
    <meta property="og:image" content="https://aatmik.de/1.jpg" />
    <meta property="og:url" content="https://www.aatmik.de" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts tsconfig.json tsconfig.node.json index.html
git commit -m "feat: add Vite + TS configuration"
```

---

## Task 4: Tailwind config with full Clay token set

**Files:**
- Create: `tailwind.config.ts`, `postcss.config.js`, `src/styles/index.css`

- [ ] **Step 1: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fffaf0',
        'surface-soft': '#faf5e8',
        'surface-card': '#f5f0e0',
        'surface-strong': '#ebe6d6',
        'surface-dark': '#0a1a1a',
        'surface-dark-elevated': '#1a2a2a',
        hairline: '#e5e5e5',
        ink: '#0a0a0a',
        'body-strong': '#1a1a1a',
        body: '#3a3a3a',
        muted: '#6a6a6a',
        'muted-soft': '#9a9a9a',
        'on-primary': '#ffffff',
        brand: {
          pink: '#ff4d8b',
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
        display: ['"Inter Variable"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
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
  plugins: [],
} satisfies Config;
```

- [ ] **Step 2: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 3: Write `src/styles/index.css`**

```css
@import '@fontsource-variable/inter';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    background-color: theme(colors.canvas);
    color: theme(colors.ink);
    font-family: theme(fontFamily.sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    background-color: theme(colors.canvas);
    color: theme(colors.body);
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts postcss.config.js src/styles/index.css
git commit -m "feat: add Tailwind config with Clay design tokens"
```

---

## Task 5: Vitest setup + first smoke test

**Files:**
- Create: `src/test/setup.ts`, `src/main.tsx` (skeleton), `src/App.tsx` (skeleton)

- [ ] **Step 1: Write `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 2: Write skeleton `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 3: Write skeleton `src/App.tsx`**

```tsx
export default function App() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <p className="p-section font-display text-display-md">Aatmik Panse</p>
    </main>
  );
}
```

- [ ] **Step 4: Smoke-run dev server**

Run:
```bash
bun run dev
```

Expected: server starts on `http://localhost:5173`, no errors. Open the browser, verify cream background and Inter rendering. Stop with Ctrl-C.

- [ ] **Step 5: Smoke-run test runner**

Run:
```bash
bun run test
```

Expected: vitest reports `No test files found` (correct — none exist yet) and exits cleanly.

- [ ] **Step 6: Commit**

```bash
git add src/main.tsx src/App.tsx src/test/setup.ts
git commit -m "feat: scaffold React entry + first render"
```

---

## Task 6: `lib/cn.ts` helper

**Files:**
- Create: `src/lib/cn.ts`

- [ ] **Step 1: Write `src/lib/cn.ts`**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/cn.ts
git commit -m "feat: add cn classnames helper"
```

---

## Task 7: `lib/cdn.ts` + tests

**Files:**
- Create: `src/lib/cdn.ts`, `src/test/cdn.test.ts`

- [ ] **Step 1: Write the failing test `src/test/cdn.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { CDN_BASE, cdnUrl, cdn } from '../lib/cdn';

describe('CDN module', () => {
  it('CDN_BASE points to the apex aatmik.de', () => {
    expect(CDN_BASE).toBe('https://aatmik.de');
  });

  it('cdnUrl prepends the base to a given filename', () => {
    expect(cdnUrl('1.jpg')).toBe('https://aatmik.de/1.jpg');
    expect(cdnUrl('/2.jpg')).toBe('https://aatmik.de/2.jpg');
  });

  it('cdn.hero is the confirmed-uploaded 1.jpg', () => {
    expect(cdn.hero).toBe('https://aatmik.de/1.jpg');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/lib/cdn.ts`**

```ts
export const CDN_BASE = 'https://aatmik.de';

export function cdnUrl(filename: string): string {
  const clean = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${CDN_BASE}/${clean}`;
}

export const cdn = {
  hero: cdnUrl('1.jpg'),
} as const;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test`
Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/cdn.ts src/test/cdn.test.ts
git commit -m "feat: add CDN URL helper module"
```

---

## Task 8: `Button` UI primitive + tests

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/test/Button.test.tsx`

- [ ] **Step 1: Write the failing test `src/test/Button.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../components/ui/Button';

describe('Button', () => {
  it('renders primary by default with ink background and white text', () => {
    render(<Button>Email me</Button>);
    const btn = screen.getByRole('button', { name: 'Email me' });
    expect(btn).toHaveClass('bg-ink');
    expect(btn).toHaveClass('text-on-primary');
  });

  it('renders secondary variant with hairline border on canvas', () => {
    render(<Button variant="secondary">GitHub</Button>);
    const btn = screen.getByRole('button', { name: 'GitHub' });
    expect(btn).toHaveClass('bg-canvas');
    expect(btn).toHaveClass('border');
  });

  it('renders as anchor when href is given', () => {
    render(<Button href="https://example.com">Link</Button>);
    const a = screen.getByRole('link', { name: 'Link' });
    expect(a).toHaveAttribute('href', 'https://example.com');
  });

  it('honors min-height of 44px for accessibility', () => {
    render(<Button>Tap me</Button>);
    expect(screen.getByRole('button')).toHaveClass('min-h-[44px]');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test`
Expected: FAIL — Button not exported.

- [ ] **Step 3: Write `src/components/ui/Button.tsx`**

```tsx
import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'onColor' | 'textLink';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = AsButton | AsAnchor;

const base =
  'inline-flex items-center justify-center gap-xs rounded-md text-button px-lg py-sm min-h-[44px] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-on-primary hover:bg-body-strong',
  secondary: 'bg-canvas text-ink border border-hairline hover:bg-surface-card',
  onColor: 'bg-canvas text-ink hover:bg-surface-card',
  textLink: 'text-ink underline underline-offset-4 min-h-0 p-0 hover:text-body-strong',
};

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className, ...rest } = props as AsButton & AsAnchor;
  const classes = cn(base, variants[variant], className);

  if ('href' in props && props.href) {
    const isExternal = props.href.startsWith('http');
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={classes}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test`
Expected: PASS — 4 Button tests + 3 cdn tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/test/Button.test.tsx
git commit -m "feat: add Button primitive (primary/secondary/onColor/textLink)"
```

---

## Task 9: `Pill` UI primitive

**Files:**
- Create: `src/components/ui/Pill.tsx`

- [ ] **Step 1: Write `src/components/ui/Pill.tsx`**

```tsx
import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'cream' | 'canvas' | 'onDark';

export function Pill({
  children,
  tone = 'cream',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const styles: Record<Tone, string> = {
    cream: 'bg-surface-card text-ink',
    canvas: 'bg-canvas text-ink border border-hairline',
    onDark: 'bg-on-primary/15 text-on-primary',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-sm py-xxs text-caption',
        styles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Pill.tsx
git commit -m "feat: add Pill primitive"
```

---

## Task 10: `CdnImage` UI primitive + tests

**Files:**
- Create: `src/components/ui/CdnImage.tsx`, `src/test/CdnImage.test.tsx`

- [ ] **Step 1: Write the failing test `src/test/CdnImage.test.tsx`**

```tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CdnImage } from '../components/ui/CdnImage';

describe('CdnImage', () => {
  it('renders an img with explicit width/height/alt', () => {
    const { container } = render(
      <CdnImage src="https://aatmik.de/1.jpg" alt="Aatmik" width={1920} height={1080} />,
    );
    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('src', 'https://aatmik.de/1.jpg');
    expect(img).toHaveAttribute('width', '1920');
    expect(img).toHaveAttribute('height', '1080');
    expect(img).toHaveAttribute('alt', 'Aatmik');
  });

  it('lazy-loads by default with async decoding', () => {
    const { container } = render(
      <CdnImage src="https://aatmik.de/1.jpg" alt="x" width={100} height={100} />,
    );
    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('eager-loads with high fetchpriority when priority is true', () => {
    const { container } = render(
      <CdnImage src="https://aatmik.de/1.jpg" alt="x" width={100} height={100} priority />,
    );
    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });

  it('builds srcset from widths array assuming -<w>.jpg suffix variants', () => {
    const { container } = render(
      <CdnImage
        src="https://aatmik.de/2.jpg"
        alt="x"
        width={1600}
        height={900}
        widths={[800, 1600]}
        sizes="(max-width: 768px) 100vw, 50vw"
      />,
    );
    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute(
      'srcset',
      'https://aatmik.de/2-800.jpg 800w, https://aatmik.de/2-1600.jpg 1600w',
    );
    expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test`
Expected: FAIL — CdnImage not exported.

- [ ] **Step 3: Write `src/components/ui/CdnImage.tsx`**

```tsx
import { type ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding'> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  widths?: number[];
  priority?: boolean;
  className?: string;
};

function buildSrcSet(src: string, widths: number[]): string {
  const dotIndex = src.lastIndexOf('.');
  if (dotIndex < 0) return '';
  const base = src.slice(0, dotIndex);
  const ext = src.slice(dotIndex);
  return widths.map((w) => `${base}-${w}${ext} ${w}w`).join(', ');
}

export function CdnImage({
  src,
  alt,
  width,
  height,
  sizes,
  widths,
  priority = false,
  className,
  ...rest
}: Props) {
  const srcSet = widths && widths.length > 0 ? buildSrcSet(src, widths) : undefined;
  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      srcSet={srcSet}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // @ts-expect-error fetchpriority is a valid attribute but not in React types yet
      fetchpriority={priority ? 'high' : undefined}
      className={cn(className)}
    />
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test`
Expected: PASS — 4 CdnImage tests + earlier tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/CdnImage.tsx src/test/CdnImage.test.tsx
git commit -m "feat: add CdnImage primitive with priority + srcset support"
```

---

## Task 11: `FeatureCard` UI primitive + tests

**Files:**
- Create: `src/components/ui/FeatureCard.tsx`, `src/test/FeatureCard.test.tsx`

- [ ] **Step 1: Write the failing test `src/test/FeatureCard.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureCard } from '../components/ui/FeatureCard';

describe('FeatureCard', () => {
  it('teal variant uses brand-teal background and white text', () => {
    render(<FeatureCard variant="teal">Hello</FeatureCard>);
    const card = screen.getByText('Hello').closest('div')!;
    expect(card).toHaveClass('bg-brand-teal');
    expect(card).toHaveClass('text-on-primary');
  });

  it('lavender variant uses brand-lavender background and ink text', () => {
    render(<FeatureCard variant="lavender">x</FeatureCard>);
    const card = screen.getByText('x').closest('div')!;
    expect(card).toHaveClass('bg-brand-lavender');
    expect(card).toHaveClass('text-ink');
  });

  it('peach variant uses brand-peach background and ink text', () => {
    render(<FeatureCard variant="peach">x</FeatureCard>);
    const card = screen.getByText('x').closest('div')!;
    expect(card).toHaveClass('bg-brand-peach');
    expect(card).toHaveClass('text-ink');
  });

  it('ochre variant uses brand-ochre background and ink text', () => {
    render(<FeatureCard variant="ochre">x</FeatureCard>);
    const card = screen.getByText('x').closest('div')!;
    expect(card).toHaveClass('bg-brand-ochre');
    expect(card).toHaveClass('text-ink');
  });

  it('cream variant uses surface-card background and ink text', () => {
    render(<FeatureCard variant="cream">x</FeatureCard>);
    const card = screen.getByText('x').closest('div')!;
    expect(card).toHaveClass('bg-surface-card');
    expect(card).toHaveClass('text-ink');
  });

  it('uses rounded-xl by default for the saturated card radius', () => {
    render(<FeatureCard variant="teal">x</FeatureCard>);
    expect(screen.getByText('x').closest('div')!).toHaveClass('rounded-xl');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test`
Expected: FAIL — FeatureCard not exported.

- [ ] **Step 3: Write `src/components/ui/FeatureCard.tsx`**

```tsx
import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type FeatureCardVariant = 'teal' | 'lavender' | 'peach' | 'ochre' | 'cream';

const variants: Record<FeatureCardVariant, string> = {
  teal: 'bg-brand-teal text-on-primary',
  lavender: 'bg-brand-lavender text-ink',
  peach: 'bg-brand-peach text-ink',
  ochre: 'bg-brand-ochre text-ink',
  cream: 'bg-surface-card text-ink',
};

export function FeatureCard({
  variant,
  children,
  className,
}: {
  variant: FeatureCardVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl p-xl flex flex-col gap-md',
        variants[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test`
Expected: PASS — 6 FeatureCard tests pass alongside earlier tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/FeatureCard.tsx src/test/FeatureCard.test.tsx
git commit -m "feat: add FeatureCard primitive with 5 brand variants"
```

---

## Task 12: SVG `Mountain` and `Blob` substitutes for claymation

**Files:**
- Create: `src/components/ui/Mountain.tsx`, `src/components/ui/Blob.tsx`

- [ ] **Step 1: Write `src/components/ui/Mountain.tsx`**

```tsx
import { cn } from '../../lib/cn';

type Tone = 'ochre' | 'peach' | 'lavender' | 'mint' | 'teal';

export function Mountain({
  className,
  tone = 'ochre',
}: {
  className?: string;
  tone?: Tone;
}) {
  const fills: Record<Tone, string> = {
    ochre: '#e8b94a',
    peach: '#ffb084',
    lavender: '#b8a4ed',
    mint: '#a4d4c5',
    teal: '#1a3a3a',
  };
  return (
    <svg
      viewBox="0 0 1280 200"
      preserveAspectRatio="none"
      role="img"
      aria-label="Decorative mountain horizon"
      className={cn('w-full h-auto', className)}
    >
      <path
        d="M0,200 L0,140 L160,80 L260,120 L420,40 L580,140 L740,60 L880,130 L1040,50 L1180,110 L1280,80 L1280,200 Z"
        fill={fills[tone]}
        opacity="0.85"
      />
      <path
        d="M0,200 L0,170 L120,130 L300,160 L480,110 L640,170 L820,120 L1000,160 L1160,130 L1280,150 L1280,200 Z"
        fill={fills[tone]}
        opacity="0.55"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Write `src/components/ui/Blob.tsx`**

```tsx
import { cn } from '../../lib/cn';

type Tone = 'lavender' | 'peach' | 'ochre' | 'mint' | 'coral';

export function Blob({
  className,
  tone = 'lavender',
}: {
  className?: string;
  tone?: Tone;
}) {
  const fills: Record<Tone, string> = {
    lavender: '#b8a4ed',
    peach: '#ffb084',
    ochre: '#e8b94a',
    mint: '#a4d4c5',
    coral: '#ff6b5a',
  };
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Decorative shape"
      className={cn('h-full w-full', className)}
    >
      <path
        d="M40,90 C30,40 90,10 130,30 C170,50 190,90 170,140 C150,190 80,200 50,170 C20,140 50,140 40,90 Z"
        fill={fills[tone]}
      />
    </svg>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Mountain.tsx src/components/ui/Blob.tsx
git commit -m "feat: add Mountain + Blob SVG primitives"
```

---

## Task 13: Data modules — profile, experience, projects, skills, education

**Files:**
- Create: `src/data/profile.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/education.ts`

- [ ] **Step 1: Write `src/data/profile.ts`**

```ts
export const profile = {
  name: 'Aatmik Panse',
  tagline: 'Building products people actually use.',
  blurb:
    'Founder of Gradonix and full-stack engineer. I ship across React, Next.js, Node, MongoDB, Swift, and Python — usually all in the same week.',
  email: 'dev.aatmik@gmail.com',
  phone: '+91 9424608520',
  location: 'Bengaluru, India',
  links: {
    github: 'https://github.com/aatmik-panse',
    linkedin: 'https://linkedin.com/in/aatmikpanse',
  },
} as const;
```

- [ ] **Step 2: Write `src/data/experience.ts`**

```ts
export type Experience = {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  featured?: boolean;
  url?: string;
};

export const experience: Experience[] = [
  {
    company: 'Gradonix',
    role: 'Founder & Full Stack Engineer',
    dates: 'Aug 2025 — Jan 2026',
    location: 'Remote',
    featured: true,
    url: 'https://gradonix.com',
    bullets: [
      'Built an agentic AI grading platform that autonomously extracts, evaluates, and scores handwritten and typed student answers against dynamic marking schemes.',
      'Built scalable backend with Next.js, Node.js, MongoDB, Redis, and background job queues — grading time dropped from hours to under 2 minutes per paper.',
      'Onboarded 10+ teachers and reached 20+ monthly active users through direct outreach, product iteration, and real-world classroom deployments.',
    ],
  },
  {
    company: 'Skai Lama',
    role: 'Full Stack Developer Intern (MERN)',
    dates: 'Sep 2024 — Feb 2025',
    location: 'Remote',
    bullets: [
      'Shipped features for production Shopify apps that reduced onboarding and product creation time by 50%.',
      'Built subscription modal and billing flows within the Shopify app ecosystem.',
      'Optimized Core Web Vitals across Shopify storefront integrations.',
    ],
  },
  {
    company: 'Profitonium Apps',
    role: 'Full Stack Developer Intern (MERN)',
    dates: 'Jun 2024 — Aug 2024',
    location: 'Remote',
    bullets: [
      'Optimized Core Web Vitals focusing on CLS, improving layout stability and page experience.',
      'Implemented backend optimizations using locking mechanisms for concurrency and reliability.',
      'Contributed toward achieving BFS badge compliance via performance improvements.',
    ],
  },
  {
    company: 'Zolo Co-Living',
    role: 'Android Developer Intern',
    dates: 'Feb 2024 — May 2024',
    location: 'Remote',
    bullets: [
      'Built an Android book-sharing app in a 2-member team using Kotlin and XML.',
      'Implemented borrowing, posting, and transaction history features.',
      'App actively used by 5,000 users.',
    ],
  },
];
```

- [ ] **Step 3: Write `src/data/projects.ts`**

```ts
export type ProjectColor = 'lavender' | 'peach' | 'ochre';

export type Project = {
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  live?: string;
  color: ProjectColor;
  date?: string;
};

export const featuredProjects: Project[] = [
  {
    title: 'PhotoSage',
    description:
      'iOS app for private, ultra-fast photo search. On-device ML using CLIP — search your camera roll with natural language. 100 installs in the first week.',
    tech: ['Swift', 'SwiftUI', 'CLIP', 'CoreML'],
    color: 'lavender',
    date: 'Feb 2025',
  },
  {
    title: 'synap',
    description:
      'Personal knowledge graph — links notes, repos, and conversations into a queryable second brain.',
    tech: ['Python', 'LLMs', 'Vector DB'],
    repo: 'https://github.com/aatmik-panse/synap',
    color: 'peach',
  },
  {
    title: 'tryonforshopify',
    description:
      'Shopify app that lets shoppers virtually try on apparel before checkout. Ships with the storefront in <1s LCP.',
    tech: ['JavaScript', 'Shopify', 'Python'],
    repo: 'https://github.com/aatmik-panse/tryonforshopify',
    color: 'ochre',
  },
];

export type OssRepo = {
  name: string;
  description: string;
  language: string;
  url: string;
  pushed: string;
};

export const ossHighlights: OssRepo[] = [
  {
    name: 'chrome-reader',
    description: 'Chrome extension for distraction-free reading.',
    language: 'TypeScript',
    url: 'https://github.com/aatmik-panse/chrome-reader',
    pushed: 'Apr 2026',
  },
  {
    name: 'shopify-openenv-rl',
    description: 'RL playground for the Shopify open environment.',
    language: 'Python',
    url: 'https://github.com/aatmik-panse/shopify-openenv-rl',
    pushed: 'Apr 2026',
  },
  {
    name: 'whisper-flow',
    description: 'Streaming voice-to-text pipeline.',
    language: 'JavaScript',
    url: 'https://github.com/aatmik-panse/whisper-flow',
    pushed: 'Jun 2025',
  },
  {
    name: 'redisInGO',
    description: 'A toy Redis server reimplemented in Go.',
    language: 'Go',
    url: 'https://github.com/aatmik-panse/redisInGO',
    pushed: 'May 2025',
  },
  {
    name: 'ascend',
    description: 'Goal-tracking web app — habits, streaks, and weekly reviews.',
    language: 'JavaScript',
    url: 'https://github.com/aatmik-panse/ascend',
    pushed: 'May 2025',
  },
];
```

- [ ] **Step 4: Write `src/data/skills.ts`**

```ts
export const skills = {
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'Swift', 'Kotlin', 'SQL', 'HTML/CSS'],
  frameworks: ['React', 'Next.js', 'Spring Boot', 'SwiftUI', 'Material UI'],
  tools: ['Git', 'Xcode', 'IntelliJ', 'PyCharm', 'Android Studio', 'Visual Studio'],
  libraries: ['Pandas', 'NumPy', 'Matplotlib'],
} as const;
```

- [ ] **Step 5: Write `src/data/education.ts`**

```ts
export type Education = {
  school: string;
  degree: string;
  score: string;
  dates: string;
  location: string;
  awards?: string[];
};

export const education: Education[] = [
  {
    school: 'Scaler School Of Technology',
    degree: 'Computer Science',
    score: 'CGPA 8.75',
    dates: 'Jul 2023 — Aug 2027',
    location: 'Bengaluru, India',
    awards: ["Dean's List 2025"],
  },
  {
    school: 'Birla Institute Of Technology, Pilani',
    degree: 'Bachelor of Science in Computer Science',
    score: 'CGR 9.0',
    dates: 'Jul 2023 — Aug 2026',
    location: 'Pilani, India',
  },
];
```

- [ ] **Step 6: Type-check**

Run: `bun run lint`
Expected: PASS — `tsc --noEmit` returns 0.

- [ ] **Step 7: Commit**

```bash
git add src/data
git commit -m "feat: add typed data modules from resume + repos"
```

---

## Task 14: `Nav` section

**Files:**
- Create: `src/components/sections/Nav.tsx`

- [ ] **Step 1: Write `src/components/sections/Nav.tsx`**

```tsx
import { useState } from 'react';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';
import { cn } from '../../lib/cn';

const items = [
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-sm border-b border-hairline">
      <div className="mx-auto max-w-content h-16 px-lg flex items-center justify-between">
        <a href="#top" className="font-display text-title-lg tracking-[-0.02em]">
          {profile.name.split(' ')[0]}
        </a>
        <ul className="hidden md:flex items-center gap-xl">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="text-nav text-body hover:text-ink">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-md">
          <Button href={`mailto:${profile.email}`} variant="primary">
            Get in touch
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-sm rounded-md min-h-[44px] min-w-[44px]"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-5 h-0.5 bg-ink mb-1.5" />
          <span className="block w-5 h-0.5 bg-ink mb-1.5" />
          <span className="block w-5 h-0.5 bg-ink" />
        </button>
      </div>
      <div className={cn('md:hidden border-t border-hairline', !open && 'hidden')}>
        <ul className="px-lg py-md flex flex-col gap-md">
          {items.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                className="block text-nav text-body py-sm"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            </li>
          ))}
          <li>
            <Button href={`mailto:${profile.email}`} variant="primary" className="w-full">
              Get in touch
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Wire into App temporarily**

Replace `src/App.tsx`:

```tsx
import { Nav } from './components/sections/Nav';

export default function App() {
  return (
    <div id="top">
      <Nav />
      <main className="mx-auto max-w-content px-lg py-section">
        <p className="font-display text-display-lg">Sections coming next.</p>
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Smoke-run dev server**

Run `bun run dev`, open `http://localhost:5173`. Verify:
- Nav is sticky with cream background and hairline bottom border.
- Anchors are centered (desktop) or hidden behind hamburger (mobile).
- "Get in touch" button is at right.

Stop with Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Nav.tsx src/App.tsx
git commit -m "feat: add Nav section"
```

---

## Task 15: `Hero` section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Write `src/components/sections/Hero.tsx`**

```tsx
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
```

- [ ] **Step 2: Wire into App**

Replace `src/App.tsx`:

```tsx
import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
    </div>
  );
}
```

- [ ] **Step 3: Smoke-run dev server**

Run `bun run dev`. Verify:
- Hero displays at `localhost:5173`.
- Headline is large display weight, slightly negative tracking, on cream.
- The image at `https://aatmik.de/1.jpg` loads on the right.
- Buttons are visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/App.tsx
git commit -m "feat: add Hero section"
```

---

## Task 16: `FeaturedWork` section (Gradonix on teal)

**Files:**
- Create: `src/components/sections/FeaturedWork.tsx`

- [ ] **Step 1: Write `src/components/sections/FeaturedWork.tsx`**

```tsx
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
                  — {b}
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
              PRODUCT SHOT — UPLOAD AS /2.jpg
            </div>
          </div>
        </div>
      </FeatureCard>
    </section>
  );
}
```

- [ ] **Step 2: Wire into App**

Update `src/App.tsx`:

```tsx
import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { FeaturedWork } from './components/sections/FeaturedWork';

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <FeaturedWork />
    </div>
  );
}
```

- [ ] **Step 3: Smoke-run dev server**

Verify the deep teal Gradonix card renders with white text and a placeholder for the product image.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/FeaturedWork.tsx src/App.tsx
git commit -m "feat: add FeaturedWork section (Gradonix teal card)"
```

---

## Task 17: `Experience` section

**Files:**
- Create: `src/components/sections/Experience.tsx`

- [ ] **Step 1: Write `src/components/sections/Experience.tsx`**

```tsx
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
```

- [ ] **Step 2: Wire into App**

```tsx
import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { FeaturedWork } from './components/sections/FeaturedWork';
import { Experience } from './components/sections/Experience';

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <FeaturedWork />
      <Experience />
    </div>
  );
}
```

- [ ] **Step 3: Smoke-run**

Verify three cream cards render side-by-side at desktop.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Experience.tsx src/App.tsx
git commit -m "feat: add Experience section (cream cards)"
```

---

## Task 18: `Projects` section (lavender → peach → ochre)

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Write `src/components/sections/Projects.tsx`**

```tsx
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
```

- [ ] **Step 2: Wire into App**

```tsx
import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { FeaturedWork } from './components/sections/FeaturedWork';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <FeaturedWork />
      <Experience />
      <Projects />
    </div>
  );
}
```

- [ ] **Step 3: Smoke-run**

Verify lavender, peach, ochre cards in that order, no two adjacent same-colored.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Projects.tsx src/App.tsx
git commit -m "feat: add Projects section (lavender/peach/ochre)"
```

---

## Task 19: `OpenSource`, `Skills`, `Education`, `Cta`, `Footer` sections

This task batches the smaller sections together. Commit after all five are added.

**Files:**
- Create: `src/components/sections/OpenSource.tsx`
- Create: `src/components/sections/Skills.tsx`
- Create: `src/components/sections/Education.tsx`
- Create: `src/components/sections/Cta.tsx`
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Write `src/components/sections/OpenSource.tsx`**

```tsx
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
```

- [ ] **Step 2: Write `src/components/sections/Skills.tsx`**

```tsx
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
```

- [ ] **Step 3: Write `src/components/sections/Education.tsx`**

```tsx
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
                    🏆 {a}
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
```

- [ ] **Step 4: Write `src/components/sections/Cta.tsx`**

```tsx
import { Button } from '../ui/Button';
import { Mountain } from '../ui/Mountain';
import { profile } from '../../data/profile';

export function Cta() {
  return (
    <section id="contact" className="mx-auto max-w-content px-lg py-section">
      <div className="relative overflow-hidden rounded-xl bg-surface-soft p-xxl lg:p-section">
        <div className="relative z-10 flex flex-col gap-md max-w-2xl">
          <h2 className="font-display text-display-md text-ink">
            Let's build something.
          </h2>
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
```

- [ ] **Step 5: Write `src/components/sections/Footer.tsx`**

```tsx
import { Mountain } from '../ui/Mountain';
import { profile } from '../../data/profile';

export function Footer() {
  const cols = [
    {
      title: 'Sections',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'Projects', href: '#projects' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Profiles',
      links: [
        { label: 'GitHub', href: profile.links.github },
        { label: 'LinkedIn', href: profile.links.linkedin },
      ],
    },
    {
      title: 'Projects',
      links: [
        { label: 'Gradonix', href: 'https://gradonix.com' },
        { label: 'PhotoSage', href: '#projects' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: profile.email, href: `mailto:${profile.email}` },
        { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
      ],
    },
  ];
  return (
    <footer className="bg-surface-soft border-t border-hairline mt-xxl">
      <div className="mx-auto max-w-content px-lg py-xxl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-xl">
          {cols.map((c) => (
            <div key={c.title} className="flex flex-col gap-sm">
              <p className="text-caption-up text-muted">{c.title}</p>
              <ul className="flex flex-col gap-xs">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-body-sm text-body hover:text-ink"
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-xxl text-caption text-muted-soft">
          © {new Date().getFullYear()} {profile.name}. Built in cream.
        </p>
      </div>
      <div className="opacity-60 pointer-events-none">
        <Mountain tone="peach" />
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Wire all sections into App**

Replace `src/App.tsx`:

```tsx
import { Nav } from './components/sections/Nav';
import { Hero } from './components/sections/Hero';
import { FeaturedWork } from './components/sections/FeaturedWork';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { OpenSource } from './components/sections/OpenSource';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Cta } from './components/sections/Cta';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <div id="top" className="bg-canvas text-ink">
      <Nav />
      <Hero />
      <FeaturedWork />
      <Experience />
      <Projects />
      <OpenSource />
      <Skills />
      <Education />
      <Cta />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 7: Smoke-run dev server**

Run `bun run dev`. Verify:
- All 10 sections render top-to-bottom.
- No console errors or warnings.
- Color rhythm: teal → cream → lavender/peach/ochre → canvas → canvas → cream → cream-soft → cream footer.
- Footer is cream (NOT dark).
- All anchor links scroll to their sections.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections src/App.tsx
git commit -m "feat: add OpenSource, Skills, Education, Cta, Footer sections"
```

---

## Task 20: Responsive pass

**Files:**
- Modify: any sections that fail at 375px / 768px / 1280px

- [ ] **Step 1: Test at 375px (mobile)**

In Chrome DevTools, switch to iPhone SE (375px) viewport. Verify:
- No horizontal scroll anywhere on the page.
- Hero stacks: headline above image.
- Nav collapses to hamburger; tapping it reveals the menu.
- Experience cards: 1-up.
- Projects cards: 1-up.
- Education cards: 1-up.
- Footer: 2-up grid.
- All buttons/anchors have ≥44×44px hit area.

- [ ] **Step 2: Test at 768px (tablet)**

Switch to iPad Mini (768px). Verify:
- Experience cards: 2-up.
- Projects cards: 2-up.
- Education cards: 2-up.
- Nav still hamburger or tightly horizontal.
- Hero may still be 1-column.

- [ ] **Step 3: Test at 1280px (desktop)**

Switch to default desktop. Verify:
- Hero is 7/5 split.
- Experience cards: 3-up.
- Projects cards: 3-up.
- Nav is fully horizontal.
- Content max-width caps at 1280px.

- [ ] **Step 4: Fix any issues inline**

If any section broke, tweak grid classes (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). Re-test.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: responsive pass at 375/768/1280" --allow-empty
```

(Use `--allow-empty` only if no changes were needed; otherwise drop the flag.)

---

## Task 21: Vercel config and production build

**Files:**
- Create: `vercel.json`
- Modify: `index.html` (verify meta tags)

- [ ] **Step 1: Write `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "installCommand": "bun install",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)\\.(js|css|woff2|jpg|jpeg|png|webp|svg)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

- [ ] **Step 2: Production build**

Run:
```bash
bun run build
```

Expected: TS compiles, Vite produces `dist/` with `index.html` + hashed JS/CSS. No errors. Total JS < 200KB pre-gzip (Vite reports sizes after build).

- [ ] **Step 3: Preview the build**

Run:
```bash
bun run preview
```

Open `http://localhost:4173`. Verify the production bundle renders identically to dev. Stop with Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add vercel.json
git commit -m "chore: add Vercel deploy config"
```

---

## Task 22: Lighthouse audit

This is a verification task — no code changes unless an axis falls below 95.

- [ ] **Step 1: Run preview server in background**

Run:
```bash
bun run preview
```

- [ ] **Step 2: Run Lighthouse on the production preview**

Open Chrome DevTools → Lighthouse → Mobile → all four categories. Run.

Expected:
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95
- Cumulative Layout Shift = 0
- LCP ≤ 2.5s

- [ ] **Step 3: Fix any failing axes**

Common fixes:
- LCP regression → confirm `<img priority>` is on the hero image (renders `loading="eager" fetchpriority="high"`).
- CLS regression → audit any `<img>` missing width/height; check that fonts use `font-display: swap` or are self-hosted.
- Accessibility regression → run `npm i -D axe-core` and check for missing alt text or low contrast.
- SEO regression → confirm `<title>`, `<meta name="description">`, `<html lang="en">` are present.

Apply fixes, re-run.

- [ ] **Step 4: Stop the preview server**

Ctrl-C the preview process.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "perf: address Lighthouse findings" --allow-empty
```

---

## Task 23: Delete legacy CRA surface

This is the cleanup task. Only run after the new site is verified and committed.

**Files to delete:**
- `src/App.css`
- `src/App.js`
- `src/App.test.js`
- `src/index.css` *(only if it still exists from CRA — the new one is in `src/styles/index.css`)*
- `src/index.js`
- `src/logo.svg`
- `src/reportWebVitals.js`
- `src/setupTests.js`
- `src/components/About/`
- `src/components/Card/`
- `src/components/Education/`
- `src/components/Experience/`
- `src/components/Footer/`
- `src/components/Home/`
- `src/components/Navbar/`
- `src/components/Projects/`
- `src/components/Skills/`
- `src/components/Tiles/`
- `src/components/Typing/`
- `src/components/svgviewer-png-output.png`
- `src/pages/HomePage/`
- `src/pages/ProjectPage/`
- `src/assets/codeImg.webp`
- `src/assets/deskImg.webp`
- `src/assets/dp.webp`
- `src/assets/eqbImg.webp`
- `public/logo6.png` *(unused; legacy CRA asset)*
- `public/manifest.json` *(unused; CRA artifact)*

- [ ] **Step 1: Verify new files don't depend on any of the above**

Run:
```bash
grep -rn "App\.css\|reportWebVitals\|logo\.svg\|HomePage\|ProjectPage\|components/About\|components/Card\|components/Education\|components/Experience\|components/Footer\|components/Home\|components/Navbar\|components/Projects\|components/Skills\|components/Tiles\|components/Typing\|assets/codeImg\|assets/deskImg\|assets/dp\|assets/eqbImg\|logo6\|manifest" src/ index.html 2>/dev/null
```

Expected: no matches in `src/components/`, `src/data/`, `src/lib/`, `src/styles/`, `src/test/`, `src/main.tsx`, `src/App.tsx`, `index.html`. (The grep itself prints nothing if clean.)

- [ ] **Step 2: Delete legacy files**

```bash
rm -f src/App.css src/App.js src/App.test.js src/index.js src/logo.svg src/reportWebVitals.js src/setupTests.js
rm -rf src/components/About src/components/Card src/components/Education src/components/Experience src/components/Footer src/components/Home src/components/Navbar src/components/Projects src/components/Skills src/components/Tiles src/components/Typing
rm -f src/components/svgviewer-png-output.png
rm -rf src/pages
rm -rf src/assets
rm -f public/logo6.png public/manifest.json
# Only delete src/index.css if it still exists from CRA (the new one is at src/styles/index.css):
[ -f src/index.css ] && rm src/index.css || true
```

- [ ] **Step 3: Type-check + test**

Run:
```bash
bun run lint && bun run test && bun run build
```

Expected: all three pass.

- [ ] **Step 4: Smoke-run dev server**

`bun run dev`, open the page, verify it still renders all 10 sections identically.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove legacy CRA surface"
```

---

## Task 24: Final verification

- [ ] **Step 1: Re-run production build**

```bash
bun run build
```

Expected: clean build with TS errors = 0.

- [ ] **Step 2: Re-run Lighthouse**

`bun run preview` → Lighthouse → confirm ≥95 across all four axes, CLS = 0.

- [ ] **Step 3: Verify acceptance criteria from spec**

Check each item from the spec's "Acceptance criteria" list (lines 269-282 of `docs/superpowers/specs/2026-04-30-portfolio-redesign-design.md`). Tick them mentally; if any fail, open a follow-up commit to address.

- [ ] **Step 4: Final commit**

```bash
git commit --allow-empty -m "feat: portfolio redesign complete"
```

- [ ] **Step 5: Push to main**

```bash
git push origin main
```

(Vercel will auto-deploy if the project is wired to this repo.)

---

## Self-Review

**Spec coverage check:**

| Spec section | Implementing task |
|---|---|
| Stack (Vite + React + TS + Tailwind) | Task 2, 3, 4 |
| Routing (single-page hash anchors) | Task 14 (Nav) + `vercel.json` rewrite (Task 21) |
| Section 1 — Top nav | Task 14 |
| Section 2 — Hero | Task 15 |
| Section 3 — Featured work (Gradonix teal) | Task 16 |
| Section 4 — Experience (cream cards) | Task 17 |
| Section 5 — Projects (lavender/peach/ochre) | Task 18 |
| Section 6 — Open source | Task 19 |
| Section 7 — Skills | Task 19 |
| Section 8 — Education | Task 19 |
| Section 9 — CTA | Task 19 |
| Section 10 — Footer (cream, mountain) | Task 19 |
| Color cycling rule | Tasks 16-19 (variant choices encoded) |
| Component & file layout | All tasks; structure declared at top of plan |
| Tailwind tokens | Task 4 |
| `lib/cdn.ts` + CdnImage contract | Tasks 7, 10 |
| Typography (Inter 500 + negative tracking) | Task 4 (`fontSize` tokens) + Task 5 (font import in `styles/index.css`) |
| Accessibility & perf budgets | Task 22 (Lighthouse) |
| Data model | Task 13 |
| Files to delete | Task 23 |
| Risks & mitigations | Task 1 (snapshot), Task 21 (preview before deploy) |
| Acceptance criteria | Task 22 + Task 24 |

**Placeholder scan:** No "TBD"s. Each step contains either exact code or an exact command. Where tests are stubbed (`expect(...)`), the corresponding implementation step shows the function being tested.

**Type consistency check:**
- `FeatureCardVariant` is `'teal' | 'lavender' | 'peach' | 'ochre' | 'cream'` (Task 11) and used identically in Task 17, 18, 19.
- `ProjectColor` is `'lavender' | 'peach' | 'ochre'` (Task 13) and is the only set passed to `FeatureCard` in Projects (Task 18) — consistent.
- `cdn.hero` (Task 7) is referenced in Hero (Task 15) — consistent.
- `Button` `variant` prop is `'primary' | 'secondary' | 'onColor' | 'textLink'` (Task 8) and these are the only variants used across sections — consistent.
- `Pill` `tone` prop is `'cream' | 'canvas' | 'onDark'` (Task 9) and the Education + Projects + Skills sections use only these — consistent.

No inconsistencies found.
