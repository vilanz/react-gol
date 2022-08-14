import { useEffect, useState } from "react";

export function useDebouncedValue<T extends unknown>(
  value: T,
  time: number
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const changeTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(changeTimeout);
    };
  }, [value, time]);

  return debouncedValue;
}
