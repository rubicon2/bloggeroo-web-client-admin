import { useState, useEffect } from 'react';

export default function useSessionStorage(key, initialValue = null) {
  // Problem with this is, using returned setValue function only refreshes the component
  // that used the setVale function.

  const [value, setValue] = useState(() => {
    // Check if there is an existing stored value before setting intialValue.
    // This will stop a stored value from being overwritten, and it can be
    // shared between components.
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
