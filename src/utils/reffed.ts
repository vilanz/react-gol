import { MutableRefObject, useEffect, useRef } from "react";

export function getReffedValue<T>(val: T): MutableRefObject<T> {
  const valRef = useRef<T>(val);
  useEffect(() => {
    valRef.current = val;
  }, [val]);
  return valRef;
}
