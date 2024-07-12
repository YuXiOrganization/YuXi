import { useTransitionAnimation } from "@/utils/animations";
import { animated } from "react-spring";
import "./featureFourth.scss";

const FeatureFourth = ({ cardList, getApp }) => {
  const isMobile = getApp.isMobile;

  const [elementRef, transitions] = useTransitionAnimation(
    cardList,
    !isMobile ? "fadeInUp" : "fadeInLeft",
    {
      trail: 500, // 控制每个项目之间的动画延迟
    },
    0.2
  );

  const FourthCard = ({ cardList, isShow, style }) => {
    return (
      <>
        <animated.div style={style} className="fourth_box_card">
          <img className="box_card_img" alt="" src={cardList.url} />
          <div className="box_card_title">{cardList.title}</div>
          <span>{cardList.text01}</span>
          <span>{cardList.text02}</span>
          <span>{cardList.text03}</span>
          <span>{cardList.text04}</span>
        </animated.div>
        {isShow && (
          <img className="fourth_box_img" alt="" src={cardList.url}></img>
        )}
      </>
    );
  };

  return (
    <div className="home_page_fourth">
      <div ref={elementRef} className="page_fourth_title">
        合作模式
      </div>

      <div className="page_fourth_box">
        {transitions((style, item) => (
          <FourthCard
            key={item.index} // 确保每个组件都有一个唯一的 key
            style={style}
            cardList={item}
            isShow={cardList.length - 1 !== item.index && !isMobile}
          ></FourthCard>
        ))}
      </div>
    </div>
  );
};

export default FeatureFourth;
