import { useState, useEffect, useCallback } from "react";

function useRangedNumberInput(initValue: number, range?: {minInclusive?: number, maxInclusive?: number}) {
  const [text, setText] = useState(initValue.toString());
  const [value, setValue] = useState(initValue);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const newValue = parseFloat(text);
    if(!isNaN(newValue) && newValue >= (range?.minInclusive ?? -Infinity) && newValue <= (range?.maxInclusive ?? Infinity)) {
      setValue(newValue);
      setIsValid(true);
    }
    else {
      setIsValid(false);
    }
  }, [text, setValue]);

  const align = useCallback(() => {
    setText(value.toString());
  }, [value]);

  return {text, value, isValid, setText, align};
}

export default useRangedNumberInput;
