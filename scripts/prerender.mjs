// Post-build step: bake the rendered page, JSON-LD and a sitemap into dist/.
// AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not run JavaScript, so the
// content has to be in the HTML response itself.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, jsonLd, lastUpdated } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const indexPath = path.join(dist, 'index.html');
const template = await readFile(indexPath, 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error('prerender: placeholders missing from dist/index.html');
}

const html = template
  .replace('<!--app-head-->', `<script type="application/ld+json">${jsonLd()}</script>`)
  .replace('<!--app-html-->', render());
await writeFile(indexPath, html);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.aatmik.de/</loc>
    <lastmod>${lastUpdated}</lastmod>
  </url>
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote index.html (${html.length} bytes) and sitemap.xml (lastmod ${lastUpdated})`);
