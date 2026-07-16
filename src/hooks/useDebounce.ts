// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpieza de temporizadores si el valor o el delay cambian
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}