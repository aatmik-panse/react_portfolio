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
