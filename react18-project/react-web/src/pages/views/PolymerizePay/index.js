import {
  carouselDataSource,
  cardDataSource,
} from "@/assets/dataSource/polymerizePaySource";
import "./index.scss";
import { Suspense, lazy } from "react";
const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);

const CardBox = ({ abilityList }) => {
  // console.log("abilityList", abilityList);
  return (
    <div className="box_card_box">
      <img className="card_box_img" alt="" src={abilityList.url} />
      <div className="card_box_layout">
        <div className="box_layout_title">{abilityList.title}</div>
        {abilityList.text ? (
          <div className="box_layout_text">{abilityList.text}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const CardList = ({ list }) => {
  // console.log("list",list)
  return (
    <div
      className={`polymerize_pay_box ${
        list.type === "right" ? "pay_box_action" : ""
      }`}
    >
      <div
        className={`pay_box_card ${
          list.type === "right" ? "box_card_action" : ""
        }`}
      >
        <div className="box_card_title">{list.title}</div>
        {list.abilityList.map((item, index) => {
          return <CardBox key={index} abilityList={item} />;
        })}
      </div>
      <img className="pay_box_img" alt="" src={list.url} />
    </div>
  );
};

const PolymerizePay = () => {
  return (
    <div className="polymerize_pay">
      <Suspense fallback={"loading..."}>
        <CustomCarousel urls={carouselDataSource.urls}></CustomCarousel>
      </Suspense>

      {cardDataSource.list.map((item, index) => {
        return <CardList key={index} list={item} />;
      })}
    </div>
  );
};

export default PolymerizePay;
