import img002 from "../../../assets/images/homePage/002.webp";
import { useIntersectionObserverAnimation } from "@/utils/animations";
import { animated } from "react-spring";
import "./featureSecond.scss";
const FeaturSecond = ({ getApp }) => {
  const [elementRef, animationProps] = useIntersectionObserverAnimation(
    !getApp.isMobile ? "fadeInLeft" : "fadeInLeft",
    0.1
  );

  return (
    <div className="home_page_second" ref={elementRef}>
      <animated.div style={animationProps} className="page_second_text">
        <div className="second_text_title">聚合中台</div>
        <div className="second_text_text">
          以聚合支付为入口，为线下商户提供数字化经营解决方案
        </div>
        <div className="second_text_btn">{`了解产品>`}</div>
      </animated.div>

      <img className="page_second_img" alt="" src={img002} />
    </div>
  );
};

export default FeaturSecond;
