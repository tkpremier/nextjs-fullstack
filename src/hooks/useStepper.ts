import { stepperReducer } from '@/reducers/stepper';
import { Step } from '@/types/components/stepper';
import { useReducer } from 'react';

export const useStepper = <T extends Array<{ stepNumber: number; payload: Step; active: boolean }>>(
  initialState: T = [] as T
) => {
  const [state, dispatch] = useReducer(stepperReducer, initialState);
  return { state, dispatch };
};
