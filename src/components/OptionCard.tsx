import type { ReactNode } from 'react';
import { Card, Checkbox } from '../ds';

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
    <Card interactive selected={checked} className="option-card">
      <label className="option-card__inner" htmlFor={`opt-${id}`}>
        <Checkbox
          id={`opt-${id}`}
          checked={checked}
          onChange={() => onToggle(id)}
        />
        <div className="option-card__body">
          <p className="option-card__title">
            <span aria-hidden="true">{emoji}</span> {title}
          </p>
          {description && <p className="option-card__desc">{description}</p>}
        </div>
      </label>
    </Card>
  );
}
