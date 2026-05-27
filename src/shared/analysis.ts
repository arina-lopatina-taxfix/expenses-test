export type IncomeSource =
  | 'employment'
  | 'self-employment'
  | 'rental'
  | 'dividends'
  | 'sold-assets'
  | 'foreign';

export type AnalysisInput = {
  incomes: IncomeSource[];
  annualIncome: string;
  businessNature: string;
  selfEmployedExpenses: string[];
  landlordExpenses: string[];
  personalDetails: string[];
  firstName: string;
  email: string;
};

export type DeductibleLine = {
  label: string;
  amount: string;
};

export type ImprovementItem = {
  categoryId: string;
  emoji: string;
  title: string;
  description: string;
  advice: string;
  deductibles: DeductibleLine[];
};

export type AnalysisResponse = {
  totalAdditionalSavings: string;
  profile: {
    name: string;
    role: string;
    chips: string[];
  };
  improvements: ImprovementItem[];
};

export type AnalysisCache =
  | { status: 'ready'; data: AnalysisResponse }
  | { status: 'error'; message: string; data?: AnalysisResponse }
  | null;
