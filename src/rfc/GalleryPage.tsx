import '@fontsource-variable/geist-mono';
import { photos } from './gallery';

// Unlinked on purpose: reachable by URL and via the sitemap, not from the homepage.
export default function GalleryPage() {
  return (
    <div className="min-h-[100dvh] bg-[#f6f6f4] text-[#1c1c1c]" style={{ fontFamily: '"Geist Mono Variable", monospace' }}>
      <main className="mx-auto max-w-[78ch] px-4 py-12 text-[14px] leading-[1.7] md:py-20">
        <a href="/" className="text-[#55565a] hover:underline">
          Back to the document
        </a>
        <h1 className="mt-10 text-2xl font-bold leading-snug md:text-[28px]">Appendix A. Photos of Aatmik Panse</h1>
        <p className="mt-3 text-[#55565a]">Away from the keyboard.</p>

        <div className="mt-10 space-y-12">
          {photos.map((p, i) => (
            <figure key={p.src}>
              <img
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-auto w-full bg-[#e7e7e3]"
              />
              <figcaption className="mt-3 text-[#55565a]">
                Figure {i + 1}. {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
    </div>
  );
}
