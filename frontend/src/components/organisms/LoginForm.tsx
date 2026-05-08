import { ArrowRight } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import type { LoginResponse } from '../../types/auth';

import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';

export function LoginForm() {
  const [searchParams] = useSearchParams();
  const [showAccountCreated, setShowAccountCreated] = useState(
    searchParams.get('created') === '1'
  );
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get('identifier'));
    const password = String(formData.get('password'));
    
    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        identifier,
        password,
      });

      login(response.access_token, response.user);
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not log in.');
    } finally {
      setIsSubmitting(false);
    }
  }

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

      <form className="space-y-5" onSubmit={handleSubmit}>
        <FormField
          id="identifier"
          label="Email or username"
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="you@example.com or janedoe"
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
  
        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}  

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
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
