import { LandingPage } from '../features/landing/components/LandingPage';
import { siteConfig } from '../config/site';

export default function App() {
  return <LandingPage config={siteConfig} />;
}
