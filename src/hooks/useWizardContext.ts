import { useContext } from "react";

import WizardContext from "../context/WizardContext";

const useWizardContext = () => {
  const context = useContext(WizardContext);

  if (context === null) {
    throw new Error("useWizardContext must be used within Wizard.Root");
  }

  return context;
};

export default useWizardContext;
