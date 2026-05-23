import { SiteHeader } from '@/components/molecules/SiteHeader';
import { LoginForm } from '@/components/organisms/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="login" />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-6 py-16">
        <LoginForm />
      </div>
    </main>
  );
}
