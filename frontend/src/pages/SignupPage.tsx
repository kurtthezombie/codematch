import { SiteHeader } from '../components/molecules/SiteHeader';
import { SignupForm } from '../components/organisms/SignupForm';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="signup" />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-6 py-16">
        <SignupForm />
      </div>
    </main>
  );
}
