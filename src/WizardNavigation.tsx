import useWizardContext from "./hooks/useWizardContext";
import type { WizardNavigationProps } from "./types";

const WizardNavigation = ({ children }: WizardNavigationProps) => {
  const context = useWizardContext();

  return typeof children === "function" ? children(context) : children;
};

export default WizardNavigation;
