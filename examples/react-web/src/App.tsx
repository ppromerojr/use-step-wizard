import { Wizard, type WizardContextType } from "use-step-wizard";

function StepCard({
  title,
  description,
}: {
  name?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="step-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Navigation() {
  return (
    <Wizard.Navigation>
      {({
        previous,
        next,
        isFirstStep,
        isLastStep,
        activeIndex,
        totalSteps,
      }: WizardContextType) => (
        <div className="nav">
          <button
            type="button"
            className="secondary"
            onClick={previous}
            disabled={isFirstStep}
          >
            Back
          </button>
          <span className="progress">
            Step {activeIndex + 1} of {totalSteps}
          </span>
          <button type="button" onClick={next} disabled={isLastStep}>
            {isLastStep ? "Done" : "Next"}
          </button>
        </div>
      )}
    </Wizard.Navigation>
  );
}

export default function App() {
  return (
    <main className="app">
      <Wizard.Root initialStep={0} name="onboarding">
        <Wizard.Steps>
          <StepCard
            key="profile"
            name="profile"
            title="Profile"
            description="Collect basic user information."
          />
          <StepCard
            key="details"
            name="details"
            title="Details"
            description="Add preferences and settings."
          />
          <StepCard
            key="review"
            name="review"
            title="Review"
            description="Confirm everything before finishing."
          />
        </Wizard.Steps>
        <Navigation />
      </Wizard.Root>
    </main>
  );
}
