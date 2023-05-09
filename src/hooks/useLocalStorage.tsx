import { useState } from 'react';

type ReturnType<T> = [T,  (value: T) => void];

export function useLocalStorage<T>(key: string, initialValue : T): ReturnType<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      alert(`Error setting value in local storage: ${error}`);
    }
  };

  return [storedValue, setValue];
}
