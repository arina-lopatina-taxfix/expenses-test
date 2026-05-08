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

export function resolveSelfEmployedCategory(id: string): CategoryDef | undefined {
  return SELF_EMPLOYED_CATEGORIES.find((c) => c.id === id);
}

export function resolveLandlordCategory(id: string): CategoryDef | undefined {
  return LANDLORD_CATEGORIES.find((c) => c.id === id);
}
