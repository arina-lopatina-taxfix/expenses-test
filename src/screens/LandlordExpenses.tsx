import { AppBar } from '../components/AppBar';
import { Progress } from '../components/Progress';
import { OptionCard } from '../components/OptionCard';
import type { ScreenProps } from './types';

const CATEGORIES = [
  {
    id: 'mortgage',
    emoji: '🏠',
    title: 'Mortgage Interest',
    description: 'The interest you pay on buy-to-let mortgages',
  },
  {
    id: 'repairs',
    emoji: '🛠',
    title: 'Repairs & Maintenance',
    description:
      'Costs of fixing and maintaining the property (but not improvements)',
  },
  {
    id: 'insurance',
    emoji: '🧾',
    title: 'Insurance',
    description: 'Landlord, building, and contents insurance policies',
  },
  {
    id: 'services',
    emoji: '🧹',
    title: 'Services & Utilities',
    description:
      'Bills you cover for tenants, such as water, gas, electricity, and council tax',
  },
  {
    id: 'professional',
    emoji: '💼',
    title: 'Professional Fees',
    description: 'Payments to letting agents, accountants, or solicitors',
  },
  {
    id: 'travel',
    emoji: '🚗',
    title: 'Travel',
    description:
      'Mileage or transport costs when travelling for property management',
  },
  {
    id: 'office',
    emoji: '🗃',
    title: 'Office & Admin',
    description:
      'Stationery, phone, and office-related costs for managing your properties.',
  },
  {
    id: 'replacement',
    emoji: '🛋',
    title: 'Replacement of domestic items',
    description:
      'Furniture, appliances, or household items replaced for tenants.',
  },
];

export function LandlordExpenses({
  state,
  update,
  goNext,
  progress,
}: ScreenProps) {
  const toggle = (id: string) => {
    const set = state.landlordExpenses;
    update({
      landlordExpenses: set.includes(id)
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
              Did you spent any money on these categories?
            </h1>
            <p className="step__subtitle">
              We will most likely be able to deduct them from your tax return
            </p>
          </header>
          <div className="options">
            {CATEGORIES.map((cat) => (
              <OptionCard
                key={cat.id}
                id={cat.id}
                emoji={cat.emoji}
                title={cat.title}
                description={cat.description}
                checked={state.landlordExpenses.includes(cat.id)}
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
