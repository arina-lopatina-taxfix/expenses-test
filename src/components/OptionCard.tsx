import type { ReactNode } from 'react';

type OptionCardProps = {
  id: string;
  emoji: string;
  title: ReactNode;
  description?: ReactNode;
  checked: boolean;
  onToggle: (id: string) => void;
};

export function OptionCard({
  id,
  emoji,
  title,
  description,
  checked,
  onToggle,
}: OptionCardProps) {
  return (
    <label
      className={`option ${checked ? 'option--selected' : ''}`}
      htmlFor={`opt-${id}`}
    >
      <input
        id={`opt-${id}`}
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
      />
      <div className="option__body">
        <p className="option__title">
          <span aria-hidden="true">{emoji}</span> {title}
        </p>
        {description && <p className="option__desc">{description}</p>}
      </div>
    </label>
  );
}
