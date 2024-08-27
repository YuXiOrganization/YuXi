import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "@/utils/nprogress";
import { useDispatch } from "react-redux";
import { setDefaultOpenKeys } from "@/store/modules/appStore";

const RouteProgress = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const startProgress = useCallback(() => {
    NProgress.start();
  }, []);

  const stopProgress = useCallback(() => {
    NProgress.done();
    dispatch(setDefaultOpenKeys(location.pathname));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    startProgress();

    stopProgress(); // 直接调用停止进度条
  }, [location.pathname, startProgress, stopProgress]);

  return null;
};

export default RouteProgress;
