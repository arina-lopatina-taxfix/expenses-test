import type { ReactNode } from 'react';

type FooterProps = {
  onBack?: () => void;
  primaryLabel: string;
  onPrimary?: () => void;
  primaryDisabled?: boolean;
  primaryStartIcon?: ReactNode;
};

export function Footer({
  onBack,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  primaryStartIcon,
}: FooterProps) {
  return (
    <div className="footer">
      {onBack ? (
        <button
          className="btn btn--tertiary btn--lg"
          type="button"
          onClick={onBack}
        >
          <span className="btn-arrow">←</span> Back
        </button>
      ) : (
        <span />
      )}
      <button
        className="btn btn--primary btn--lg"
        type="button"
        onClick={onPrimary}
        disabled={primaryDisabled}
      >
        {primaryStartIcon}
        {primaryLabel}
      </button>
    </div>
  );
}
