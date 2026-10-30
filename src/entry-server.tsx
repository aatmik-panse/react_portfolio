import { renderToString } from 'react-dom/server';
import App from './App';
import { buildJsonLd } from './rfc/seo';
import { lastUpdated } from './rfc/content';

/** Build-time entry: scripts/prerender.mjs injects this HTML so crawlers that skip JS still get the content. */
export function render(): string {
  return renderToString(<App />);
}

export function jsonLd(): string {
  // Escape "<" so the JSON can never close the surrounding <script> tag.
  return JSON.stringify(buildJsonLd(lastUpdated)).replace(/</g, '\\u003c');
}

export { lastUpdated };
