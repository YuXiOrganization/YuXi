import { useParams } from "react-router-dom";
import solutionSource from "@/assets/dataSource/solutionSource";
import "./index.scss";
import { Suspense, lazy } from "react";
const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);

const Solution = () => {
  const params = useParams();
  let id = params.id;
  // const getCardList = `cardList${id}`;

  // console.log("solutionSource", solutionSource.cardList1);

  const CardFirst = ({ list }) => {
    return (
      <div className="first_box_card">
        <img className="box_card_img" alt="" src={list.url} />
        <div className="box_card_title">{list.title}</div>
        <div className="box_card_text">{list.text}</div>
      </div>
    );
  };
  const CardSecond = ({ list }) => {
    return (
      <div className="second_box_card">
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
      </div>
    );
  };
  const getSolutionSource = solutionSource[`cardList${id}`];

  return (
    <div className="solution">
      <Suspense>
        <CustomCarousel urls={getSolutionSource.carouselList} />
      </Suspense>

      <div className="solution_first">
        <div className="solution_first_title">行业痛点</div>
        <div className="solution_first_box">
          {getSolutionSource.painPoints.map((item, index) => {
            return <CardFirst key={index} list={item} />;
          })}
        </div>
      </div>
      <div className="solution_second">
        <div className="solution_second_title">行业方案</div>
        <div className="solution_second_box">
          {getSolutionSource.programme.map((item, index) => {
            return <CardSecond key={index} list={item} />;
          })}
        </div>
      </div>

      {/* this is Solution{id} */}
    </div>
  );
};

export default Solution;
