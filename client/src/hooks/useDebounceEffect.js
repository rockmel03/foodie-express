import React, { useEffect } from "react";
import useDebounceCallback from "./useDebounceCallback";

// ! todo: add type checking for callback and delay
// ! todo: test this hook
const useDebounceEffect = (callback, delay, dependencies ) => {
  if (!Array.isArray(dependencies)) {
    throw new Error("Dependencies must be an array");
  }

  const debouncedCallback = useDebounceCallback(callback, delay);

  useEffect(() => {
    debouncedCallback();
  }, dependencies);
};

export default useDebounceEffect;
