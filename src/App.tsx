import { useCallback, useState } from 'react';
import { initialState, nextStep, progressFor } from './flow';
import type { FlowState, Step } from './flow';
import { IncomeSources } from './screens/IncomeSources';
import { Mistake } from './screens/Mistake';
import { AnnualIncome } from './screens/AnnualIncome';
import { BusinessNature } from './screens/BusinessNature';
import { SelfEmployedExpenses } from './screens/SelfEmployedExpenses';
import { LandlordExpenses } from './screens/LandlordExpenses';
import { PersonalDetails } from './screens/PersonalDetails';
import { SignUp } from './screens/SignUp';
import { Results } from './screens/Results';

export default function App() {
  const [state, setState] = useState<FlowState>(initialState);

  const update = useCallback(
    (patch: Partial<FlowState>) => setState((s) => ({ ...s, ...patch })),
    [],
  );

  const goNext = useCallback(() => {
    setState((s) => {
      const next = nextStep(s);
      return { ...s, step: next, history: [...s.history, s.step] };
    });
  }, []);

  const goBack = useCallback(() => {
    setState((s) => {
      const previous = s.history[s.history.length - 1];
      if (!previous) return s;
      return {
        ...s,
        step: previous,
        history: s.history.slice(0, -1),
      };
    });
  }, []);

  const restart = useCallback(() => setState(initialState), []);

  const progress = progressFor(state.step, state);

  const screenProps = {
    state,
    update,
    goNext,
    goBack: state.history.length ? goBack : undefined,
    restart,
    progress,
  };

  switch (state.step as Step) {
    case 'income-sources':
      return <IncomeSources {...screenProps} />;
    case 'mistake':
      return <Mistake {...screenProps} />;
    case 'annual-income':
      return <AnnualIncome {...screenProps} />;
    case 'business-nature':
      return <BusinessNature {...screenProps} />;
    case 'self-employed-expenses':
      return <SelfEmployedExpenses {...screenProps} />;
    case 'landlord-expenses':
      return <LandlordExpenses {...screenProps} />;
    case 'personal-details':
      return <PersonalDetails {...screenProps} />;
    case 'sign-up':
      return <SignUp {...screenProps} />;
    case 'results':
      return <Results {...screenProps} />;
  }
}
