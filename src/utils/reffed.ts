import { MutableRefObject, useEffect, useRef } from "react";

// I don't feel like micromanaging useCallbacks
export function getReffedValue<T extends unknown>(val: T): MutableRefObject<T> {
  const valRef = useRef<T>(val);
  useEffect(() => {
    valRef.current = val;
  }, [val]);
  return valRef;
}
