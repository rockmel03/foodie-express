import { useEffect, useState } from "react";

const getLocalValue = (key, initialValue) => {
  if (typeof window === "undefined") return initialValue;

  const localValue = localStorage.getItem(key);
  if (localValue) return JSON.parse(localValue);

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getLocalValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
