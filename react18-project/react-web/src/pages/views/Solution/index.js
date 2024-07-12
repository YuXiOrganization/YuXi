import { useParams } from "react-router-dom";
import { animated } from "react-spring";
import solutionSource from "@/assets/dataSource/solutionSource";
import { useTransitionAnimation } from "@/utils/animations";
import "./index.scss";
import { Suspense, lazy, memo } from "react";
const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);

const CardFirst = memo(({ list, style }) => {
  return (
    <animated.div style={style} className="first_box_card">
      <img className="box_card_img" alt="" src={list.url} />
      <div className="box_card_title">{list.title}</div>
      <div className="box_card_text">{list.text}</div>
    </animated.div>
  );
});
const CardSecond = memo(({ list, style }) => {
  return (
    <animated.div style={style} className="second_box_card">
      <div className="box_card_title">{list.title}</div>
      <div className="box_card_box">
        {list.list.map((item, index) => {
          return (
            <div key={index} className="card_box_text">
              {item}
            </div>
          );
        })}
      </div>
    </animated.div>
  );
});
const useSolutionAnimations = (source) => {
  const [elementRef, transitions] = useTransitionAnimation(
    source.painPoints,
    "fadeInLeft",
    { trail: 500 }, // 控制每个项目之间的动画延迟
    0.5
  );

  const [elementRefSec, transitionsSec] = useTransitionAnimation(
    source.programme,
    "fadeInRight",
    { trail: 500 }, // 控制每个项目之间的动画延迟
    0.5
  );

  return { elementRef, transitions, elementRefSec, transitionsSec };
};

const Solution = () => {
  const { id } = useParams();
  const getSolutionSource = solutionSource[`cardList${id}`];

  const { elementRef, transitions, elementRefSec, transitionsSec } =
    useSolutionAnimations(getSolutionSource);

  return (
    <div className="solution">
      <Suspense>
        <CustomCarousel urls={getSolutionSource.carouselList} />
      </Suspense>

      <div className="solution_first">
        <div className="solution_first_title" ref={elementRef}>
          行业痛点
        </div>
        <div className="solution_first_box">
          {/* {getSolutionSource.painPoints.map((item, index) => {
            return <CardFirst key={index} list={item} />;
          })} */}
          {transitions((style, item) => (
            <CardFirst list={item} style={style} />
          ))}
        </div>
      </div>
      <div className="solution_second">
        <div className="solution_second_title" ref={elementRefSec}>
          行业方案
        </div>
        <div className="solution_second_box">
          {/* {getSolutionSource.programme.map((item, index) => {
            return <CardSecond key={index} list={item} />;
          })} */}
          {transitionsSec((style, item) => (
            <CardSecond list={item} style={style} />
          ))}
        </div>
      </div>

      {/* this is Solution{id} */}
    </div>
  );
};

export default Solution;
