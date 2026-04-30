type AppBarProps = {
  variant?: 'full' | 'minimal';
  showLogin?: boolean;
};

export function AppBar({ variant = 'full', showLogin = true }: AppBarProps) {
  if (variant === 'minimal') {
    return (
      <header className="appbar">
        <div className="appbar__center">
          <Logo />
        </div>
      </header>
    );
  }
  return (
    <header className="appbar">
      <div className="appbar__brand">
        <Logo />
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

function Logo() {
  return (
    <span className="appbar__logo">
      ta<span>x</span>fix
    </span>
  );
}
