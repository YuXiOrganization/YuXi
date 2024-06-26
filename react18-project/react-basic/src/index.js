import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import {  RouterProvider } from "react-router-dom";
import router from "./router";

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <App/>
//   },
//   {
//     path: "/",
//     element: <div>this is article</div>,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
