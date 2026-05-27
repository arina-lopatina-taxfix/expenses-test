import { Button, Card, Chip } from '../ds';
import type { AnalysisResponse } from '../shared/analysis';
import type { ScreenProps } from './types';

export function Results({ state, goNext }: ScreenProps) {
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

  // Map improvements by categoryId for direct lookup
  const improvementById = new Map(data.improvements.map((imp) => [imp.categoryId, imp]));

  const selectedCategories = [
    ...state.selfEmployedExpenses,
    ...state.landlordExpenses,
  ].map((id) => ({
    id,
    improvement: improvementById.get(id),
  }));

  return (
    <div className="app-shell results">
      <header className="results__hero">
        <h1 className="results__title">
          You could have claim back up to{' '}
          <span className="results__title-amount">
            {data.totalAdditionalSavings}
          </span>
        </h1>
        <p className="results__lede">
          We compared your tax situation with others from people in a similar
          income bracket and the same type of income. Here&apos;s what&apos;s on your
          return — and what you might be missing. All numbers shown are
          illustrative only.
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
                {selectedCategories.map(({ id, improvement }) =>
                  improvement ? (
                    <Card key={id} className="results__item">
                      <div className="results__item-main">
                        <p className="results__item-title">
                          <span aria-hidden="true">{improvement.emoji}</span>{' '}
                          {improvement.title}
                        </p>
                        {improvement.description && (
                          <p className="results__item-desc">{improvement.description}</p>
                        )}
                        <div className="results__alert">
                          <span className="results__alert-title">
                            <span aria-hidden="true">⚡</span> Advice
                          </span>
                          <span className="results__alert-body">{improvement.advice}</span>
                        </div>
                      </div>
                      {improvement.deductibles.length > 0 && (
                        <>
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
                        </>
                      )}
                    </Card>
                  ) : null,
                )}
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
