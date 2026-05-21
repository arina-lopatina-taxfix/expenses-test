import type { IncomeSource } from './analysis';

export type CategoryDef = {
  id: string;
  emoji: string;
  title: string;
};

export const INCOME_SOURCE_LABELS: Record<IncomeSource, string> = {
  employment: '💼 Employment',
  'self-employment': '🧑‍💻 Self-employment',
  rental: '🏠 Rental income',
  dividends: '📊 Dividends & interest',
  'sold-assets': '💵 Sold assets or shares',
  foreign: '🌎 Foreign income',
};

export const SELF_EMPLOYED_CATEGORIES: CategoryDef[] = [
  { id: 'home', emoji: '🏠', title: 'Working from home' },
  { id: 'office', emoji: '📱', title: 'Office & Phone' },
  { id: 'tech', emoji: '💻', title: 'Tech & Equipment' },
  { id: 'travel', emoji: '🚗', title: 'Travel' },
  { id: 'materials', emoji: '🛠️', title: 'Materials & Stock' },
  { id: 'clothing', emoji: '👔', title: 'Clothing' },
  { id: 'professional', emoji: '🧾', title: 'Professional Services' },
  { id: 'insurance', emoji: '🛡️', title: 'Insurance' },
  { id: 'training', emoji: '📚', title: 'Training' },
  { id: 'staff', emoji: '👥', title: 'Staff' },
  { id: 'subscriptions', emoji: '🎟️', title: 'Subscriptions' },
];

export const LANDLORD_CATEGORIES: CategoryDef[] = [
  { id: 'mortgage', emoji: '🏠', title: 'Mortgage Interest' },
  { id: 'repairs', emoji: '🛠', title: 'Repairs & Maintenance' },
  { id: 'insurance', emoji: '🧾', title: 'Insurance' },
  { id: 'services', emoji: '🧹', title: 'Services & Utilities' },
  { id: 'professional', emoji: '💼', title: 'Professional Fees' },
  { id: 'travel', emoji: '🚗', title: 'Travel' },
  { id: 'office', emoji: '🗃', title: 'Office & Admin' },
  { id: 'replacement', emoji: '🛋', title: 'Replacement of domestic items' },
];

export const PERSONAL_DETAIL_LABELS: Record<string, string> = {
  married: '💍 Married',
  dependants: '👶🏻 Dependants',
  'student-loan': '🎓 Student loan',
  homeowner: '🔑 Homeowner',
  renter: '🏠 Renter',
};

export const EMPLOYMENT_CATEGORIES: CategoryDef[] = [
  { id: 'wfh-employed', emoji: '🏠', title: 'Working from Home' },
  { id: 'professional-subs', emoji: '🎟️', title: 'Professional Subscriptions' },
  { id: 'uniform', emoji: '👔', title: 'Uniform & Protective Clothing' },
  { id: 'tools-employed', emoji: '🛠️', title: 'Tools & Equipment' },
  { id: 'mileage', emoji: '🚗', title: 'Business Mileage' },
  { id: 'pension-employed', emoji: '💰', title: 'Personal Pension Contributions' },
  { id: 'p800', emoji: '💷', title: 'PAYE Overpayment (P800)' },
];

export const DIVIDENDS_CATEGORIES: CategoryDef[] = [
  { id: 'isa', emoji: '💳', title: 'ISA Allowance' },
  { id: 'capital-losses', emoji: '📉', title: 'Capital Losses Offset' },
  { id: 'pension-dividends', emoji: '💰', title: 'Pension Contributions' },
];

export const SOLD_ASSETS_CATEGORIES: CategoryDef[] = [
  { id: 'cgt-allowance', emoji: '📊', title: 'Capital Gains Annual Allowance' },
  { id: 'eis-seis', emoji: '📈', title: 'EIS / SEIS Relief' },
  { id: 'capital-losses-assets', emoji: '📉', title: 'Capital Losses Offset' },
  { id: 'ppr', emoji: '🏡', title: "Principal Private Residence Relief" },
];

export const FOREIGN_INCOME_CATEGORIES: CategoryDef[] = [
  { id: 'foreign-tax-credit', emoji: '🌎', title: 'Foreign Tax Credit Relief' },
  { id: 'double-taxation', emoji: '📋', title: 'Double Taxation Treaty Relief' },
  { id: 'remittance', emoji: '💱', title: 'Remittance Basis' },
];

export const PERSONAL_DETAIL_CATEGORIES: Record<string, CategoryDef[]> = {
  married: [
    { id: 'marriage-allowance', emoji: '💍', title: 'Marriage Allowance' },
    { id: 'married-couples-allowance', emoji: '💍', title: "Married Couple's Allowance" },
  ],
  dependants: [
    { id: 'child-benefit', emoji: '👶🏻', title: 'Child Benefit' },
    { id: 'tax-free-childcare', emoji: '🧸', title: 'Tax-Free Childcare' },
    { id: 'working-tax-credit', emoji: '👨‍👩‍👧', title: 'Working Tax Credit' },
  ],
  'student-loan': [
    { id: 'student-loan-plan', emoji: '🎓', title: 'Student Loan Plan Review' },
  ],
  homeowner: [
    { id: 'property-allowance', emoji: '🔑', title: 'Property Income Allowance' },
  ],
  renter: [
    { id: 'rent-a-room', emoji: '🏠', title: 'Rent a Room Relief' },
  ],
};

export const INCOME_TYPE_CATEGORIES: Partial<Record<IncomeSource, CategoryDef[]>> = {
  employment: EMPLOYMENT_CATEGORIES,
  dividends: DIVIDENDS_CATEGORIES,
  'sold-assets': SOLD_ASSETS_CATEGORIES,
  foreign: FOREIGN_INCOME_CATEGORIES,
};

export function resolveSelfEmployedCategory(id: string): CategoryDef | undefined {
  return SELF_EMPLOYED_CATEGORIES.find((c) => c.id === id);
}

export function resolveLandlordCategory(id: string): CategoryDef | undefined {
  return LANDLORD_CATEGORIES.find((c) => c.id === id);
}
