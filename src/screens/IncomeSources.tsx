import { Button } from '../ds';
import { OptionCard } from '../components/OptionCard';
import type { IncomeSource } from '../flow';
import type { ScreenProps } from './types';

const OPTIONS: { id: IncomeSource; emoji: string; label: string }[] = [
  { id: 'employment', emoji: '💼', label: 'Employment' },
  { id: 'self-employment', emoji: '🧑‍💻', label: 'Self-employment' },
  { id: 'rental', emoji: '🏠', label: 'Rental income' },
  { id: 'dividends', emoji: '📊', label: 'Dividends & interest' },
  { id: 'sold-assets', emoji: '💵', label: 'Sold assets or shares' },
  { id: 'foreign', emoji: '🌎', label: 'Foreign income' },
];

export function IncomeSources({ state, update, goNext }: ScreenProps) {
  const toggle = (id: string) => {
    const incomeId = id as IncomeSource;
    const incomes = state.incomes.includes(incomeId)
      ? state.incomes.filter((i) => i !== incomeId)
      : [...state.incomes, incomeId];
    update({ incomes });
  };

  return (
    <div className="app-shell">
      <main className="step">
        <div className="step__inner">
          <header className="step__heading">
            <h1 className="ds-h1">Where do you get your income from?</h1>
            <p className="ds-subtitle">Choose all that apply</p>
          </header>
          <div className="options">
            {OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                id={opt.id}
                emoji={opt.emoji}
                title={opt.label}
                checked={state.incomes.includes(opt.id)}
                onToggle={toggle}
              />
            ))}
          </div>
          <Button
            onClick={goNext}
            disabled={state.incomes.length === 0}
            className="ds-button--inline"
          >
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
}
