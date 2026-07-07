import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import useWizardState from "./useWizardState";

describe("useWizardState", () => {
  it("returns default state", () => {
    const { result } = renderHook(() => useWizardState());

    expect(result.current.name).toBe("");
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.totalSteps).toBe(0);
    expect(result.current.steps).toEqual([]);
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);
  });

  it("accepts name and initialStep options", () => {
    const { result } = renderHook(() =>
      useWizardState({ name: "checkout", initialStep: 2 })
    );

    expect(result.current.name).toBe("checkout");
    expect(result.current.activeIndex).toBe(0);

    act(() => {
      result.current.setTotalSteps(3);
    });
    expect(result.current.activeIndex).toBe(2);
  });

  it("navigates between steps", () => {
    const { result } = renderHook(() => useWizardState());

    act(() => {
      result.current.setTotalSteps(3);
    });

    expect(result.current.totalSteps).toBe(3);
    expect(result.current.isLastStep).toBe(false);

    act(() => {
      result.current.next();
    });
    expect(result.current.activeIndex).toBe(1);

    act(() => {
      result.current.next();
    });
    expect(result.current.activeIndex).toBe(2);
    expect(result.current.isLastStep).toBe(true);

    act(() => {
      result.current.previous();
    });
    expect(result.current.activeIndex).toBe(1);
    expect(result.current.isFirstStep).toBe(false);
  });

  it("does not move past boundaries", () => {
    const { result } = renderHook(() => useWizardState());

    act(() => {
      result.current.setTotalSteps(2);
      result.current.previous();
    });
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.isFirstStep).toBe(true);

    act(() => {
      result.current.next();
      result.current.next();
    });
    expect(result.current.activeIndex).toBe(1);
    expect(result.current.isLastStep).toBe(true);
  });

  it("clamps goToStep to valid range", () => {
    const { result } = renderHook(() => useWizardState());

    act(() => {
      result.current.setTotalSteps(3);
      result.current.goToStep(99);
    });
    expect(result.current.activeIndex).toBe(2);

    act(() => {
      result.current.goToStep(-5);
    });
    expect(result.current.activeIndex).toBe(0);

    act(() => {
      result.current.goToStep(1);
    });
    expect(result.current.activeIndex).toBe(1);
  });

  it("clamps active index when total steps shrink", () => {
    const { result } = renderHook(() => useWizardState({ initialStep: 2 }));

    act(() => {
      result.current.setTotalSteps(3);
    });
    expect(result.current.activeIndex).toBe(2);

    act(() => {
      result.current.setTotalSteps(1);
    });
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.totalSteps).toBe(1);
  });
});
