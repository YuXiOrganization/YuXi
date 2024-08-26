import React, { useEffect } from "react";
import { RouterProvider, useLocation } from "react-router-dom";
import router from "./router";

function App() {
  const location = useLocation();
  console.log("location:");

  useEffect(() => {
    console.log("路由切换到:", location.pathname);
  }, [location.pathname]);

  return <RouterProvider router={router} />;
}

function AppWrapper() {
  console.log("AppWrapper:");
  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );
}

export default AppWrapper;
