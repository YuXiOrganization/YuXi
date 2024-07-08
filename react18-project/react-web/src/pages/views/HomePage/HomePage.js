import {
  carouselDataSource,
  firstDataSource,
  thirdDataSource,
  fourthDataSource,
  fifthDataSource,
} from "@/assets/dataSource/dataSource";
import "./index.scss";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
// import CustomCarousel from "@/components/customView/CustomCarousel";
const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);

const FeatureFirst = lazy(() => import("@/pages/views/HomePage/FeatureFirst"));
const FeaturSecond = lazy(() => import("@/pages/views/HomePage/FeatureSecond"));
const FeatureThird = lazy(() => import("@/pages/views/HomePage/FeatureThird"));
const FeatureFourth = lazy(() =>
  import("@/pages/views/HomePage/FeatureFourth")
);
const FeatureFifth = lazy(() => import("@/pages/views/HomePage/FeatureFifth"));

const HomePage = () => {
  // console.log("thirdDataSource", thirdDataSource);
  const getApp = useSelector((state) => state.app);
  return (
    <div className="home_page">
      <Suspense fallback={"loading..."}>
        <CustomCarousel urls={carouselDataSource.urls}></CustomCarousel>
        <FeatureFirst getApp={getApp} cardList={firstDataSource.cardList}></FeatureFirst>
        <FeaturSecond getApp={getApp}></FeaturSecond>
        <FeatureThird
          getApp={getApp}
          cardList={thirdDataSource.cardList}
        ></FeatureThird>
        <FeatureFourth
          getApp={getApp}
          cardList={fourthDataSource.cardList}
        ></FeatureFourth>
        <FeatureFifth
           getApp={getApp}
          newsImg={fifthDataSource.newsImg}
          cardList={fifthDataSource.cardList}
        ></FeatureFifth>
      </Suspense>
    </div>
  );
};

export default HomePage;
