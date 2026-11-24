export interface SiteConfig {
  readonly authorName: string;
  readonly deploymentUrl: string;
  readonly deploymentLabel: string;
  readonly editablePath: string;
}

export const siteConfig: SiteConfig = {
  authorName: 'Juan Manuel Ramallo',
  deploymentUrl: 'https://juanmafx.github.io/frontSandBox-/',
  deploymentLabel: 'Open the deployed site',
  editablePath: 'src/app/App.tsx',
};
