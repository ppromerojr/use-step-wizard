import { render, renderHook, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import WizardContext from "../../context/WizardContext";
import useWizardState from "../useWizardState";
import useWizardContext from "../useWizardContext";

const wrapper =
  (value: ReturnType<typeof useWizardState>) =>
  ({ children }: { children: ReactNode }) => (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );

describe("useWizardContext", () => {
  it("throws when used outside Wizard.Root", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const OutsideProvider = () => {
      useWizardContext();
      return null;
    };

    expect(() => render(<OutsideProvider />)).toThrow(
      "useWizardContext must be used within Wizard.Root"
    );

    consoleError.mockRestore();
  });

  it("returns wizard context inside provider", () => {
    const state = renderHook(() => useWizardState({ name: "onboarding" })).result
      .current;

    const { result } = renderHook(() => useWizardContext(), {
      wrapper: wrapper(state),
    });

    expect(result.current.name).toBe("onboarding");
    expect(result.current.activeIndex).toBe(0);
  });
});
