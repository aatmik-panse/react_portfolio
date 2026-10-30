# GEO / SEO analysis: www.aatmik.de

Date: 2026-10-30. Scope: single-page portfolio (RFC-style homepage).

## Readiness score

| | Before | After this change |
|---|---|---|
| GEO readiness | ~25/100 | ~70/100 |

The remaining gap is off-site (entity and brand presence), not something the repo can fix.

## What was wrong

1. **Client-only rendering.** The served HTML was an empty `<div id="root">`. GPTBot, ClaudeBot and PerplexityBot do not execute JavaScript, so they saw no content at all.
2. Stale meta description ("Founder of Gradonix").
3. No canonical; `og:url` pointed at `aatmik.de`, which 308-redirects to `www.aatmik.de`.
4. No structured data, so no machine-readable link between the person, getSichtbar, GitHub and LinkedIn.
5. `/sitemap.xml` returned the SPA shell (soft 200); robots.txt had no sitemap.

## What changed

| Area | Change |
|---|---|
| Rendering | Build-time prerender (`src/entry-server.tsx`, `scripts/prerender.mjs`); the client hydrates. Raw HTML now carries the full page (~650 words). |
| Head | New title and description, canonical `https://www.aatmik.de/`, complete Open Graph / Twitter tags, `rel="me"` profile links. |
| Structured data | `ProfilePage` + `Person` JSON-LD (jobTitle, worksFor getSichtbar, alumniOf, knowsAbout, sameAs GitHub/LinkedIn/X), generated from `src/data`, so it cannot drift from the page. |
| Freshness | Header date and `dateModified` come from the build date, so every deploy refreshes them. |
| Citability | Abstract opens with a self-contained "Aatmik Panse is a Technical Product Lead at getSichtbar..." sentence in the first 60 words. |
| Crawling | robots.txt explicitly allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended; real `sitemap.xml` with `lastmod`. |

Not added: `llms.txt`. Google and published log studies show no citation effect, so it was left out on purpose.

## Highest-impact next steps (off-site, owner action)

1. **Google Search Console + Bing Webmaster Tools**: verify `www.aatmik.de`, submit the sitemap, request indexing.
2. **Consistent entity everywhere**: same name, title and `aatmik.de` link on LinkedIn, GitHub, X and the getSichtbar team page. AI engines resolve people by these cross-links.
3. **getSichtbar team page** linking to aatmik.de: the strongest single third-party signal available.
4. **Write and publish**: one or two technical posts (for example on GEO / AI visibility work) on aatmik.de or LinkedIn. Brand mentions correlate with AI citations more than backlinks.
5. **Real photo** as the OG image and `Person.image` (the current one is shared with the old site).
