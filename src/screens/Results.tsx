import { useEffect, useState } from 'react';
import { PrefillIcon } from '../components/PrefillIcon';
import { Button, Card, Chip } from '../ds';
import type { AnalysisInput, AnalysisResponse } from '../shared/analysis';
import type { ScreenProps } from './types';

type FetchState =
  | { status: 'loading' }
  | { status: 'ready'; data: AnalysisResponse }
  | { status: 'error'; message: string; data?: AnalysisResponse };

export function Results({ state, goBack }: ScreenProps) {
  const [fetchState, setFetchState] = useState<FetchState>({ status: 'loading' });

  useEffect(() => {
    const ctrl = new AbortController();
    const input: AnalysisInput = {
      incomes: state.incomes,
      annualIncome: state.annualIncome,
      businessNature: state.businessNature,
      selfEmployedExpenses: state.selfEmployedExpenses,
      landlordExpenses: state.landlordExpenses,
      personalDetails: state.personalDetails,
      firstName: state.firstName,
      email: state.email,
    };
    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
      signal: ctrl.signal,
    })
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok) {
          setFetchState({
            status: 'error',
            message: body.error || `Request failed (${r.status})`,
            data: body.fallback,
          });
          return;
        }
        setFetchState({ status: 'ready', data: body as AnalysisResponse });
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return;
        setFetchState({ status: 'error', message: String(err) });
      });
    return () => ctrl.abort();
  }, [
    state.incomes,
    state.annualIncome,
    state.businessNature,
    state.selfEmployedExpenses,
    state.landlordExpenses,
    state.personalDetails,
    state.firstName,
    state.email,
  ]);

  if (fetchState.status === 'loading') {
    return (
      <div className="app-shell results">
        <main className="prefill">
          <div className="prefill__icon">
            <PrefillIcon />
          </div>
          <div className="prefill__lines">
            <p className="prefill__muted">Reading your return…</p>
            <p className="prefill__active">Identifying missed expenses…</p>
            <p className="prefill__muted">Calculating potential refund…</p>
          </div>
        </main>
      </div>
    );
  }

  const data =
    fetchState.status === 'ready'
      ? fetchState.data
      : fetchState.data ?? null;

  if (!data) {
    return (
      <div className="app-shell app-shell--soft results">
        <main className="results__loading">
          <p className="results__loading-text">Couldn’t load your analysis.</p>
          <p className="results__loading-sub">
            {fetchState.status === 'error' ? fetchState.message : ''}
          </p>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell app-shell--soft results">
      <header className="results__hero">
        <p className="results__eyebrow">TAX RETURN 2024/25</p>
        <h1 className="results__title">
          You could have claimed{' '}
          <span className="results__title-amount">
            {data.totalAdditionalSavings}
          </span>{' '}
          more
        </h1>
        <p className="results__lede">
          We compared your answers with others from people in a similar income
          bracket and the same type of income. Here’s what’s on your return —
          and what you might be missing. All numbers shown are illustrative
          only.
        </p>
        {fetchState.status === 'error' && (
          <p className="results__warning">
            Showing a fallback summary — {fetchState.message}
          </p>
        )}
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

          {data.alreadyExpensing.length > 0 && (
            <div className="results__section">
              <div className="results__section-header">
                <h2 className="ds-h4">What you are already expensing</h2>
                <Chip variant="ghost">
                  {data.alreadyExpensing.length} categories
                </Chip>
              </div>
              <div className="results__items">
                {data.alreadyExpensing.map((item, i) => (
                  <Card key={i} className="results__item">
                    <div className="results__item-main">
                      <p className="results__item-title">
                        <span aria-hidden="true">{item.emoji}</span>{' '}
                        {item.title}
                      </p>
                    </div>
                    <div className="results__alert" style={{ flex: 1 }}>
                      <span className="results__alert-title">
                        <span aria-hidden="true">⚡</span> Advice
                      </span>
                      <span className="results__alert-body">{item.advice}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {data.improvements.length > 0 && (
            <div className="results__section">
              <div className="results__section-header">
                <h2 className="ds-h4">What can be improved</h2>
                <Chip variant="ghost">{data.improvements.length} categories</Chip>
              </div>
              <div className="results__items">
                {data.improvements.map((item, i) => (
                  <Card key={i} className="results__item" style={{ gap: 24 }}>
                    <div className="results__item-main">
                      <p className="results__item-title">
                        <span aria-hidden="true">{item.emoji}</span>{' '}
                        {item.title}
                      </p>
                      <p className="results__item-desc">{item.description}</p>
                      <div className="results__alert">
                        <span className="results__alert-title">
                          <span aria-hidden="true">⚡</span> Advice
                        </span>
                        <span className="results__alert-body">{item.advice}</span>
                      </div>
                    </div>
                    <div className="results__divider" />
                    <div className="results__deductible">
                      <span className="results__deductible-title">
                        <span aria-hidden="true">❓</span> What you can deduct?
                      </span>
                      {item.deductibles.map((d, j) => (
                        <div className="results__deductible-row" key={j}>
                          <span>{d.label}</span>
                          <Chip variant="ghost">{d.amount}</Chip>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="footer">
        {goBack ? (
          <Button
            variant="tertiary"
            size="large"
            onClick={goBack}
            startIcon={<span aria-hidden="true">←</span>}
          >
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button
          variant="primary"
          size="large"
          onClick={() => window.print()}
          startIcon={<span aria-hidden="true">⬇</span>}
        >
          Download summary
        </Button>
      </div>
    </div>
  );
}
