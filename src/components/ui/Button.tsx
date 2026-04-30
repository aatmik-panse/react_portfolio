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
  const { children, variant = 'primary', className } = props;
  const classes = cn(base, variants[variant], className);

  if ('href' in props && props.href) {
    const { children: _c, variant: _v, className: _cn, href, ...anchorRest } = props;
    void _c; void _v; void _cn;
    const isExternal = href.startsWith('http');
    return (
      <a
        {...anchorRest}
        href={href}
        className={classes}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }
  const { children: _c, variant: _v, className: _cn, href: _h, ...buttonRest } = props as AsButton;
  void _c; void _v; void _cn; void _h;
  return (
    <button {...buttonRest} className={classes}>
      {children}
    </button>
  );
}
