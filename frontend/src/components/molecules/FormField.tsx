import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Input } from '../atoms/Input';

type FormFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
  helper?: ReactNode;
};

export function FormField({ id, label, helper, ...inputProps }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {helper}
      </div>
      <Input id={id} {...inputProps} />
    </div>
  );
}
