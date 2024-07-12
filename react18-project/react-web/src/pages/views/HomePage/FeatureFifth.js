import {
  useIntersectionObserverAnimation,
  useTransitionAnimation,
} from "@/utils/animations";
import { animated } from "react-spring";
import "./featureFifth.scss";

const FeatureFifth = ({ newsImg, cardList, getApp }) => {
  const [elementRefRight, animationPropsRight] =
    useIntersectionObserverAnimation("fadeInRight", 0.1);
  const [elementRef, transitions] = useTransitionAnimation(
    cardList,
    "fadeInUp",
    {
      trail: 500, // 控制每个项目之间的动画延迟
    },
    0.5
  );

  const FifthCard = ({ cardList }) => {
    return (
      <div className="box_card_news">
        <div className="card_news_title">{cardList.title}</div>
        <div className="card_news_time">{cardList.time}</div>
      </div>
    );
  };

  return (
    <div className="home_page_fifth">
      <div className="page_fifth_title">新闻动态</div>
      <div className="page_fifth_box" ref={elementRef}>
        <div className="fifth_box_card">
          {transitions((style, item) => (
            <animated.div style={style} className="box_card_add">
              <FifthCard cardList={item} />
            </animated.div>
          ))}
          <div className="box_card_line"></div>
          <div className="box_card_more">{`了解更多资讯 >`}</div>
        </div>
        <animated.img
          ref={elementRefRight}
          style={animationPropsRight}
          className="fifth_box_img"
          alt=""
          src={newsImg}
        />
      </div>
    </div>
  );
};

export default FeatureFifth;
