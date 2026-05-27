import { Button } from '../ds';
import type { ScreenProps } from './types';

const IMG_CHECKLIST =
  'https://www.figma.com/api/mcp/asset/594e9f6d-6dbe-4d9a-82d4-b9bc6ec2fb45';

export function ClaimBack(_: ScreenProps) {
  return (
    <div className="app-shell">
      <main className="claim-back">
        <img className="claim-back__image" src={IMG_CHECKLIST} alt="" aria-hidden="true" />
        <div className="claim-back__text">
          <h1 className="claim-back__title">Don't leave money on the table</h1>
          <p className="claim-back__body">
            File your next tax return with us to get help from an accredited tax
            accountant and make sure you claim everything you're entitled to. If
            you filed your tax return within the last 12 months, you may still
            be able to amend it and get more money back, you can chat with our
            team to figure out the next steps.
          </p>
        </div>
        <div className="claim-back__ctas">
          <Button
            as="a"
            href="https://taxfix.com/en-uk/assessment/signup"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="large"
          >
            File my tax return
          </Button>
          <Button
            as="a"
            href="https://calendly.com/d/ct6g-r9b-yvk/taxfix-call-me-request"
            target="_blank"
            rel="noopener noreferrer"
            variant="tertiary"
            size="large"
          >
            File an amendment
          </Button>
        </div>
      </main>
    </div>
  );
}
