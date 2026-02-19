export type Step = {
  stepNumber: number;
  active: boolean;
};

export type StepAction<T extends object> = {
  type: 'GOTO_STEP' | 'UPDATE_STEP' | 'SAVE_STEPS';
  payload: T;
};
