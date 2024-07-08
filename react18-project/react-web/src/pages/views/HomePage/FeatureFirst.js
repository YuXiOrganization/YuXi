import React, { forwardRef } from "react";
import { animated } from "react-spring";
import { useIntersectionObserverAnimation } from "@/utils/animations";

// FirstCard Component
const FirstCard = forwardRef(({ cardList }, ref) => {
  const { title, text, url } = cardList;
  return (
    <div ref={ref} className="first_box_card">
      <div className="box_card_line"></div>
      <div className="box_card_title">{title}</div>
      <div className="box_card_text">{text}</div>
      <img className="box_card_img" alt="" src={url} />
    </div>
  );
});

// FeatureFirst Component
const FeatureFirst = ({ cardList, getApp }) => {
  const [elementRef, animationProps] = useIntersectionObserverAnimation(
    !getApp.isMobile ? "fadeInDown" : "fadeInLeft",
    0.1
  );

  const [elementRefUp, animationPropsUp] = useIntersectionObserverAnimation(
    !getApp.isMobile ? "fadeInDown" : "fadeInRight",
    0.1
  );

  return (
    <div className="home_page_first" >
      <div ref={elementRefUp}>
        <animated.div style={animationPropsUp} className="page_first_title">
          商户数字化经营运营商
        </animated.div>
      </div>

      {/* {!getApp.isMobile && ( */}
      <div ref={elementRef} className="page_first_boxadd">
        <animated.div style={animationProps} className="page_first_box">
          {cardList.map((item, index) => (
            <FirstCard key={index} cardList={item} />
          ))}
        </animated.div>
      </div>
      {/* )} */}
    </div>
  );
};

export default FeatureFirst;
