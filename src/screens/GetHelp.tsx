import { Button } from '../ds';
import type { ScreenProps } from './types';

export function GetHelp(_: ScreenProps) {
  return (
    <div className="app-shell">
      <main className="claim-back">
        <div className="claim-back__text">
          <h1 className="claim-back__title">
            You could be missing out on tax reliefs
          </h1>
          <p className="claim-back__body">
            Based on your situation, you may be eligible for reliefs such as
            Marriage Allowance, pension tax relief, or child benefit — even if
            you can't deduct business expenses. File your tax return with Taxfix
            and we'll make sure you claim everything you're entitled to.
          </p>
        </div>
        <div className="claim-back__ctas">
          <Button
            as="a"
            href="https://taxfix.com/en-uk/"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="large"
          >
            Get help with my tax return
          </Button>
        </div>
      </main>
    </div>
  );
}
