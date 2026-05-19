import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Size = 'small' | 'medium' | 'large';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    as?: 'button';
  };

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    as: 'a';
    href: string;
  };

const sizeClass: Record<Size, string> = {
  small: 'ds-button--sm',
  medium: 'ds-button--md',
  large: 'ds-button--lg',
};

const variantClass: Record<Variant, string> = {
  primary: 'ds-button--primary',
  secondary: 'ds-button--secondary',
  tertiary: 'ds-button--tertiary',
};

function joinClasses(parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = 'primary',
    size = 'large',
    startIcon,
    endIcon,
    fullWidth,
    children,
    className,
    ...rest
  } = props;
  const classes = joinClasses([
    'ds-button',
    variantClass[variant],
    sizeClass[size],
    fullWidth && 'ds-button--full',
    className,
  ]);

  const content = (
    <>
      {startIcon && <span className="ds-button__icon">{startIcon}</span>}
      {children}
      {endIcon && <span className="ds-button__icon">{endIcon}</span>}
    </>
  );

  if ('as' in props && props.as === 'a') {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonRest.type ?? 'button'}
      className={classes}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
