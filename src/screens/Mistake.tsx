import { AppBar } from '../components/AppBar';
import { IdCardIcon } from '../components/IdCardIcon';
import type { ScreenProps } from './types';

export function Mistake({ restart }: ScreenProps) {
  return (
    <div className="app-shell">
      <AppBar showLogin={false} />
      <main className="step">
        <div className="mistake">
          <div className="mistake__icon" aria-hidden="true">
            <IdCardIcon />
          </div>
          <h1 className="mistake__title">
            You can’t claim expenses for this income type
          </h1>
          <p className="mistake__desc">
            Because your income is from [type of income], expenses can’t be
            claimed against it in your tax return. If you need additional
            support, our accredited accountants can help you make the most of
            your return.
          </p>
          <div className="mistake__actions">
            <button className="btn btn--primary btn--lg" type="button">
              Get help with Self Assessment
            </button>
            <button
              className="btn btn--tertiary btn--lg"
              type="button"
              onClick={restart}
            >
              <span className="btn-arrow">←</span> Start again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
