import { renderToString } from 'react-dom/server';
import App from './App';
import { buildGalleryJsonLd, buildJsonLd, buildSitemap, galleryHead, homeHead, type PageHead } from './rfc/seo';
import { lastUpdated } from './rfc/content';

export type PrerenderPage = { file: string; head: PageHead; html: string; jsonLd: string };

// Escape "<" so the JSON can never close the surrounding <script> tag.
const toScriptJson = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

/** Build-time entry: scripts/prerender.mjs writes these so crawlers that skip JS still get the content. */
export function render(path = '/'): string {
  return renderToString(<App path={path} />);
}

export function pages(): PrerenderPage[] {
  return [
    { file: 'index.html', head: homeHead, html: render('/'), jsonLd: toScriptJson(buildJsonLd(lastUpdated)) },
    {
      file: 'gallery/index.html',
      head: galleryHead,
      html: render('/gallery/'),
      jsonLd: toScriptJson(buildGalleryJsonLd(lastUpdated)),
    },
  ];
}

export function sitemap(): string {
  return buildSitemap(lastUpdated);
}

export { lastUpdated };
