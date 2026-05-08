import { AppBar } from '../components/AppBar';
import { Progress } from '../components/Progress';
import { OptionCard } from '../components/OptionCard';
import { SELF_EMPLOYED_CATEGORIES } from '../shared/categories';
import type { ScreenProps } from './types';

const DESCRIPTIONS: Record<string, React.ReactNode> = {
  home: 'You can claim a portion of your household bills if you work from home.',
  office: 'The everyday costs of running your admin.',
  tech: 'Bigger items you need to do your work.',
  travel: 'Costs for journeys you make for business.',
  materials: 'The direct costs of what you sell or make.',
  clothing: 'Specialist clothing needed for your job',
  professional: (
    <>
      Fees you pay to other professionals for your business.
      <br />
      <strong>Accountant fees are also deductible.</strong>
    </>
  ),
  insurance: 'Policies that protect your business.',
  training: 'Courses that help you do your current job better.',
  staff: 'Costs related to hiring people.',
  subscriptions: 'Membership fees for professional organisations.',
};

const TITLE_OVERRIDES: Record<string, string> = {
  staff: 'Staff (if you have any)',
};

export function SelfEmployedExpenses({
  state,
  update,
  goNext,
  progress,
}: ScreenProps) {
  const toggle = (id: string) => {
    const set = state.selfEmployedExpenses;
    update({
      selfEmployedExpenses: set.includes(id)
        ? set.filter((x) => x !== id)
        : [...set, id],
    });
  };

  return (
    <div className="app-shell">
      <AppBar />
      <Progress value={progress} />
      <main className="scroll-step">
        <div className="step__inner">
          <header className="step__heading">
            <h1 className="step__title">
              Did you spend any money on these categories?
            </h1>
            <p className="step__subtitle">
              We will most likely be able to deduct them from your tax return
            </p>
          </header>
          <div className="options">
            {SELF_EMPLOYED_CATEGORIES.map((cat) => (
              <OptionCard
                key={cat.id}
                id={cat.id}
                emoji={cat.emoji}
                title={TITLE_OVERRIDES[cat.id] ?? cat.title}
                description={DESCRIPTIONS[cat.id]}
                checked={state.selfEmployedExpenses.includes(cat.id)}
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
