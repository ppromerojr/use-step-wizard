import WizardContext from "./context/WizardContext";
import useWizardState from "./hooks/useWizardState";
import type { WizardRootProps } from "./types";
import WizardNavigation from "./WizardNavigation";
import WizardSteps from "./WizardSteps";

const Wizard = ({ children, initialStep = 0, name = "" }: WizardRootProps) => {
  const wizard = useWizardState({
    initialStep,
    name
  });

  return (
    <WizardContext.Provider value={wizard}>
      {children}
    </WizardContext.Provider>
  );
};

export default {
  Root: Wizard,
  Steps: WizardSteps,
  Navigation: WizardNavigation
};
