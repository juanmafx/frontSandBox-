import type { ReactNode } from 'react';
import { toSafeExternalUrl } from '../security/safeExternalUrl';

interface ExternalLinkProps {
  readonly href: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  const safeHref = toSafeExternalUrl(href);

  if (safeHref === null) {
    return <span className={className}>{children}</span>;
  }

  return (
    <a className={className} href={safeHref} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
