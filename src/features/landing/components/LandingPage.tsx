import logoUrl from '../../../assets/logo.svg';
import type { SiteConfig } from '../../../config/site';
import { ExternalLink } from '../../../shared/components/ExternalLink';
import './LandingPage.css';

interface LandingPageProps {
  readonly config: SiteConfig;
}

export function LandingPage({ config }: LandingPageProps) {
  return (
    <main className="landing">
      <img src={logoUrl} className="landing__logo" alt="" />
      <h1 className="landing__title">{config.authorName}</h1>
      <p>
        Edit <code>{config.editablePath}</code> and save to reload.
      </p>
      <ExternalLink className="landing__link" href={config.deploymentUrl}>
        {config.deploymentLabel}
      </ExternalLink>
    </main>
  );
}
