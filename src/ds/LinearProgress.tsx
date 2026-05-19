type LinearProgressProps = {
  value: number;
};

export function LinearProgress({ value }: LinearProgressProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="ds-progress" role="progressbar" aria-valuenow={pct}>
      <div className="ds-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  );
}
