import type { FlowState } from '../flow';

export type ScreenProps = {
  state: FlowState;
  update: (patch: Partial<FlowState>) => void;
  goNext: () => void;
  goBack?: () => void;
  restart: () => void;
  progress: number;
};
