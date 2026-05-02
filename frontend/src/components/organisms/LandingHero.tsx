import { ArrowRight } from 'lucide-react';

import { Button } from '../atoms/Button';

const stats = [
  { label: 'Challenge reviews', value: '12k+' },
  { label: 'Hiring signals', value: '8' },
  { label: 'Review time saved', value: '42%' },
];

export function LandingHero() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl content-center gap-14 px-6 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
      <div>
        <p className="mb-5 text-sm font-medium text-muted-foreground">
          Practical technical hiring
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-normal text-foreground sm:text-6xl">
          Match developers by the work they can actually do.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          CodeMatch gives teams focused coding challenges, structured reviews,
          and clean candidate comparisons without noisy hiring signals.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/signup" className="gap-2">
            Start matching
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button href="/login" variant="secondary">
            Log in
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <p className="text-sm font-medium text-muted-foreground">
          Built for consistent reviews
        </p>

        <div className="mt-8 space-y-7">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-semibold tracking-normal">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
