import { stepperReducer } from "@/reducers/stepper";
import { Step, } from "@/types/components/stepper";
import { ActionDispatch, createContext, PropsWithChildren, useReducer } from "react";

export const StepperContext = createContext<[Partial<Step>[], ActionDispatch<[{ type: string, payload: Partial<Step> }]>]>([[], () => ({ type: '', payload: {} })]);

export const StepperProvider = ({ children, initialState = [] }: PropsWithChildren<{ initialState: Step[] }>) => {
  const [state, dispatch] = useReducer(stepperReducer, initialState);
  return <StepperContext.Provider value={[state, dispatch]}>{children}</StepperContext.Provider>;
};