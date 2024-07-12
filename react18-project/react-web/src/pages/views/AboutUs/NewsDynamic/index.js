import { Suspense, lazy, useState, memo } from "react";
import { dynamicCenter, newsList } from "@/assets/dataSource/aboutUsSource";
import { LeftOutlined } from "@ant-design/icons";
import { animated } from "react-spring";
import { useTransitionAnimation } from "@/utils/animations";
import { useSelector } from "react-redux";
import "./index.scss";

const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);

const CradBox = memo(({ list, onClick, style }) => (
  <animated.div style={style} onClick={onClick} className="first_box_card">
    <img className="box_card_img" alt="" src={list.url} />
    <div className="box_card_list">
      <div className="card_list_title">{list.title}</div>
      <div className="card_list_time">{list.time}</div>
    </div>
  </animated.div>
));

const CardNews = memo(({ list, backFun }) => (
  <div className="news_dynamic_crad">
    <div className="news_dynamic_back">
      <LeftOutlined onClick={backFun} />
    </div>
    <div
      className="dynamic_crad_html"
      dangerouslySetInnerHTML={{ __html: list.html }}
    />
  </div>
));

const useNewsState = () => {
  const { isMobile } = useSelector((state) => state.app);

  const [state, setState] = useState(0);
  const [getNew, setNews] = useState(null);

  const changeState = (val) => {
    setState(val);
    setNews(newsList[`news${val}`]);
  };

  const backFun = () => {
    setState(0);
  };

  const [elementRef, transitions] = useTransitionAnimation(
    dynamicCenter.list,
    !isMobile ? "fadeInUp" : "fadeInLeft",
    {
      trail: 500, // 控制每个项目之间的动画延迟
    },
    0.2
  );

  return { state, getNew, changeState, backFun, elementRef, transitions };
};

const NewsDynamic = () => {
  const { state, getNew, changeState, backFun, elementRef, transitions } =
    useNewsState();

  return (
    <div className="news_dynamic">
      <Suspense>
        <CustomCarousel urls={dynamicCenter.carouselList} />
      </Suspense>
      {state === 0 ? (
        <div className="news_dynamic_first" ref={elementRef}>
          <div className="dynamic_first_box">
            {transitions((style, item) => (
              <CradBox
                onClick={() => changeState(item.type)}
                list={item}
                style={style}
              />
            ))}
          </div>
        </div>
      ) : (
        <CardNews backFun={backFun} list={getNew} />
      )}
    </div>
  );
};

export default NewsDynamic;
