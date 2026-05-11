import { Progress } from '../components/Progress';
import { Footer } from '../components/Footer';
import type { ScreenProps } from './types';

export function BusinessNature({
  state,
  update,
  goNext,
  goBack,
  progress,
}: ScreenProps) {
  return (
    <div className="app-shell">
      <Progress value={progress} />
      <main className="step">
        <div className="step__inner">
          <header className="step__heading">
            <h1 className="step__title">
              Tell us about nature of your business
            </h1>
            <p className="step__subtitle" style={{ width: 500 }}>
              Please provide a brief description of your business activities and
              the services or products you offer
            </p>
          </header>
          <div className="field" style={{ width: 420 }}>
            <textarea
              className="field__textarea"
              placeholder="Label"
              value={state.businessNature}
              onChange={(e) => update({ businessNature: e.target.value })}
            />
          </div>
        </div>
      </main>
      <Footer
        onBack={goBack}
        primaryLabel="Continue"
        onPrimary={goNext}
        primaryDisabled={!state.businessNature.trim()}
      />
    </div>
  );
}
