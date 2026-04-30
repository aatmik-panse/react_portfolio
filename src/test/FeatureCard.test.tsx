import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureCard } from '../components/ui/FeatureCard';

describe('FeatureCard', () => {
  it('teal variant uses brand-teal background and white text', () => {
    render(<FeatureCard variant="teal">Hello</FeatureCard>);
    const card = screen.getByText('Hello').closest('div')!;
    expect(card).toHaveClass('bg-brand-teal');
    expect(card).toHaveClass('text-on-primary');
  });

  it('lavender variant uses brand-lavender background and ink text', () => {
    render(<FeatureCard variant="lavender">x</FeatureCard>);
    const card = screen.getByText('x').closest('div')!;
    expect(card).toHaveClass('bg-brand-lavender');
    expect(card).toHaveClass('text-ink');
  });

  it('peach variant uses brand-peach background and ink text', () => {
    render(<FeatureCard variant="peach">x</FeatureCard>);
    const card = screen.getByText('x').closest('div')!;
    expect(card).toHaveClass('bg-brand-peach');
    expect(card).toHaveClass('text-ink');
  });

  it('ochre variant uses brand-ochre background and ink text', () => {
    render(<FeatureCard variant="ochre">x</FeatureCard>);
    const card = screen.getByText('x').closest('div')!;
    expect(card).toHaveClass('bg-brand-ochre');
    expect(card).toHaveClass('text-ink');
  });

  it('cream variant uses surface-card background and ink text', () => {
    render(<FeatureCard variant="cream">x</FeatureCard>);
    const card = screen.getByText('x').closest('div')!;
    expect(card).toHaveClass('bg-surface-card');
    expect(card).toHaveClass('text-ink');
  });

  it('uses rounded-xl by default for the saturated card radius', () => {
    render(<FeatureCard variant="teal">x</FeatureCard>);
    expect(screen.getByText('x').closest('div')!).toHaveClass('rounded-xl');
  });
});
