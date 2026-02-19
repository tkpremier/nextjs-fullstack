import { StepperContext, StepperProvider } from "@/context/Stepper";
import styles from "@/styles/Stepper.module.scss";
import { Step as StepType } from "@/types/components/stepper";
import React, { useContext } from "react";

const initialState: React.PropsWithChildren<StepType[]> = [
  { stepNumber: 1, active: true },
  { stepNumber: 2, active: false },
  { stepNumber: 3, active: false }
];

export const Stepper = ({ children }: { children: React.ReactNode }) => <StepperProvider initialState={initialState}>
  <div className={styles.stepper}>
    {children}
  </div>
</StepperProvider>


export const Step = ({ stepNumber, children }: { stepNumber: number, children: React.ReactNode }) => {
  const [state, dispatch] = useContext(StepperContext);
  const step = state.find((step: { stepNumber: number }) => step.stepNumber === stepNumber);
  const isActive = step?.active ?? false;
  const totalSteps = state.length;
  const hasNext = stepNumber < totalSteps;
  const hasPrev = stepNumber > 1;
  return (
    <div
      className={`${styles.step} ${isActive ? styles.stepActive : ""}`}
      aria-hidden={!isActive}
    >
      {children}
      {isActive ? <span aria-hidden="true">Active</span> : null}
      <div className={styles.stepActions}>
        {hasPrev && (
          <button type="button" onClick={() => dispatch({ type: 'GOTO_STEP', payload: { stepNumber: stepNumber - 1 } })}>
            Previous
          </button>
        )}
        {hasNext && (
          <button type="button" onClick={() => dispatch({ type: 'GOTO_STEP', payload: { stepNumber: stepNumber + 1 } })}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export const StepContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const StepFooter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;