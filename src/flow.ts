import type { AnalysisCache } from './shared/analysis';

export type IncomeSource =
  | 'employment'
  | 'self-employment'
  | 'rental'
  | 'dividends'
  | 'sold-assets'
  | 'foreign';

export type Step =
  | 'income-sources'
  | 'mistake'
  | 'annual-income'
  | 'business-nature'
  | 'self-employed-expenses'
  | 'landlord-expenses'
  | 'personal-details'
  | 'get-help'
  | 'sign-up'
  | 'analyzing'
  | 'results'
  | 'claim-back';

export type FlowState = {
  step: Step;
  history: Step[];
  incomes: IncomeSource[];
  annualIncome: string;
  businessNature: string;
  selfEmployedExpenses: string[];
  landlordExpenses: string[];
  personalDetails: string[];
  firstName: string;
  email: string;
  analysisCache: AnalysisCache;
};

export const initialState: FlowState = {
  step: 'income-sources',
  history: [],
  incomes: [],
  annualIncome: '',
  businessNature: '',
  selfEmployedExpenses: [],
  landlordExpenses: [],
  personalDetails: [],
  firstName: '',
  email: '',
  analysisCache: null,
};

export const QUALIFYING: IncomeSource[] = ['self-employment', 'rental'];

export function hasQualifying(incomes: IncomeSource[]): boolean {
  return incomes.some((i) => QUALIFYING.includes(i));
}

export function isSelfEmployed(incomes: IncomeSource[]): boolean {
  return incomes.includes('self-employment');
}

export function isLandlord(incomes: IncomeSource[]): boolean {
  return incomes.includes('rental');
}

export function progressFor(step: Step, state: FlowState): number {
  const path = computePath(state);
  const idx = path.indexOf(step);
  if (idx === -1) return 100;
  return Math.round(((idx + 1) / path.length) * 100);
}

function computePath(state: FlowState): Step[] {
  const path: Step[] = ['income-sources'];
  if (!hasQualifying(state.incomes) && state.step !== 'income-sources') {
    return ['income-sources', 'personal-details', 'get-help'];
  }
  path.push('annual-income');
  if (isSelfEmployed(state.incomes)) {
    path.push('business-nature', 'self-employed-expenses');
  }
  if (isLandlord(state.incomes)) {
    path.push('landlord-expenses');
  }
  path.push('personal-details', 'analyzing', 'sign-up', 'results', 'claim-back');
  return path;
}

export function nextStep(state: FlowState): Step {
  switch (state.step) {
    case 'income-sources':
      return hasQualifying(state.incomes) ? 'annual-income' : 'personal-details';
    case 'annual-income':
      if (isSelfEmployed(state.incomes)) return 'business-nature';
      if (isLandlord(state.incomes)) return 'landlord-expenses';
      return 'personal-details';
    case 'business-nature':
      return 'self-employed-expenses';
    case 'self-employed-expenses':
      if (isLandlord(state.incomes)) return 'landlord-expenses';
      return 'personal-details';
    case 'landlord-expenses':
      return 'personal-details';
    case 'personal-details':
      return hasQualifying(state.incomes) ? 'analyzing' : 'get-help';
    case 'analyzing':
      return 'sign-up';
    case 'sign-up':
      return 'results';
    case 'results':
      return 'claim-back';
    default:
      return state.step;
  }
}
