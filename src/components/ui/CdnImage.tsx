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
