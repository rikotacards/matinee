import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a value.
 * @param value The value to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value.
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // The cleanup function clears the timeout if the value or delay changes
    // before the timer has run. This is the core of the debounce logic.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Rerun the effect only if value or delay changes.

  return debouncedValue;
}