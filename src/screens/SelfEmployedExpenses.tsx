import { AppBar } from '../components/AppBar';
import { Progress } from '../components/Progress';
import { Footer } from '../components/Footer';
import { OptionCard } from '../components/OptionCard';
import type { ScreenProps } from './types';

const CATEGORIES: {
  id: string;
  emoji: string;
  title: string;
  description: React.ReactNode;
}[] = [
  {
    id: 'home',
    emoji: '🏠',
    title: 'Working from home',
    description:
      'You can claim a portion of your household bills if you work from home.',
  },
  {
    id: 'office',
    emoji: '📱',
    title: 'Office & Phone',
    description: 'The everyday costs of running your admin.',
  },
  {
    id: 'tech',
    emoji: '💻',
    title: 'Tech & Equipment',
    description: 'Bigger items you need to do your work.',
  },
  {
    id: 'travel',
    emoji: '🚗',
    title: 'Travel',
    description: 'Costs for journeys you make for business.',
  },
  {
    id: 'materials',
    emoji: '🛠️',
    title: 'Materials & Stock',
    description: 'The direct costs of what you sell or make.',
  },
  {
    id: 'clothing',
    emoji: '👔',
    title: 'Clothing',
    description: 'Specialist clothing needed for your job',
  },
  {
    id: 'professional',
    emoji: '🧾',
    title: 'Professional Services',
    description: (
      <>
        Fees you pay to other professionals for your business.
        <br />
        <strong>Accountant fees are also deductible.</strong>
      </>
    ),
  },
  {
    id: 'insurance',
    emoji: '🛡️',
    title: 'Insurance',
    description: 'Policies that protect your business.',
  },
  {
    id: 'training',
    emoji: '📚',
    title: 'Training',
    description: 'Courses that help you do your current job better.',
  },
  {
    id: 'staff',
    emoji: '👥',
    title: 'Staff (if you have any)',
    description: 'Costs related to hiring people.',
  },
  {
    id: 'subscriptions',
    emoji: '🎟️',
    title: 'Subscriptions',
    description: 'Membership fees for professional organisations.',
  },
];

export function SelfEmployedExpenses({
  state,
  update,
  goNext,
  goBack,
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
            {CATEGORIES.map((cat) => (
              <OptionCard
                key={cat.id}
                id={cat.id}
                emoji={cat.emoji}
                title={cat.title}
                description={cat.description}
                checked={state.selfEmployedExpenses.includes(cat.id)}
                onToggle={toggle}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer
        onBack={goBack}
        primaryLabel="Continue"
        onPrimary={goNext}
      />
    </div>
  );
}
