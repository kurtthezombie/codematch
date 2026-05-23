import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { api } from '../../utils/api';
import type { SignupResponse } from '../../types/auth';

export function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username'));
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const confirmPassword = String(formData.get('confirmPassword'));

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post<SignupResponse>('/auth/signup', {
        username,
        email,
        password,
      });

      navigate('/login?created=1');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Could not create account.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-md">
      <div className="mb-8">
        <p className="text-sm font-medium text-muted-foreground">
          Start hiring with signal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
          Create your CodeMatch account
        </h1>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <FormField
          id="username"
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="janedoe"
          required
        />

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
          autoComplete="new-password"
          placeholder="Create a password"
          required
        />

        <FormField
          id="confirm-password"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          required
        />

        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <div className="mt-6 border-t border-border pt-6">
        <p className="mb-3 text-sm text-muted-foreground">
          Already have an account?
        </p>
        <Button href="/login" variant="secondary" className="w-full gap-2">
          Log in
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
