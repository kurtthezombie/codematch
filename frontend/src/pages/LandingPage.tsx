import { SiteHeader } from '../components/molecules/SiteHeader';
import { LandingHero } from '../components/organisms/LandingHero';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <LandingHero />
    </main>
  );
}
