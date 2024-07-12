import { useState, useEffect, useRef } from "react";

export const useIntersectionObserver = (threshold = 0.4) => {
  const [hasEntered, setHasEntered] = useState(threshold === 0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (threshold === 0) {
      setHasEntered(true);
      return;
    }

    const currentElement = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // console.log("entry.isIntersecting", entry);
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect(); // Disconnect the observer
        }
      },
      { threshold }
    );

    if (currentElement) {
      // console.log("出现", currentElement);
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, hasEntered];
};
