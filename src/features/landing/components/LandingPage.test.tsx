import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { SiteConfig } from '../../../config/site';
import { LandingPage } from './LandingPage';

const config: SiteConfig = {
  authorName: 'Test Author',
  deploymentUrl: 'https://example.com/',
  deploymentLabel: 'Visit',
  editablePath: 'src/example.tsx',
};

describe('LandingPage', () => {
  it('exposes a main landmark and a heading', () => {
    render(<LandingPage config={config} />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Test Author' })).toBeInTheDocument();
  });

  it('shows the editable path', () => {
    render(<LandingPage config={config} />);
    expect(screen.getByText('src/example.tsx').tagName).toBe('CODE');
  });

  it('links to the configured deployment', () => {
    render(<LandingPage config={config} />);
    expect(screen.getByRole('link', { name: 'Visit' })).toHaveAttribute('href', 'https://example.com/');
  });

  it('treats configured text as data rather than markup', () => {
    const authorName = '<img src=x onerror=alert(1)>';
    const { container } = render(<LandingPage config={{ ...config, authorName }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(authorName);
    expect(container.querySelector('img[src="x"]')).toBeNull();
  });

  it('marks the logo as decorative', () => {
    const { container } = render(<LandingPage config={config} />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
});
