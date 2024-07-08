import { useSpring } from "react-spring";
import { useState, useEffect, useRef } from "react";

// Animation configurations
const animations = {
  fadeInUp: {
    from: { opacity: 0, transform: "translateY(150px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  fadeInDown: {
    from: { opacity: 0, transform: "translateY(-150px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  fadeInLeft: {
    from: { opacity: 0, transform: "translateX(-150px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  fadeInRight: {
    from: { opacity: 0, transform: "translateX(150px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
};

export const useAnimation = (hasEntered, type = "fadeInUp") => {
  const { from, to } = animations[type] || animations.fadeInUp;
  return useSpring({
    opacity: hasEntered ? to.opacity : from.opacity,
    transform: hasEntered ? to.transform : from.transform,
    config: { duration: 800 },
  });
};

export const useIntersectionObserverAnimation = (
  type = "fadeInUp",
  threshold = 0.4
) => {
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
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect(); // Disconnect the observer
        }
      },
      { threshold }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const animationProps = useAnimation(hasEntered, type);

  return [elementRef, animationProps];
};
