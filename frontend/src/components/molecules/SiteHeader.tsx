import { Button } from '@/components/atoms/Button';

type SiteHeaderVariant = 'landing' | 'login' | 'signup' | 'notfound';

type SiteHeaderProps = {
  variant?: SiteHeaderVariant;
};

export function SiteHeader({ variant = 'landing' }: SiteHeaderProps) {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="text-base font-semibold tracking-normal">
          CodeMatch
        </a>

        <nav className="flex items-center gap-2">
          {variant === 'landing' && (
            <>
              <a
                href="/login"
                className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                Log in
              </a>
              <Button href="/signup" className="h-9 px-4">
                Get started
              </Button>
            </>
          )}

          {variant === 'login' && (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                New here?
              </span>
              <Button href="/signup" className="h-9 px-4">
                Sign up
              </Button>
            </>
          )}

          {variant === 'signup' && (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Already have an account?
              </span>
              <Button href="/login" variant="secondary" className="h-9 px-4">
                Log in
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
