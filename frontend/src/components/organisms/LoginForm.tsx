import { ArrowRight } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';

export function LoginForm() {
  const [searchParams] = useSearchParams();
  const [showAccountCreated, setShowAccountCreated] = useState(
    searchParams.get('created') === '1'
  );

  function dismissAccountCreated() {
    setShowAccountCreated(false);
    window.history.replaceState(null, '', '/login');
  }

  return (
    <section className="w-full max-w-md">
      <div className="mb-8">
        <p className="text-sm font-medium text-muted-foreground">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
          Log in to CodeMatch
        </h1>
      </div>

      {showAccountCreated && (
        <div className="mb-6 flex items-start justify-between gap-4 rounded-md border border-emerald-300 bg-emerald-50 px-4 py-4 text-emerald-900 shadow-sm">
          <div>
            <p className="text-sm font-semibold">Account created successfully</p>
            <p className="mt-1 text-sm text-emerald-800">
              Log in to continue.
            </p>
          </div>
          <button
            type="button"
            onClick={dismissAccountCreated}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            aria-label="Dismiss account created message"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <form className="space-y-5">
        <FormField
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />

        <FormField
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
          helper={
            <a
              href="/forgot-password"
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          }
        />

        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>

      <div className="mt-6 border-t border-border pt-6">
        <p className="mb-3 text-sm text-muted-foreground">
          New to CodeMatch?
        </p>
        <Button href="/signup" variant="secondary" className="w-full gap-2">
          Create an account
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
