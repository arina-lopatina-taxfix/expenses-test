import { AppBar } from '../components/AppBar';
import type { ScreenProps } from './types';

export function SignUp({ state, update, goNext }: ScreenProps) {
  const isValid = state.firstName.trim() && /\S+@\S+\.\S+/.test(state.email);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) goNext();
  };

  return (
    <div className="app-shell app-shell--soft">
      <AppBar variant="minimal" />
      <main className="signup">
        <header className="signup__heading">
          <h1 className="signup__title">Your tax summary is almost ready</h1>
          <p className="signup__subtitle">
            Enter your details to see where you could claim back tax and avoid
            leaving money on the table.
          </p>
        </header>
        <form className="signup__card" onSubmit={onSubmit}>
          <div className="signup__form">
            <div className="field">
              <span className="field__label">First name *</span>
              <input
                className="field__input"
                placeholder="Jon"
                value={state.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <span className="field__label">Email address *</span>
              <input
                className="field__input"
                type="email"
                placeholder="jondoe@gmail.com"
                value={state.email}
                onChange={(e) => update({ email: e.target.value })}
                required
              />
            </div>
            <button
              className="btn btn--primary btn--lg"
              type="submit"
              disabled={!isValid}
            >
              Get my tax summary
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
