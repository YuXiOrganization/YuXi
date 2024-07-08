import { Suspense, lazy } from "react";
import { aboutList } from "@/assets/dataSource/aboutUsSource";
import "./index.scss";
const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);


const AboutUs = () => {
  const CardList = ({ list }) => {
    return (
      <div className="us_first_card">
        <div className="first_card_title">{list.title}</div>
        <div className="first_card_line"></div>
        {list.texts.map((item, index) => (
          <div
            key={index}
            className={
              list.type === 1 ? "first_card_brief" : "first_card_contact"
            }
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="about_us">
      <Suspense>
        <CustomCarousel urls={aboutList.carouselList} />
      </Suspense>
      <div className="about_us_first">
        {aboutList.cardList.map((item, index) => (
          <CardList key={index} list={item} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
