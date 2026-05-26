import { Button, TextField } from '../ds';
import type { ScreenProps } from './types';

export function AnnualIncome({ state, update, goNext }: ScreenProps) {
  return (
    <div className="app-shell">
      <main className="step">
        <div className="step__inner step__inner--tight">
          <header className="step__heading">
            <h1 className="ds-h1">What is your annual income?</h1>
            <p className="ds-subtitle">
              Enter your total income for 6 Apr 2024 - 5 Apr 2025 before tax
            </p>
          </header>
          <TextField
            labelText="Annual income"
            unit="£"
            inputMode="numeric"
            placeholder="120,000"
            value={state.annualIncome}
            onChange={(e) =>
              update({
                annualIncome: e.target.value.replace(/[^0-9,]/g, ''),
              })
            }
            containerStyle={{ width: 360 }}
          />
          <p className="ds-subtitle" style={{ marginTop: -8 }}>Can be an estimate.</p>
          <Button
            onClick={goNext}
            disabled={!state.annualIncome.trim()}
            className="ds-button--inline"
          >
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
}
