import { createContext } from "react";

import type { WizardContextType } from "../types";

const WizardContext = createContext<WizardContextType | null>(null);

export default WizardContext;
