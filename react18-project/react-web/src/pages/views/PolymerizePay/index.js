import {
  carouselDataSource,
  cardDataSource,
} from "@/assets/dataSource/polymerizePaySource";
import { animated } from "react-spring";
import { useTransitionAnimation } from "@/utils/animations";
import "./index.scss";
import { Suspense, lazy, memo } from "react";
const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);

const CardBox = memo(({ abilityList, style }) => {
  return (
    <animated.div style={style} className="box_card_box">
      <img className="card_box_img" alt="" src={abilityList.url} />
      <div className="card_box_layout">
        <div className="box_layout_title">{abilityList.title}</div>
        {abilityList.text ? (
          <div className="box_layout_text">{abilityList.text}</div>
        ) : (
          ""
        )}
      </div>
    </animated.div>
  );
});

const CardList = memo(({ list, style }) => {
  const [elementRef, transitions] = useTransitionAnimation(
    list.abilityList,
    "fadeInUp",
    {
      trail: 500, // 控制每个项目之间的动画延迟
    },
    0.5
  );

  return (
    <animated.div
      style={style}
      className={`polymerize_pay_box ${
        list.type === "right" ? "pay_box_action" : ""
      }`}
    >
      <div
        className={`pay_box_card ${
          list.type === "right" ? "box_card_action" : ""
        }`}
      >
        <div className="box_card_title" ref={elementRef}>
          {list.title}
        </div>
        {transitions((styles, item) => (
          <CardBox abilityList={item} style={styles} />
        ))}
      </div>
      <img className="pay_box_img" alt="" src={list.url} />
    </animated.div>
  );
});

const PolymerizePay = () => {
  const [elementRef, transitions] = useTransitionAnimation(
    cardDataSource.list,
    "fadeInUp",
    {
      trail: 500, // 控制每个项目之间的动画延迟
    },
    0.5
  );

  return (
    <div className="polymerize_pay">
      <Suspense fallback={"loading..."}>
        <div ref={elementRef}>
          <CustomCarousel urls={carouselDataSource.urls}></CustomCarousel>
        </div>
      </Suspense>
      {transitions((style, item) => (
        <CardList list={item} style={style} />
      ))}
    </div>
  );
};

export default PolymerizePay;
