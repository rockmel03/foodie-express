import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initialState = false) => {
  const [toggle, setToggle] = useLocalStorage(key, initialState);

  const toggleFunction = () => {
    setToggle((prev) => !prev);
  };

  return [toggle, toggleFunction];
};

export default useToggle;
