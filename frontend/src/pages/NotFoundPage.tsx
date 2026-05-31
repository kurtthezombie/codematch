import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/atoms/Button';
import { SiteHeader } from '@/components/molecules/SiteHeader';
import { useAuth } from '@/context/AuthContext';

export default function NotFoundPage() {
  const { isAuthenticated, user } = useAuth();
  const destination = isAuthenticated
    ? user?.role === 'admin'
      ? '/admin/dashboard'
      : '/dashboard'
    : '/';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="notfound" />

      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl content-center px-6 py-16">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-medium text-muted-foreground">404</p>

          <h1 className="text-5xl font-semibold leading-tight tracking-normal text-foreground sm:text-6xl">
            This page does not exist.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            The address may be wrong, or the page may have moved.
          </p>

          <div className="mt-8">
            <Button href={destination} className="gap-2">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {isAuthenticated ? 'Back to dashboard' : 'Back home'}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
