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

export type AlreadyExpensingItem = {
  emoji: string;
  title: string;
  amount: string;
  advice: string;
};

export type ImprovementItem = {
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
  alreadyExpensing: AlreadyExpensingItem[];
  improvements: ImprovementItem[];
};
