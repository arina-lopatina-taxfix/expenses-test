import type { InputHTMLAttributes } from 'react';

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className'
> & {
  className?: string;
};

export function Checkbox({ className, ...rest }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={['ds-checkbox', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}
