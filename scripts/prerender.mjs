// Post-build step: bake each page's rendered HTML, head tags and JSON-LD into
// dist/, plus the sitemap. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do
// not run JavaScript, so the content has to be in the HTML response itself.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { pages, sitemap, lastUpdated } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error('prerender: placeholders missing from dist/index.html');
}

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Swap the homepage head values in index.html for this page's values. Throws if a tag is missing. */
function withHead(html, head) {
  const swaps = [
    [/<title>[^<]*<\/title>/, `<title>${attr(head.title)}</title>`],
    [/(<meta name="description" content=")[^"]*/, `$1${attr(head.description)}`],
    [/(<link rel="canonical" href=")[^"]*/, `$1${head.url}`],
    [/(<meta property="og:title" content=")[^"]*/, `$1${attr(head.title)}`],
    [/(<meta property="og:description" content=")[^"]*/, `$1${attr(head.description)}`],
    [/(<meta property="og:url" content=")[^"]*/, `$1${head.url}`],
    [/(<meta property="og:image" content=")[^"]*/, `$1${head.image}`],
    [/(<meta name="twitter:title" content=")[^"]*/, `$1${attr(head.title)}`],
    [/(<meta name="twitter:description" content=")[^"]*/, `$1${attr(head.description)}`],
    [/(<meta name="twitter:image" content=")[^"]*/, `$1${head.image}`],
  ];
  for (const [re, value] of swaps) {
    if (!re.test(html)) throw new Error(`prerender: head tag not found for ${re}`);
    html = html.replace(re, value);
  }
  return html;
}

for (const page of pages()) {
  const out = withHead(template, page.head)
    .replace('<!--app-head-->', `<script type="application/ld+json">${page.jsonLd}</script>`)
    .replace('<!--app-html-->', page.html);
  const file = path.join(dist, page.file);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, out);
  console.log(`prerender: wrote ${page.file} (${out.length} bytes)`);
}

await writeFile(path.join(dist, 'sitemap.xml'), sitemap());
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote sitemap.xml (lastmod ${lastUpdated})`);
