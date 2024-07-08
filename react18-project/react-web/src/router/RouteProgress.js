
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "@/utils/nprogress";

const RouteProgress = () => {
  const location = useLocation();
  console.log("路由切换", location);
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, [location]);

  return null;
};

export default RouteProgress;
