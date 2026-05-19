import { Button } from '../ds';

type FooterProps = {
  onBack?: () => void;
  primaryLabel: string;
  onPrimary?: () => void;
  primaryDisabled?: boolean;
};

const ArrowLeft = () => <span aria-hidden="true">←</span>;

export function Footer({
  onBack,
  primaryLabel,
  onPrimary,
  primaryDisabled,
}: FooterProps) {
  return (
    <div className="footer">
      {onBack ? (
        <Button variant="tertiary" size="large" onClick={onBack} startIcon={<ArrowLeft />}>
          Back
        </Button>
      ) : (
        <span />
      )}
      <Button
        variant="primary"
        size="large"
        onClick={onPrimary}
        disabled={primaryDisabled}
      >
        {primaryLabel}
      </Button>
    </div>
  );
}
