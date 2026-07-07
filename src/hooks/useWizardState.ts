import { useCallback, useMemo, useState } from "react";

import type { UseWizardStateOptions, WizardContextType, WizardState } from "../types";

const clampIndex = (index: number, totalSteps: number) =>
  Math.min(Math.max(0, index), Math.max(0, totalSteps - 1));

const useWizardState = ({
  name = "",
  initialStep = 0,
}: UseWizardStateOptions = {}): WizardContextType => {
  const [state, setState] = useState<WizardState>(() => ({
    totalSteps: 0,
    steps: [],
    activeIndex: Math.max(0, initialStep),
  }));

  const activeIndex = clampIndex(state.activeIndex, state.totalSteps);
  const isFirstStep = activeIndex === 0;
  const isLastStep = state.totalSteps > 0 && activeIndex === state.totalSteps - 1;

  const previous = useCallback(() => {
    setState((prev) => {
      if (prev.activeIndex <= 0) {
        return prev;
      }

      return {
        ...prev,
        activeIndex: prev.activeIndex - 1,
      };
    });
  }, []);

  const next = useCallback(() => {
    setState((prev) => {
      if (prev.totalSteps === 0 || prev.activeIndex >= prev.totalSteps - 1) {
        return prev;
      }

      return {
        ...prev,
        activeIndex: prev.activeIndex + 1,
      };
    });
  }, []);

  const goToStep = useCallback((index: number) => {
    setState((prev) => {
      const nextIndex = clampIndex(index, prev.totalSteps);

      if (nextIndex === prev.activeIndex) {
        return prev;
      }

      return {
        ...prev,
        activeIndex: nextIndex,
      };
    });
  }, []);

  const setTotalSteps = useCallback((totalSteps: number) => {
    setState((prev) => {
      const nextTotal = Math.max(0, totalSteps);
      const nextIndex = clampIndex(prev.activeIndex, nextTotal);

      if (nextTotal === prev.totalSteps && nextIndex === prev.activeIndex) {
        return prev;
      }

      return {
        ...prev,
        totalSteps: nextTotal,
        activeIndex: nextIndex,
      };
    });
  }, []);

  return useMemo(
    () => ({
      name,
      steps: state.steps,
      activeIndex,
      totalSteps: state.totalSteps,
      previous,
      next,
      goToStep,
      isFirstStep,
      isLastStep,
      setTotalSteps,
      setState,
    }),
    [
      name,
      state.steps,
      activeIndex,
      state.totalSteps,
      previous,
      next,
      goToStep,
      isFirstStep,
      isLastStep,
      setTotalSteps,
      setState,
    ]
  );
};

export default useWizardState;
