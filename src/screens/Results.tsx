import { Button, Card, Chip } from '../ds';
import type { AnalysisResponse, ImprovementItem } from '../shared/analysis';
import type { ScreenProps } from './types';

type CategoryMeta = { label: string; emoji: string; keywords: string[] };

const SE_CATEGORIES: Record<string, CategoryMeta> = {
  home:          { label: 'Home Office',            emoji: '🏠', keywords: ['home'] },
  tech:          { label: 'Tech & Equipment',        emoji: '💻', keywords: ['tech', 'equipment', 'computer', 'device'] },
  travel:        { label: 'Business Travel',         emoji: '🚗', keywords: ['travel', 'mileage', 'transport'] },
  materials:     { label: 'Materials & Supplies',    emoji: '📦', keywords: ['material', 'goods', 'stock', 'suppl'] },
  insurance:     { label: 'Business Insurance',      emoji: '🛡️', keywords: ['insurance'] },
  training:      { label: 'Training & Education',    emoji: '📚', keywords: ['training', 'course', 'education', 'development'] },
  staff:         { label: 'Staff & Contractors',     emoji: '👥', keywords: ['staff', 'employee', 'contractor', 'subcontract'] },
  subscriptions: { label: 'Subscriptions & Software', emoji: '📱', keywords: ['subscript', 'membership', 'software', 'app'] },
};

const LL_CATEGORIES: Record<string, CategoryMeta> = {
  mortgage:  { label: 'Mortgage Interest',      emoji: '🏦', keywords: ['mortgage'] },
  repairs:   { label: 'Repairs & Maintenance',  emoji: '🔧', keywords: ['repair', 'maintenance'] },
  insurance: { label: 'Property Insurance',     emoji: '🛡️', keywords: ['insurance'] },
  services:  { label: 'Tenant Bills & Services', emoji: '💡', keywords: ['bill', 'service', 'utilit', 'tenant'] },
  travel:    { label: 'Property Travel',        emoji: '🚗', keywords: ['travel', 'mileage', 'transport'] },
  office:    { label: 'Admin & Stationery',     emoji: '📝', keywords: ['admin', 'stationery', 'office'] },
};

function findImprovement(
  meta: CategoryMeta,
  improvements: ImprovementItem[],
  used: Set<number>,
): ImprovementItem | undefined {
  const idx = improvements.findIndex(
    (imp, i) =>
      !used.has(i) &&
      meta.keywords.some((k) => imp.title.toLowerCase().includes(k)),
  );
  if (idx === -1) return undefined;
  used.add(idx);
  return improvements[idx];
}

export function Results({ state, goBack, goNext }: ScreenProps) {
  const cache = state.analysisCache;

  const data: AnalysisResponse | null =
    cache?.status === 'ready'
      ? cache.data
      : cache?.status === 'error'
        ? (cache.data ?? null)
        : null;

  if (!data) {
    return (
      <div className="app-shell results">
        <main className="results__loading">
          <p className="results__loading-text">Couldn't load your analysis.</p>
          <p className="results__loading-sub">
            {cache?.status === 'error' ? cache.message : ''}
          </p>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </main>
      </div>
    );
  }

  // Build the list of categories the user selected Yes/Not sure on
  const usedImprovements = new Set<number>();
  const selectedCategories = [
    ...state.selfEmployedExpenses.map((id) => ({
      id,
      meta: SE_CATEGORIES[id] ?? { label: id, emoji: '📋', keywords: [] },
    })),
    ...state.landlordExpenses.map((id) => ({
      id,
      meta: LL_CATEGORIES[id] ?? { label: id, emoji: '📋', keywords: [] },
    })),
  ].map(({ id, meta }) => ({
    id,
    meta,
    improvement: findImprovement(meta, data.improvements, usedImprovements),
  }));

  return (
    <div className="app-shell results">
      <header className="results__hero">
        <h1 className="results__title">
          You could have claim back around{' '}
          <span className="results__title-amount">
            {data.totalAdditionalSavings}
          </span>
        </h1>
        <p className="results__lede">
          We compared your tax situation with others from people in a similar
          income bracket and the same type of income. Here&apos;s what&apos;s on your
          return — and what you might be missing. All numbers shown are
          illustrative only. You can also upload your tax return to get a more
          precise answer.
        </p>
        {cache?.status === 'error' && (
          <p className="results__warning">
            Showing a fallback summary — {cache.message}
          </p>
        )}
        <div className="results__hero-ctas">
          <Button variant="primary" size="large" onClick={goNext}>
            Help me claim it back
          </Button>
        </div>
      </header>

      <section className="results__body">
        <div className="results__inner">
          <Card className="results__profile">
            <div className="results__profile-meta">
              <p className="results__profile-name">{data.profile.name}</p>
              <p className="results__profile-role">{data.profile.role}</p>
            </div>
            <div className="results__chips">
              {data.profile.chips.map((c, i) => (
                <Chip key={i}>{c}</Chip>
              ))}
            </div>
          </Card>

          {selectedCategories.length > 0 && (
            <div className="results__section">
              <div className="results__section-header">
                <h2 className="ds-h4">What you can expense</h2>
                <Chip variant="ghost">
                  {selectedCategories.length}{' '}
                  {selectedCategories.length === 1 ? 'category' : 'categories'}
                </Chip>
              </div>
              <div className="results__items">
                {selectedCategories.map(({ id, meta, improvement }) =>
                  improvement ? (
                    <Card key={id} className="results__item">
                      <div className="results__item-main">
                        <p className="results__item-title">
                          <span aria-hidden="true">{meta.emoji}</span>{' '}
                          {meta.label}
                        </p>
                        <p className="results__item-desc">{improvement.description}</p>
                        <div className="results__alert">
                          <span className="results__alert-title">
                            <span aria-hidden="true">⚡</span> Advice
                          </span>
                          <span className="results__alert-body">{improvement.advice}</span>
                        </div>
                      </div>
                      <div className="results__divider" />
                      <div className="results__deductible">
                        <span className="results__deductible-title">
                          <span aria-hidden="true">❓</span> What you can deduct?
                        </span>
                        {improvement.deductibles.map((d, j) => (
                          <div className="results__deductible-row" key={j}>
                            <span>{d.label}</span>
                            <Chip variant="ghost">{d.amount}</Chip>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ) : (
                    <Card key={id} className="results__item results__item--simple">
                      <div className="results__item-main">
                        <p className="results__item-title">
                          <span aria-hidden="true">{meta.emoji}</span>{' '}
                          {meta.label}
                        </p>
                      </div>
                    </Card>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {goBack && (
        <div className="footer">
          <Button
            variant="tertiary"
            size="large"
            onClick={goBack}
            startIcon={<span aria-hidden="true">←</span>}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
