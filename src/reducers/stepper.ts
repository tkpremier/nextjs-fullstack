/**
 * The stepper state is an array of items with a data payload and a step number.  The payload is the data for the step.  The step number is the index of the step in the array.  The payload can be any object.
 * @param state - Array<{ stepNumber: number, payload: any, active: boolean }> - The state of the stepper
 * @param action - { type: 'GOTO_STEP' | 'UPDATE_STEP' | 'SAVE_STEPS', payload: { stepNumber: number, payload: any } } - The action to perform on the stepper
 * @returns Array<{ stepNumber: number, payload: any, active: boolean }> - The new state of the stepper
 */

import { Step } from '@/types/components/stepper';

export const stepperReducer = (state: Step[], action: { type: string; payload: Partial<Step> }) => {
  switch (action.type) {
    case 'GOTO_STEP':
      return state.map(step =>
        step.stepNumber === action.payload.stepNumber ? { ...step, active: true } : { ...step, active: false }
      );
    case 'UPDATE_STEP':
      return state.map(step => (step.stepNumber === action.payload.stepNumber ? action.payload : step));
    case 'SAVE_STEPS':
      return state.filter(step => step.stepNumber !== action.payload.stepNumber);
    default:
      return state;
  }
};
