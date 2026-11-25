export interface SiteConfig {
  readonly authorName: string;
  readonly deploymentUrl: string;
  readonly deploymentLabel: string;
  readonly editablePath: string;
}

export const siteConfig: SiteConfig = {
  authorName: 'Juan Manuel Ramallo',
  deploymentUrl: 'https://juanmafx.github.io/react-pages-sandbox/',
  deploymentLabel: 'Open the deployed site',
  editablePath: 'src/config/site.ts',
};
