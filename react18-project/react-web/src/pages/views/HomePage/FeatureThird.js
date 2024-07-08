import img006 from "@/assets/images/homePage/006.webp";
import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";

const ThirdOption = ({ item }) => {
  return (
    <div className="text_box_option">
      <img className="box_option_img" alt="" src={img006} />
      <div>{item}</div>
    </div>
  );
};

const ThirdCard = React.forwardRef(({ item, style }, ref) => {
  return (
    <animated.div style={style} ref={ref} className="third_box_card">
      <div className="box_card_text">
        <div className="card_text_title">{item.title}</div>
        <div className="card_text_text">{item.text}</div>
        <div className="text_text_box">
          {item.optionList.map((optionItem, index) => {
            return <ThirdOption item={optionItem} key={index}></ThirdOption>;
          })}
        </div>
      </div>
      <img className="box_card_img" alt="" src={item.url} />
    </animated.div>
  );
});

const FeatureThird = ({ cardList, getApp }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect(); // 断开观察器
          }
        });
      },
      { threshold: 0.4 } // 进入视口的 40% 时触发
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const animationPropsY = useSpring({
    opacity: hasEntered ? 1 : 0,
    transform: hasEntered ? "translateX(0)" : "translateX(-150px)",
    config: { duration: 500 },
  });

  const animationPropsX = useSpring({
    opacity: hasEntered ? 1 : 0,
    transform: hasEntered ? "translateX(0)" : "translateX(150px)",
    config: { duration: 500 },
  });

  return (
    <div ref={elementRef} className="home_page_third">
      <div className="page_third_title">行业数字化解决方案，激发增长新动能</div>

      {!getApp.isMobile && (
        <div className="page_third_box">
          {cardList.map((item, index) => (
            <ThirdCard
              style={index % 2 === 0 ? animationPropsY : animationPropsX}
              item={item}
              key={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureThird;
