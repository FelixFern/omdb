import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls callback after delay", () => {
    const callback = vi.fn();
    const delay = 500;

    renderHook(() => useDebounce(callback, delay, []));

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancels previous timeout when dependencies change", () => {
    const callback = vi.fn();
    const delay = 500;

    const { rerender } = renderHook(
      ({ deps }) => useDebounce(callback, delay, deps),
      { initialProps: { deps: [1] } }
    );

    vi.advanceTimersByTime(250);

    rerender({ deps: [2] });

    vi.advanceTimersByTime(250);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(250);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cleans up timeout on unmount", () => {
    const callback = vi.fn();
    const delay = 500;

    const { unmount } = renderHook(() => useDebounce(callback, delay, []));

    vi.advanceTimersByTime(250);

    unmount();

    vi.advanceTimersByTime(250);

    expect(callback).not.toHaveBeenCalled();
  });

  it("handles multiple dependency changes", () => {
    const callback = vi.fn();
    const delay = 300;

    const { rerender } = renderHook(
      ({ deps }) => useDebounce(callback, delay, deps),
      { initialProps: { deps: ["a"] } }
    );

    vi.advanceTimersByTime(100);
    rerender({ deps: ["b"] });

    vi.advanceTimersByTime(100);
    rerender({ deps: ["c"] });

    vi.advanceTimersByTime(100);
    rerender({ deps: ["d"] });

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("respects different delay values", () => {
    const callback = vi.fn();
    const shortDelay = 100;
    const longDelay = 1000;

    const { rerender } = renderHook(
      ({ delay }) => useDebounce(callback, delay, []),
      { initialProps: { delay: shortDelay } }
    );

    vi.advanceTimersByTime(shortDelay);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ delay: longDelay });

    vi.advanceTimersByTime(shortDelay);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(longDelay - shortDelay);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
