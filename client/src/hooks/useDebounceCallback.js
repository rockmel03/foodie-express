import React, { useRef } from "react";

const useDebounceCallback = (callback, delay) => {
  const debounceRef = useRef();

  return (...arg) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      callback(...arg);
    }, delay);
  };
};

export default useDebounceCallback;
