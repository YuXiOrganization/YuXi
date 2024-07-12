import React, { useRef, forwardRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Affix } from "antd";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
// import "./transitions.css"; // 包含CSS动画效果
import "./index.scss";
const CustomAffix = forwardRef(({ offsetTop, children }, ref) => (
  <Affix offsetTop={offsetTop}>
    <div ref={ref}>{children}</div>
  </Affix>
));

const Home = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <div className="home_wrapper">
      <div className="main-container">
        <CustomAffix offsetTop={0}>
          <Header />
        </CustomAffix>
        <SwitchTransition mode="out-in" component={null}>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={{ enter: 500 }}
            nodeRef={nodeRef}
          >
            <div ref={nodeRef}>
              <Outlet />
              <Footer />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default Home;
