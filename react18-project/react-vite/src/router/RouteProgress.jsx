import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteProgress = () => {
  console.log("RouteChangeHandler rendered"); // 确认组件被渲染

  const location = useLocation();

  useEffect(() => {
    console.log("路由切换到:", location.pathname);
  }, [location]);

  return <div>1111</div>;
};

export default RouteProgress;
