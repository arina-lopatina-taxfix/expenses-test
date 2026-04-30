import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';
import type { ScreenProps } from './types';

const ALREADY_EXPENSING = [
  { emoji: '📱', title: 'Office & Phone', amount: '£450' },
  { emoji: '🚗', title: 'Travel', amount: '£820' },
  { emoji: '💻', title: 'Tech & Equipment', amount: '£1,200' },
];

const IMPROVEMENTS = [
  {
    emoji: '📱',
    title: 'Office & Phone',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    advice:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    deductibles: [
      { label: 'Payment fees (Stripe, PayPal)', amount: '~£45' },
      { label: 'Payment fees (Stripe, PayPal)', amount: '~£45' },
      { label: 'Payment fees (Stripe, PayPal)', amount: '~£45' },
      { label: 'Payment fees (Stripe, PayPal)', amount: '~£45' },
    ],
  },
  {
    emoji: '🚗',
    title: 'Travel',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    advice:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    deductibles: [
      { label: 'Mileage', amount: '~£120' },
      { label: 'Parking & tolls', amount: '~£35' },
      { label: 'Public transport', amount: '~£60' },
      { label: 'Accommodation', amount: '~£200' },
    ],
  },
  {
    emoji: '🛡️',
    title: 'Insurance',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    advice:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    deductibles: [
      { label: 'Public liability', amount: '~£90' },
      { label: 'Professional indemnity', amount: '~£140' },
      { label: 'Equipment insurance', amount: '~£60' },
      { label: 'Income protection', amount: '~£180' },
    ],
  },
];

export function Results({ state, goBack }: ScreenProps) {
  const firstName = state.firstName || 'John';
  const profileChips = buildProfileChips(state);

  return (
    <div className="app-shell app-shell--soft results">
      <AppBar variant="minimal" />
      <header className="results__hero">
        <p className="results__eyebrow">TAX RETURN 2025/26</p>
        <h1 className="results__title">
          You could have claimed{' '}
          <span className="results__title-amount">£6,034</span> more
        </h1>
        <p className="results__lede">
          We compared your 2025/26 tax return with others from people in a
          similar income bracket and the same type of income. Here’s what’s on
          your return — and what you might be missing. All numbers shown are
          illustrative only.
        </p>
      </header>

      <section className="results__body">
        <div className="results__inner">
          <div className="results__profile">
            <div className="results__profile-meta">
              <p className="results__profile-name">{firstName} Doe</p>
              <p className="results__profile-role">
                {state.incomes.includes('self-employment')
                  ? 'SELF-EMPLOYED'
                  : 'LANDLORD'}
              </p>
            </div>
            <div className="results__chips">
              {profileChips.map((c, i) => (
                <span className="chip" key={i}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="results__section">
            <div className="results__section-header">
              <h2 className="results__section-title">
                What you are already expensing
              </h2>
              <span className="chip chip--ghost">
                {ALREADY_EXPENSING.length} categories
              </span>
            </div>
            <div className="results__items">
              {ALREADY_EXPENSING.map((item, i) => (
                <article className="results__item" key={i}>
                  <div className="results__item-main">
                    <p className="results__item-title">
                      <span aria-hidden="true">{item.emoji}</span> {item.title}
                    </p>
                    <span className="chip chip--ghost" style={{ alignSelf: 'flex-start' }}>
                      {item.amount}
                    </span>
                  </div>
                  <div className="results__alert" style={{ flex: 1 }}>
                    <span className="results__alert-title">
                      <span aria-hidden="true">⚡</span> Advice
                    </span>
                    <span className="results__alert-body">Lorem ipsum</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="results__section">
            <div className="results__section-header">
              <h2 className="results__section-title">What can be improved</h2>
              <span className="chip chip--ghost">
                {IMPROVEMENTS.length} categories
              </span>
            </div>
            <div className="results__items">
              {IMPROVEMENTS.map((item, i) => (
                <article className="results__item" key={i} style={{ gap: 24 }}>
                  <div className="results__item-main">
                    <p className="results__item-title">
                      <span aria-hidden="true">{item.emoji}</span> {item.title}
                    </p>
                    <p className="results__item-desc">{item.desc}</p>
                    <div className="results__alert">
                      <span className="results__alert-title">
                        <span aria-hidden="true">⚡</span> Advice
                      </span>
                      <span className="results__alert-body">{item.advice}</span>
                    </div>
                  </div>
                  <div className="results__divider" />
                  <div className="results__deductible">
                    <span className="results__deductible-title">
                      <span aria-hidden="true">❓</span> What you can deduct?
                    </span>
                    {item.deductibles.map((d, j) => (
                      <div className="results__deductible-row" key={j}>
                        <span>{d.label}</span>
                        <span className="chip chip--ghost">{d.amount}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer
        onBack={goBack}
        primaryLabel="Download summary"
        primaryStartIcon={<span className="btn-arrow">⬇</span>}
        onPrimary={() => window.print()}
      />
    </div>
  );
}

function buildProfileChips(state: ScreenProps['state']): string[] {
  const chips: string[] = [];
  if (state.businessNature.trim()) {
    chips.push(state.businessNature.trim().slice(0, 24));
  } else if (state.incomes.includes('self-employment')) {
    chips.push('Design');
  }
  if (state.annualIncome) {
    chips.push(`£${state.annualIncome}`);
  } else {
    chips.push('£45,000');
  }
  if (state.personalDetails.includes('student-loan')) chips.push('Student loan');
  if (state.personalDetails.includes('dependants')) chips.push('Dependants');
  if (state.personalDetails.includes('married')) chips.push('Married');
  if (state.personalDetails.includes('homeowner')) chips.push('Homeowner');
  if (state.personalDetails.includes('renter')) chips.push('Renter');
  if (chips.length < 3) {
    if (!chips.includes('Student loan')) chips.push('Student loan');
    if (!chips.includes('Dependants')) chips.push('Dependants');
  }
  return chips;
}
