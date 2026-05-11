import { IdCardIcon } from '../components/IdCardIcon';
import { INCOME_SOURCE_LABELS } from '../shared/categories';
import type { ScreenProps } from './types';

const ASSESSMENT_SIGNUP_URL = 'https://taxfix.com/en-uk/assessment/signup';

export function Mistake({ state }: ScreenProps) {
  const incomeLabels = state.incomes
    .map((id) => INCOME_SOURCE_LABELS[id]?.replace(/^[^A-Za-z]+/, '').trim() ?? id)
    .filter(Boolean);
  const incomeDescriptor =
    incomeLabels.length === 0
      ? 'this type'
      : incomeLabels.length === 1
        ? incomeLabels[0].toLowerCase()
        : `${incomeLabels.slice(0, -1).join(', ').toLowerCase()} and ${incomeLabels.slice(-1)[0].toLowerCase()}`;

  return (
    <div className="app-shell">
      <main className="step">
        <div className="mistake">
          <div className="mistake__icon" aria-hidden="true">
            <IdCardIcon />
          </div>
          <div className="mistake__heading">
            <h1 className="mistake__title">
              Don’t miss out on tax reliefs you could claim
            </h1>
            <div className="mistake__desc">
              <p>
                If your income is from {incomeDescriptor}, expenses can’t be
                deducted from it in your tax return. But that doesn’t mean you
                can’t save money.
              </p>
              <p>
                But you still will be able to claim tax reliefs such as pension
                tax relief or the Marriage Allowance. File your next tax return
                with us and make sure you claim everything you’re entitled to.
              </p>
            </div>
          </div>
          <a
            className="btn btn--primary btn--lg btn--inline"
            href={ASSESSMENT_SIGNUP_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            Get help with my tax return
          </a>
        </div>
      </main>
    </div>
  );
}
