import { Progress } from '../components/Progress';
import { Footer } from '../components/Footer';
import { MultilineTextField } from '../ds';
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
            <h1 className="ds-h1">Tell us about nature of your business</h1>
            <p className="ds-subtitle" style={{ width: 500 }}>
              Please provide a brief description of your business activities and
              the services or products you offer
            </p>
          </header>
          <MultilineTextField
            labelText="Description"
            value={state.businessNature}
            onChange={(e) => update({ businessNature: e.target.value })}
            containerStyle={{ width: 420 }}
          />
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
