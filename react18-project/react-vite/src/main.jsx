import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import store from "./store"; // 确保正确导入 store

import "./assets/styles/overallSituation.scss";
import ResizeHandler from "./utils/ResizeHandler";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ResizeHandler />
      <App></App>
    </Provider>
  </React.StrictMode>
);
