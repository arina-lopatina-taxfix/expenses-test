import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'filled';
  interactive?: boolean;
  selected?: boolean;
  children: ReactNode;
};

export function Card({
  variant: _variant = 'filled',
  interactive,
  selected,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [
    'ds-card',
    interactive && 'ds-card--interactive',
    selected && 'ds-card--selected',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
