import { useEffect, useState } from 'react';

type Initializer<T> = T | (() => T);

const isBrowser = typeof window !== 'undefined';

function resolveInitial<T>(initialValue: Initializer<T>): T {
  return typeof initialValue === 'function'
    ? (initialValue as () => T)()
    : initialValue;
}

export function usePersistentState<T>(key: string, initialValue: Initializer<T>) {
  const [state, setState] = useState<T>(() => {
    if (!isBrowser) {
      return resolveInitial(initialValue);
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue) as T;
      }
    } catch (error) {
      console.warn(`Failed to parse localStorage key "${key}":`, error);
    }

    return resolveInitial(initialValue);
  });

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Failed to write localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
