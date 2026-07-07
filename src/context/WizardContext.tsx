import { createContext } from "react";

import type { WizardContextValues } from "../types";

const WizardContext = createContext<WizardContextValues | null>(null);

export default WizardContext;
