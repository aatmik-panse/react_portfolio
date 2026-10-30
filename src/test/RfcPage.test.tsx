import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RfcPage from '../rfc/RfcPage';
import { experience } from '../data/experience';

describe('RfcPage', () => {
  it('titles the document with the name only', () => {
    render(<RfcPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^Aatmik Panse$/);
    expect(screen.queryByText(/panse protocol/i)).toBeNull();
  });

  it('lists the current role first and every prior role', () => {
    render(<RfcPage />);
    const [current, ...prior] = experience;
    expect(screen.getAllByText(current.company).length).toBeGreaterThan(0);
    for (const e of prior) {
      expect(screen.getAllByText(new RegExp(e.company.replace(/[()]/g, '\\$&'))).length).toBeGreaterThan(0);
    }
  });

  it('does not show the phone number', () => {
    render(<RfcPage />);
    expect(document.body.textContent).not.toContain('9424608520');
  });
});
