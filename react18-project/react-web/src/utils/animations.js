import { useSpring, useTransition } from "react-spring";
import { useIntersectionObserver } from "./useIntersectionObserver"; // 你的文件路径
import { useState, useEffect } from "react";

// Animation configurations
const animations = {
  fadeInUp: {
    from: { opacity: 0, transform: "translateY(100px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(100px)" },
  },
  fadeInDown: {
    from: { opacity: 0, transform: "translateY(-100px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-100px)" },
  },
  fadeInLeft: {
    from: { opacity: 0, transform: "translateX(-100px)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(-100px)" },
  },
  fadeInRight: {
    from: { opacity: 0, transform: "translateX(100px)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(100px)" },
  },
};

const useAnimation = (hasEntered, type = "fadeInUp") => {
  const { from, enter } = animations[type] || animations.fadeInUp;
  return useSpring({
    opacity: hasEntered ? enter.opacity : from.opacity,
    transform: hasEntered ? enter.transform : from.transform,
    config: { duration: 800 },
  });
};

const useIntersectionObserverAnimation = (
  type = "fadeInUp",
  threshold = 0.4
) => {
  const [elementRef, hasEntered] = useIntersectionObserver(threshold);
  const animationProps = useAnimation(hasEntered, type);
  return [elementRef, animationProps];
};

const useTransitionAnimation = (
  items,
  type = "fadeInUp",
  options = {},
  threshold = 0.4
) => {
  const [elementRef, hasEntered] = useIntersectionObserver(threshold);
  const [internalItems, setInternalItems] = useState([]);

  useEffect(() => {
    if (hasEntered) {
      // 为每个项目添加一个 index 属性
      const itemsWithIndex = items.map((item, index) => ({
        ...item,
        index: item.index ?? index,
      }));
      // console.log("setInternalItems", items);
      setInternalItems(itemsWithIndex);
    }
  }, [hasEntered, items]);

  const { from, enter, leave } = animations[type] || animations.fadeInUp;

  const transitions = useTransition(internalItems, {
    keys: (item) => item.index, // 使用 index 作为 key
    from: { opacity: 0, transform: from.transform },
    enter: { opacity: 1, transform: enter.transform },
    leave: { opacity: 0, transform: leave.transform },
    ...options, // Allows additional options to be passed in
  });

  return [elementRef, transitions];
};

export {
  useAnimation,
  useIntersectionObserverAnimation,
  useTransitionAnimation,
};
