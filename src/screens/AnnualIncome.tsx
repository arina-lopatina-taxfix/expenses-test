import { Progress } from '../components/Progress';
import { Footer } from '../components/Footer';
import type { ScreenProps } from './types';

export function AnnualIncome({
  state,
  update,
  goNext,
  goBack,
  progress,
}: ScreenProps) {
  return (
    <div className="app-shell">
      <Progress value={progress} />
      <main className="step">
        <div className="step__inner step__inner--tight">
          <header className="step__heading">
            <h1 className="step__title">What is your annual income?</h1>
            <p className="step__subtitle">
              Enter your total income for 6 Apr 2024 - 5 Apr 2025 before tax
            </p>
          </header>
          <div className="field" style={{ width: 360 }}>
            <span className="field__label">Annual income</span>
            <div className="field__input-wrap">
              <input
                className="field__input"
                inputMode="numeric"
                placeholder="120,000"
                value={state.annualIncome}
                onChange={(e) =>
                  update({ annualIncome: e.target.value.replace(/[^0-9,]/g, '') })
                }
              />
              <span className="field__suffix">£</span>
            </div>
          </div>
        </div>
      </main>
      <Footer
        onBack={goBack}
        primaryLabel="Continue"
        onPrimary={goNext}
        primaryDisabled={!state.annualIncome.trim()}
      />
    </div>
  );
}
