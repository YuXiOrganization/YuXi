import img006 from "@/assets/images/homePage/006.webp";
import './featureThird.scss'
import { useIntersectionObserverAnimation } from "@/utils/animations";
import React from "react";
import { animated } from "react-spring";

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
          {item.optionList.map((optionItem, index) => (
            <ThirdOption item={optionItem} key={index} />
          ))}
        </div>
      </div>
      <img className="box_card_img" alt="" src={item.url} />
    </animated.div>
  );
});

const FeatureThird = ({ cardList, getApp }) => {
  const isMobile = getApp.isMobile;
  const [elementRefLeft, animationPropsLeft] = useIntersectionObserverAnimation(
    isMobile ? "fadeInRight" : "fadeInLeft",
    0.1
  );
  const [elementRefRight, animationPropsRight] =
    useIntersectionObserverAnimation(
      isMobile ? "fadeInLeft" : "fadeInRight",
      0.1
    );

  return (
    <div className="home_page_third">
      <div className="page_third_title">行业数字化解决方案，激发增长新动能</div>

      <div className="page_third_box">
        {cardList.map((item, index) => (
          <ThirdCard
            ref={index % 2 === 0 ? elementRefLeft : elementRefRight}
            style={index % 2 === 0 ? animationPropsLeft : animationPropsRight}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureThird;
