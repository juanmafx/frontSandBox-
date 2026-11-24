import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { siteConfig } from '../config/site';

describe('App', () => {
  it('renders the landing page from the site configuration', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: siteConfig.authorName })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', siteConfig.deploymentUrl);
  });
});
