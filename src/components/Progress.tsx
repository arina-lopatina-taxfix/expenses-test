export function Progress({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="progress" role="progressbar" aria-valuenow={pct}>
      <div className="progress__bar" style={{ width: `${pct}%` }} />
    </div>
  );
}
