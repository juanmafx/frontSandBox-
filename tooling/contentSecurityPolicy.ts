import type { Plugin } from 'vite';

const directives: Readonly<Record<string, string>> = {
  'default-src': "'none'",
  'script-src': "'self'",
  'style-src': "'self'",
  'img-src': "'self'",
  'manifest-src': "'self'",
  'base-uri': "'none'",
  'form-action': "'none'",
  'object-src': "'none'",
};

export const contentSecurityPolicy = Object.entries(directives)
  .map(([name, value]) => `${name} ${value}`)
  .join('; ');

export function contentSecurityPolicyPlugin(): Plugin {
  return {
    name: 'content-security-policy',
    apply: 'build',
    transformIndexHtml: () => [
      {
        tag: 'meta',
        attrs: { 'http-equiv': 'Content-Security-Policy', content: contentSecurityPolicy },
        injectTo: 'head-prepend',
      },
    ],
  };
}
