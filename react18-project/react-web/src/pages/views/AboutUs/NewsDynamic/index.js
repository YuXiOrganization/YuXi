import { Suspense, lazy, useState } from "react";
import { dynamicCenter, newsList } from "@/assets/dataSource/aboutUsSource";
import { LeftOutlined } from "@ant-design/icons";
import "./index.scss";
const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);

const NewsDynamic = () => {
  const CradBox = ({ list, onClick }) => {
    return (
      <div onClick={onClick} className="first_box_card">
        <img className="box_card_img" alt="" src={list.url} />

        <div className="box_card_list">
          <div className="card_list_title">{list.title}</div>
          <div className="card_list_time">{list.time}</div>
        </div>
      </div>
    );
  };

  const CardNews = ({ list, backFun }) => {
    // console.log()

    return (
      <>
        <div className="news_dynamic_crad">
          <div className="news_dynamic_back">
            <LeftOutlined onClick={() => backFun()} />
          </div>
          <div
            className="dynamic_crad_html"
            dangerouslySetInnerHTML={{ __html: list.html }}
          />
        </div>
      </>
    );
  };

  const [state, setState] = useState(0);
  const [getNew, setNews] = useState(null);

  const changeState = (val) => {
    console.log("val", val);
    setState(val);
    let getNew = newsList[`news${val}`];
    console.log("getNew", getNew);
    setNews(getNew);
  };
  const backFun = () => {
    setState(0);
  };

  return (
    <div className="news_dynamic">
      <Suspense>
        <CustomCarousel urls={dynamicCenter.carouselList} />
      </Suspense>
      {state === 0 && (
        <div className="news_dynamic_first">
          <div className="dynamic_first_box">
            {dynamicCenter.list.map((item, index) => (
              <CradBox
                onClick={() => changeState(item.type)}
                list={item}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
      {state !== 0 && <CardNews backFun={backFun} list={getNew} />}
    </div>
  );
};

export default NewsDynamic;
