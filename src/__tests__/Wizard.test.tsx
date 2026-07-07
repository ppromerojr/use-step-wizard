import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";

import Wizard from "../Wizard";
import type { WizardContextType } from "../types";

function Step({
  name,
  children,
  ...props
}: {
  name?: string;
  children: ReactNode;
  "data-testid"?: string;
}) {
  return <div {...props}>{children}</div>;
}

function TestWizard() {
  return (
    <Wizard.Root initialStep={0} name="onboarding">
      <Wizard.Steps>
        <Step key="profile" data-testid="step-profile" name="profile">
          Profile
        </Step>
        <Step key="details" data-testid="step-details" name="details">
          Details
        </Step>
        <Step key="review" data-testid="step-review" name="review">
          Review
        </Step>
      </Wizard.Steps>

      <Wizard.Navigation>
        {({
          previous,
          next,
          isFirstStep,
          isLastStep,
          activeIndex,
          totalSteps,
          steps,
        }: WizardContextType) => (
          <div>
            <button type="button" onClick={previous} disabled={isFirstStep}>
              Back
            </button>
            <span data-testid="progress">
              Step {activeIndex + 1} of {totalSteps}
            </span>
            <button type="button" onClick={next} disabled={isLastStep}>
              Next
            </button>
            <span data-testid="step-names">
              {steps.map((step) => step.name).join(",")}
            </span>
          </div>
        )}
      </Wizard.Navigation>
    </Wizard.Root>
  );
}

describe("Wizard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders only the active step", () => {
    render(<TestWizard />);

    expect(screen.getByTestId("step-profile")).toBeInTheDocument();
    expect(screen.queryByTestId("step-details")).not.toBeInTheDocument();
    expect(screen.queryByTestId("step-review")).not.toBeInTheDocument();
  });

  it("navigates through steps", async () => {
    const user = userEvent.setup();
    render(<TestWizard />);

    expect(screen.getByTestId("progress")).toHaveTextContent("Step 1 of 3");
    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByTestId("step-details")).toBeInTheDocument();
    expect(screen.getByTestId("progress")).toHaveTextContent("Step 2 of 3");

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByTestId("step-review")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByTestId("step-details")).toBeInTheDocument();
  });

  it("registers step metadata from child name props", () => {
    render(<TestWizard />);

    expect(screen.getByTestId("step-names")).toHaveTextContent(
      "profile,details,review"
    );
  });

  it("renders static navigation children", () => {
    render(
      <Wizard.Root>
        <Wizard.Steps>
          <div key="only">Only step</div>
        </Wizard.Steps>
        <Wizard.Navigation>
          <span data-testid="static-nav">Static nav</span>
        </Wizard.Navigation>
      </Wizard.Root>
    );

    expect(screen.getByTestId("static-nav")).toBeInTheDocument();
  });
});
