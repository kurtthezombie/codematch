import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { cn } from '../../lib/utils';

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
};

type ButtonAnchorProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonElementProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonProps = ButtonAnchorProps | ButtonElementProps;

function getButtonClassName({
  className,
  variant = 'primary',
}: Pick<ButtonBaseProps, 'className' | 'variant'>) {
  return cn(
    'inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variant === 'primary' &&
      'bg-foreground text-background hover:bg-foreground/90',
    variant === 'secondary' &&
      'border border-border bg-background text-foreground hover:bg-muted',
    className
  );
}

export function Button(props: ButtonProps) {
  if (isAnchorButton(props)) {
    const { className, variant = 'primary', children, ...anchorProps } = props;

    return (
      <a
        className={getButtonClassName({ className, variant })}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { className, variant = 'primary', children, ...buttonProps } = props;

  return (
    <button
      className={getButtonClassName({ className, variant })}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

function isAnchorButton(props: ButtonProps): props is ButtonAnchorProps {
  return typeof props.href === 'string';
}
