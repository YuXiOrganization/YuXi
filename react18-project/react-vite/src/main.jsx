import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import store from "./store"; // 确保正确导入 store
import router from "./router";
import "./assets/styles/overallSituation.scss";
// import "./index.css";
import ResizeHandler from "./utils/ResizeHandler";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ResizeHandler />
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
