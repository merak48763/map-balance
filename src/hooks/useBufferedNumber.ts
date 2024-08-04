import { useState, useCallback } from "react";

interface Range {
  min?: number,
  max?: number
}

function useBufferedNumber(initValue: number, range?: Range) {
  const [rawValue, setRawValue] = useState<string | number>(initValue);
  const [bufferedValue, setBufferedValue] = useState(initValue);

  const min = range?.min;
  const max = range?.max;
  const inRange = useCallback((value: number) => {
    return (min === undefined || value >= min) && (max === undefined || value <= max);
  }, [min, max]);

  const setValue = useCallback((value: string | number) => {
    if(typeof value === "number" && inRange(value)) {
      setBufferedValue(value);
    }
    setRawValue(value);
  }, []);

  return [bufferedValue, rawValue, setValue] as const;
}

export default useBufferedNumber;
