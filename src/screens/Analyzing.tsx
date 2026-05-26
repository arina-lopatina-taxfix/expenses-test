import { useEffect, useRef, useState } from 'react';
import type { AnalysisInput } from '../shared/analysis';
import type { ScreenProps } from './types';

const STATUSES = [
  'Analysing your situation…',
  'Identifying what you can claim…',
  'Getting your personal expense list done…',
];

const STEP_MS = 1800;

export function Analyzing({ state, update, goNext }: ScreenProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const doneRef = useRef(false);
  const readyToAdvance = useRef(false);
  const cyclesCompleted = useRef(0);

  // Cycle statuses independently of the fetch
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => {
        const next = (i + 1) % STATUSES.length;
        if (next === 0) cyclesCompleted.current += 1;
        if (cyclesCompleted.current >= 1 && readyToAdvance.current && !doneRef.current) {
          doneRef.current = true;
          clearInterval(id);
          goNext();
        }
        return next;
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, [goNext]);

  // Kick off the API call once
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
          update({
            analysisCache: {
              status: 'error',
              message: body.error || `Request failed (${r.status})`,
              data: body.fallback,
            },
          });
        } else {
          update({ analysisCache: { status: 'ready', data: body } });
        }
        readyToAdvance.current = true;
        // If a full cycle already completed, advance immediately
        if (cyclesCompleted.current >= 1 && !doneRef.current) {
          doneRef.current = true;
          goNext();
        }
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return;
        update({ analysisCache: { status: 'error', message: String(err) } });
        readyToAdvance.current = true;
        if (cyclesCompleted.current >= 1 && !doneRef.current) {
          doneRef.current = true;
          goNext();
        }
      });

    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-shell analyzing">
      <main className="prefill">
        <img
          className="prefill__illustration"
          src="/fonts/abc-rom/XL.png"
          alt=""
          aria-hidden="true"
        />
        <div className="prefill__lines">
          {STATUSES.map((s, i) => (
            <p
              key={s}
              className={i === activeIdx ? 'prefill__active' : 'prefill__muted'}
            >
              {s}
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}
