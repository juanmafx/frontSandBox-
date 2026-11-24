import { describe, expect, it } from 'vitest';
import { toSafeExternalUrl } from './safeExternalUrl';

describe('toSafeExternalUrl', () => {
  it('accepts an https URL', () => {
    expect(toSafeExternalUrl('https://example.com/path?q=1')).toBe('https://example.com/path?q=1');
  });

  it.each([
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'file:///etc/passwd',
    'http://example.com',
    '//example.com',
    '/relative/path',
    '',
    'not a url',
    ' https://example.com',
    'https://example.com\n',
    'https://user:pass@example.com',
    'https://user@example.com',
  ])('rejects %j', (candidate) => {
    expect(toSafeExternalUrl(candidate)).toBeNull();
  });
});
