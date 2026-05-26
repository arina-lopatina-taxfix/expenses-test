import { useState } from 'react';
import { Button } from '../ds';
import type { ScreenProps } from './types';

const QUESTIONS = [
  { id: 'home',          text: 'Did you work from home?' },
  { id: 'tech',          text: 'Did you buy any tech or equipment?' },
  { id: 'travel',        text: 'Did you travel for business?' },
  { id: 'materials',     text: 'Did you spend any money on materials to make your goods?' },
  { id: 'insurance',     text: 'Did you buy insurance for your business?' },
  { id: 'training',      text: 'Did you do any professional training or courses?' },
  { id: 'staff',         text: 'Did you have any people hired?' },
  { id: 'subscriptions', text: 'Did you buy any subscriptions or memberships?' },
] as const;

const YesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 10.5l4.5 4.5 7.5-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const MaybeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8 7.5C8 6.4 8.9 5.5 10 5.5s2 .9 2 2c0 1.5-2 2-2 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="14.5" r="1" fill="white" />
  </svg>
);

const OPTIONS = [
  { value: 'yes' as const,       label: 'Yes',      Icon: YesIcon },
  { value: 'no' as const,        label: 'No',       Icon: NoIcon },
  { value: 'not-sure' as const,  label: 'Not sure', Icon: MaybeIcon },
];

export function SelfEmployedExpenses({ state, update, goNext, goBack }: ScreenProps) {
  const [qIdx, setQIdx] = useState(0);
  const current = QUESTIONS[qIdx];

  const handleAnswer = (answer: 'yes' | 'no' | 'not-sure') => {
    const selected = answer !== 'no';
    const updated = selected
      ? [...new Set([...state.selfEmployedExpenses, current.id])]
      : state.selfEmployedExpenses.filter((x) => x !== current.id);
    update({ selfEmployedExpenses: updated });

    if (qIdx < QUESTIONS.length - 1) {
      setQIdx((i) => i + 1);
    } else {
      goNext();
    }
  };

  const handleBack = () => {
    if (qIdx > 0) {
      setQIdx((i) => i - 1);
    } else {
      goBack?.();
    }
  };

  return (
    <div className="app-shell">
      <main className="step">
        <div className="eq-screen">
          <div className="eq-heading">
            <p className="eq-counter">{qIdx + 1} / {QUESTIONS.length}</p>
            <h1 className="ds-h1">{current.text}</h1>
            <p className="ds-subtitle">
              We will ask a few questions to understand what we can expense
            </p>
          </div>
          <div className="eq-options">
            {OPTIONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                className="eq-option"
                onClick={() => handleAnswer(value)}
              >
                <span className="eq-option__icon">
                  <Icon />
                </span>
                <span className="eq-option__label">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
      <div className="footer">
        <Button
          variant="tertiary"
          size="large"
          onClick={handleBack}
          startIcon={<span aria-hidden="true">←</span>}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
