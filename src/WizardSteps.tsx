import {
  Children,
  isValidElement,
  type ReactNode,
  useEffect,
  useMemo,
} from "react";

import useWizardContext from "./hooks/useWizardContext";
import type { WizardStep, WizardStepsProps } from "./types";

const parseWizardSteps = (children: ReactNode) => {
  const stepElements = Children.toArray(children);

  const steps: WizardStep[] = stepElements.map((child, index) => {
    if (isValidElement<{ name?: string }>(child) && child.props.name !== undefined) {
      return { index, name: child.props.name };
    }

    return { index };
  });

  return { stepElements, steps };
};

const WizardSteps = ({ children }: WizardStepsProps) => {
  const { activeIndex, setState } = useWizardContext();
  const { stepElements, steps } = useMemo(
    () => parseWizardSteps(children),
    [children]
  );

  useEffect(() => {
    setState((prev) => {
      const nextIndex = Math.min(
        prev.activeIndex,
        Math.max(0, stepElements.length - 1)
      );

      if (
        prev.totalSteps === stepElements.length &&
        prev.activeIndex === nextIndex &&
        prev.steps.length === steps.length &&
        prev.steps.every(
          (step, index) =>
            step.index === steps[index]?.index && step.name === steps[index]?.name
        )
      ) {
        return prev;
      }

      return {
        ...prev,
        totalSteps: stepElements.length,
        steps,
        activeIndex: nextIndex,
      };
    });
  }, [setState, stepElements.length, steps]);

  return stepElements[activeIndex] ?? null;
};

export default WizardSteps;
