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
