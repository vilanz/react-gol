import { MutableRefObject, Ref, useEffect, useRef, useState } from "react";

export function useDebouncedValue<T extends unknown>(value: T, time: number) {
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
}

// I don't feel like micromanaging useCallbacks
export function getReffedValue<T extends unknown>(val: T): MutableRefObject<T> {
  const valRef = useRef<T>(val);
  useEffect(() => {
    valRef.current = val;
  }, [val]);
  return valRef;
}
