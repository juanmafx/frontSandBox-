import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExternalLink } from './ExternalLink';

describe('ExternalLink', () => {
  it('isolates the opened page from this one', () => {
    render(<ExternalLink href="https://example.com/">Example</ExternalLink>);
    const link = screen.getByRole('link', { name: 'Example' });
    expect(link).toHaveAttribute('href', 'https://example.com/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders plain text for an unsafe URL', () => {
    render(<ExternalLink href="javascript:alert(1)">Unsafe</ExternalLink>);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('Unsafe')).toBeInTheDocument();
  });

  it('keeps the class name on the fallback', () => {
    render(<ExternalLink href="http://example.com" className="link">Fallback</ExternalLink>);
    expect(screen.getByText('Fallback')).toHaveClass('link');
  });
});
