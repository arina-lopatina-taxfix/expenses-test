import type { HTMLAttributes, ReactNode } from 'react';

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'neutral' | 'ghost';
  icon?: ReactNode;
  children: ReactNode;
};

export function Chip({
  variant = 'neutral',
  icon,
  className,
  children,
  ...rest
}: ChipProps) {
  const classes = [
    'ds-chip',
    variant === 'ghost' && 'ds-chip--ghost',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={classes} {...rest}>
      {icon && <span className="ds-chip__icon">{icon}</span>}
      {children}
    </span>
  );
}
