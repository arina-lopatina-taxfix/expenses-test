import { useState } from 'react';
import type { ScreenProps } from './types';

const QUESTIONS = [
  { id: 'mortgage',  text: 'Did you pay mortgage on your rental property?' },
  { id: 'repairs',   text: 'Did you do any repairs and maintenance works?' },
  { id: 'insurance', text: 'Did you pay for property insurance?' },
  { id: 'services',  text: 'Did you cover any bills for your tenants?' },
  { id: 'travel',    text: 'Did you travel to your property?' },
  { id: 'office',    text: 'Did you spend any money on stationery or any other related costs for managing your property?' },
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

export function LandlordExpenses({ state, update, goNext }: ScreenProps) {
  const [qIdx, setQIdx] = useState(0);
  const current = QUESTIONS[qIdx];

  const handleAnswer = (answer: 'yes' | 'no' | 'not-sure') => {
    const selected = answer !== 'no';
    const updated = selected
      ? [...new Set([...state.landlordExpenses, current.id])]
      : state.landlordExpenses.filter((x) => x !== current.id);
    update({ landlordExpenses: updated });

    if (qIdx < QUESTIONS.length - 1) {
      setQIdx((i) => i + 1);
    } else {
      goNext();
    }
  };

  return (
    <div className="app-shell">
      <main className="step">
        <div className="eq-screen">
          <div className="eq-heading">
            <p className="eq-title">{current.text}</p>
          </div>
          <div className="eq-options">
            {OPTIONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                className="eq-option"
                onClick={() => handleAnswer(value)}
              >
                <span className="eq-option__icon-wrap">
                  <Icon />
                </span>
                <span className="eq-option__label">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
