import { useEffect, useState } from "react";

export const useDebouncedValue = <T extends unknown>(
  value: T,
  time: number
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const changeTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(changeTimeout);
    };
  }, [value, time]);
  return debouncedValue;
};
