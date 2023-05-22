import { useState } from 'react';
/**
 * Hook Contador
 * @param {BigInteger} initialValue
 * @param {BigInteger} minRange
 * @param {BigInteger} maxRange
 * @returns
 */
const useCounter = (initialValue = 0, minRange = 0, maxRange = 10) => {
  const [value, setValue] = useState(initialValue);

  // Increment value to counter
  const increment = () => {
    // setValue((oldValue) => oldValue + 1);
    setValue(value + 1);
  };

  // Increment value to counter
  const decrement = () => {
    // setValue((oldValue) => oldValue - 1);
    setValue(value - 1);
  };

  // Reset value to counter
  const reset = () => {
      setValue(0);
  };

  // Counter is in max/min range ? true / false
  const isInRange = () => value >= minRange && value <= maxRange;

  return {
    value, setValue, minRange, maxRange, increment, decrement, reset, isInRange,
  };
};

export default useCounter;
