import { Button } from '../atoms/Button';

export function SiteHeader() {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="text-base font-semibold tracking-normal">
          CodeMatch
        </a>

        <nav className="flex items-center gap-2">
          <a
            href="/login"
            className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Log in
          </a>
          <Button href="/signup" className="h-9 px-4">
            Get started
          </Button>
        </nav>
      </div>
    </header>
  );
}
