import { TaxfixLogo } from './Logo';

type AppBarProps = {
  variant?: 'full' | 'minimal';
  showLogin?: boolean;
};

export function AppBar({ variant = 'full', showLogin = true }: AppBarProps) {
  if (variant === 'minimal') {
    return (
      <header className="appbar">
        <div className="appbar__center">
          <TaxfixLogo />
        </div>
      </header>
    );
  }
  return (
    <header className="appbar">
      <div className="appbar__brand">
        <TaxfixLogo />
        <span className="appbar__chip">TaxScouts is now Taxfix</span>
      </div>
      {showLogin && (
        <button className="btn btn--secondary btn--md" type="button">
          Log in
        </button>
      )}
    </header>
  );
}
