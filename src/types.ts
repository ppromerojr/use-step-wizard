export type UseWizardStateOptions = {
  initialStep?: number;
  name?: string;
};

/** @deprecated Use WizardRootProps */
export type WizardProviderProps = WizardRootProps;

export type WizardRootProps = {
  children: React.ReactNode;
  initialStep?: number;
  name?: string;
};

export type WizardStep = {
  index: number;
  name?: string;
} & Record<string, unknown>;

export type WizardStepsProps = {
  children: React.ReactNode;
};

export type WizardState = {
  totalSteps: number;
  activeIndex: number;
  steps: WizardStep[];
};

export interface WizardContextType {
  name: string;
  steps: WizardStep[];
  activeIndex: number;
  totalSteps: number;
  previous: () => void;
  next: () => void;
  goToStep: (index: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  setTotalSteps: (totalSteps: number) => void;
  setState: React.Dispatch<React.SetStateAction<WizardState>>;
}

export interface WizardNavigationProps {
  children: ((context: WizardContextType) => React.ReactNode) | React.ReactNode;
}
