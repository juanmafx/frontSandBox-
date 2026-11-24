import { describe, expect, it } from 'vitest';
import { contentSecurityPolicy, contentSecurityPolicyPlugin } from './contentSecurityPolicy';

describe('contentSecurityPolicy', () => {
  it('denies by default', () => {
    expect(contentSecurityPolicy).toContain("default-src 'none'");
  });

  it('never allows inline or evaluated code', () => {
    expect(contentSecurityPolicy).not.toContain('unsafe-inline');
    expect(contentSecurityPolicy).not.toContain('unsafe-eval');
  });

  it('blocks base tag, form, and plugin abuse', () => {
    expect(contentSecurityPolicy).toContain("base-uri 'none'");
    expect(contentSecurityPolicy).toContain("form-action 'none'");
    expect(contentSecurityPolicy).toContain("object-src 'none'");
  });

  it('applies only to production builds', () => {
    expect(contentSecurityPolicyPlugin().apply).toBe('build');
  });
});
