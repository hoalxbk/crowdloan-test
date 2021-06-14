import React, { useState, useRef, useEffect } from 'react';

const useComponentVisible = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<any>();

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  }

  const handleKeyboardEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClickOutside, true);
    window.addEventListener("keydown", handleKeyboardEscape, true);

    return () => {
      window.removeEventListener("click", handleClickOutside, true);
      window.removeEventListener("keydown", handleKeyboardEscape, true);
    }
  }, []);

  return {
    isVisible,
    setIsVisible,
    ref
  }
}

export default useComponentVisible;
