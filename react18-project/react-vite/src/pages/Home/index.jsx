import React, { useRef, forwardRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";

import "./index.scss";

const Home = () => {
  // console.log("scene");
  return (
    <div className="home_wrapper">

      <div className="main-container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
