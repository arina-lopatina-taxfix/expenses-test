import { useEffect, useState } from 'react';
import type { ScreenProps } from './types';

const QUESTIONS = [
  {
    id: 'home',
    text: 'Did you work from home?',
    subtext: 'You may be able to claim a portion of your household bills such as heating, electricity, and broadband as a business expense.',
    successMessage: 'Great, that means you can expense a portion of your household bills.',
  },
  {
    id: 'tech',
    text: 'Did you buy any tech or equipment?',
    subtext: 'Laptops, phones, cameras, or tools purchased for work may qualify for tax relief under capital allowances or as allowable expenses.',
    successMessage: 'Great, that means you can expense the tech and equipment you bought for work.',
  },
  {
    id: 'travel',
    text: 'Did you travel for business?',
    subtext: 'Costs like fuel, train tickets, parking, or flights for work-related trips (excluding your regular commute) may be deductible.',
    successMessage: 'Great, that means you can expense your business travel costs.',
  },
  {
    id: 'materials',
    text: 'Did you spend any money on materials to make your goods?',
    subtext: 'If you buy raw materials, packaging, or supplies to produce what you sell, these costs can usually be claimed as a business expense.',
    successMessage: 'Great, that means you can expense the materials you bought to make your goods.',
  },
  {
    id: 'insurance',
    text: 'Did you buy insurance for your business?',
    subtext: 'Business insurance premiums such as public liability, professional indemnity, or contents insurance are typically allowable expenses.',
    successMessage: 'Great, that means you can expense your business insurance premiums.',
  },
  {
    id: 'training',
    text: 'Did you do any professional training or courses?',
    subtext: 'Training that improves skills you use in your current work may be tax-deductible. This includes online courses, workshops, and industry certifications.',
    successMessage: 'Great, that means you can expense the cost of your training and courses.',
  },
  {
    id: 'staff',
    text: 'Did you have any people hired?',
    subtext: 'Wages, salaries, subcontractor fees, and employer National Insurance contributions paid to staff or freelancers can be claimed as business expenses.',
    successMessage: 'Great, that means you can expense the wages and fees you paid to your staff or freelancers.',
  },
  {
    id: 'subscriptions',
    text: 'Did you buy any subscriptions or memberships?',
    subtext: 'Fees for professional bodies, trade associations, or work-related software subscriptions such as accounting tools or industry publications are usually deductible.',
    successMessage: 'Great, that means you can expense your work-related subscriptions and memberships.',
  },
] as const;

function IconCircleCheck() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
  );
}

function IconCircleXmark() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
    </svg>
  );
}

function IconCircleQuestion() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
    </svg>
  );
}

const OPTIONS = [
  { value: 'yes' as const,      label: 'Yes',      Icon: IconCircleCheck },
  { value: 'no' as const,       label: 'No',       Icon: IconCircleXmark },
  { value: 'not-sure' as const, label: 'Not sure', Icon: IconCircleQuestion },
];

export function SelfEmployedExpenses({ state, update, goNext }: ScreenProps) {
  const [qIdx, setQIdx] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const current = QUESTIONS[qIdx];

  const goToNextQuestion = () => {
    setShowSuccess(false);
    if (qIdx < QUESTIONS.length - 1) {
      setQIdx((i) => i + 1);
    } else {
      goNext();
    }
  };

  const handleAnswer = (answer: 'yes' | 'no' | 'not-sure') => {
    if (showSuccess) return;
    const selected = answer !== 'no';
    const updated = selected
      ? [...new Set([...state.selfEmployedExpenses, current.id])]
      : state.selfEmployedExpenses.filter((x) => x !== current.id);
    update({ selfEmployedExpenses: updated });

    if (answer === 'yes') {
      setShowSuccess(true);
    } else {
      goToNextQuestion();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(goToNextQuestion, 2500);
    return () => clearTimeout(t);
  }, [showSuccess]);

  return (
    <div className="app-shell">
      <main className="step">
        <div key={qIdx} className="eq-screen">
          <div className="eq-heading">
            <p className="eq-title">{current.text}</p>
            <p className="eq-subtitle">{current.subtext}</p>
          </div>
          <div className="eq-options">
            {OPTIONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                className={`eq-option${showSuccess && value === 'yes' ? ' eq-option--selected' : ''}`}
                onClick={() => handleAnswer(value)}
                disabled={showSuccess}
              >
                <span className="eq-option__icon-wrap">
                  <Icon />
                </span>
                <span className="eq-option__label">{label}</span>
              </button>
            ))}
            {showSuccess && (
              <div className="eq-success">
                <span className="eq-success__icon" aria-hidden="true">
                  <IconCircleCheck />
                </span>
                <span className="eq-success__text">{current.successMessage}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
