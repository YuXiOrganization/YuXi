import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useRef } from "react";
import "./transitions.css"; // 包含CSS动画效果

const Home = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <div className="home_wrapper">
      <div className="main-container">
        <Header />
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={{ enter: 500, exit: 500 }}
            nodeRef={nodeRef}
          >
            <div ref={nodeRef}>
              <Outlet />
            </div>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
