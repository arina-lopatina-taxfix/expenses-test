import { Progress } from '../components/Progress';
import { OptionCard } from '../components/OptionCard';
import type { ScreenProps } from './types';

const OPTIONS = [
  { id: 'married', emoji: '💍', label: 'Married' },
  { id: 'dependants', emoji: '👶🏻', label: 'Dependants' },
  { id: 'student-loan', emoji: '🎓', label: 'Student loan' },
  { id: 'homeowner', emoji: '🔑', label: 'Homeowner' },
  { id: 'renter', emoji: '🏠', label: 'Renter' },
];

export function PersonalDetails({
  state,
  update,
  goNext,
  progress,
}: ScreenProps) {
  const toggle = (id: string) => {
    const set = state.personalDetails;
    update({
      personalDetails: set.includes(id)
        ? set.filter((x) => x !== id)
        : [...set, id],
    });
  };

  return (
    <div className="app-shell">
      <Progress value={progress} />
      <main className="step">
        <div className="step__inner">
          <header className="step__heading">
            <h1 className="step__title">
              Enter your total income for the year before tax
            </h1>
            <p className="step__subtitle">
              Select all that apply so we can check for any credits and
              deductions available to you
            </p>
          </header>
          <div className="options">
            {OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                id={opt.id}
                emoji={opt.emoji}
                title={opt.label}
                checked={state.personalDetails.includes(opt.id)}
                onToggle={toggle}
              />
            ))}
          </div>
          <button
            className="btn btn--primary btn--lg btn--inline"
            type="button"
            onClick={goNext}
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}
