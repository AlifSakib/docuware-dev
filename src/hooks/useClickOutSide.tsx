import { useState, useEffect, RefObject } from "react";

function useClickOutside(ref: RefObject<HTMLElement>) {
  const [isOutside, setIsOutside] = useState<boolean>(false);

  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOutside(true);
    } else {
      setIsOutside(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return isOutside;
}

export default useClickOutside;
