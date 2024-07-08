import React from "react";
import ReactDOM from "react-dom/client";

import store from "./store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import RouteProgress from "./router/RouteProgress";
import "./assets/styles/overallSituation.scss";
import ResizeHandler from "./utils/ResizeHandler";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ResizeHandler/>
      <RouterProvider router={router}>
        <RouteProgress></RouteProgress>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
