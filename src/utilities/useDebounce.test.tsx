import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce"; // Update with the correct path

jest.useFakeTimers(); // Use Jest fake timers for precise timing control

describe("useDebounce Hook", () => {
    test("should return initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("hello", 500));
        expect(result.current).toBe("hello");
    });

    test("should update value after debounce delay", () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: "hello" },
        });

        // Initial value
        expect(result.current).toBe("hello");

        // Update value
        rerender({ value: "world" });

        // Should still return old value before timeout
        expect(result.current).toBe("hello");

        // Fast-forward time to trigger debounce
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // Now the debounced value should be updated
        expect(result.current).toBe("world");
    });

    test("should reset debounce timer when value changes", () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: "first" },
        });

        rerender({ value: "second" });

        // Advance time only partially
        act(() => {
            jest.advanceTimersByTime(300);
        });

        // Value should still be "first" because debounce hasn't completed
        expect(result.current).toBe("first");

        // Update the value again before the first debounce completes
        rerender({ value: "third" });

        // Fast-forward the full debounce time
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // The final debounced value should be "third"
        expect(result.current).toBe("third");
    });

    test("should clean up timeout on unmount", () => {
        const { result, unmount, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: "before unmount" },
        });

        rerender({ value: "after unmount" });

        unmount();

        // Fast-forward time to see if it still updates
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // Since the component is unmounted, value should remain unchanged
        expect(result.current).toBe("before unmount");
    });
});
