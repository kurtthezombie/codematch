import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../../lib/utils';

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: 'primary' | 'secondary';
};

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        variant === 'primary' &&
          'bg-foreground text-background hover:bg-foreground/90',
        variant === 'secondary' &&
          'border border-border bg-background text-foreground hover:bg-muted',
        className
      )}
      {...props}
    />
  );
}
