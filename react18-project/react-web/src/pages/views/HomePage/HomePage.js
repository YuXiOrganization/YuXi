import {
  carouselDataSource,
  firstDataSource,
  thirdDataSource,
  fourthDataSource,
  fifthDataSource,
} from "@/assets/dataSource/dataSource";
import "./index.scss";
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const CustomCarousel = lazy(() =>
  import("@/components/customView/CustomCarousel")
);

const features = [
  {
    component: lazy(() => import("@/pages/views/HomePage/FeatureFirst")),
    dataSource: firstDataSource,
    key: "first",
  },
  {
    component: lazy(() => import("@/pages/views/HomePage/FeatureSecond")),
    dataSource: null,
    key: "second",
  },
  {
    component: lazy(() => import("@/pages/views/HomePage/FeatureThird")),
    dataSource: thirdDataSource,
    key: "third",
  },
  {
    component: lazy(() => import("@/pages/views/HomePage/FeatureFourth")),
    dataSource: fourthDataSource,
    key: "fourth",
  },
  {
    component: lazy(() => import("@/pages/views/HomePage/FeatureFifth")),
    dataSource: fifthDataSource,
    key: "fifth",
  },
];

const HomePage = () => {
  const getApp = useSelector((state) => state.app);
  const [loaded, setLoaded] = useState({});
  const refs = useRef(features.map(() => React.createRef()));

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = refs.current.findIndex(
            (ref) => ref.current === entry.target
          );
          if (index !== -1) {
            setLoaded((prev) => ({ ...prev, [features[index].key]: true }));
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    const currentRefs = refs.current;
    currentRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="home_page">
      <Suspense fallback={"loading..."}>
        <CustomCarousel urls={carouselDataSource.urls}></CustomCarousel>
        {features.map((feature, index) => {
          const FeatureComponent = feature.component;
          return (
            <div key={feature.key} ref={refs.current[index]}>
              {loaded[feature.key] && (
                <FeatureComponent
                  getApp={getApp}
                  {...(feature.dataSource ? { ...feature.dataSource } : {})}
                />
              )}
            </div>
          );
        })}
      </Suspense>
    </div>
  );
};

export default HomePage;
