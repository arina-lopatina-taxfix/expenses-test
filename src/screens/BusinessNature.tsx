import { Button, MultilineTextField } from '../ds';
import type { ScreenProps } from './types';

export function BusinessNature({ state, update, goNext }: ScreenProps) {
  return (
    <div className="app-shell">
      <main className="step">
        <div className="step__inner">
          <header className="step__heading">
            <h1 className="ds-h1">Tell us about nature of your business</h1>
            <p className="ds-subtitle" style={{ width: '100%', maxWidth: 500 }}>
              Please provide a brief description of your business activities and
              the services or products you offer
            </p>
          </header>
          <MultilineTextField
            labelText="Description"
            value={state.businessNature}
            onChange={(e) => update({ businessNature: e.target.value })}
            containerStyle={{ width: '100%', maxWidth: 420 }}
          />
          <Button
            onClick={goNext}
            disabled={!state.businessNature.trim()}
            className="ds-button--inline"
          >
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
}
