import { Outlet } from "react-router-dom";
import Header from "./Header";
import RouteProgress from "../../router/RouteProgress";
import "./index.scss";

const Home = () => {
  return (
    <div className="home_wrapper">
      <RouteProgress />
      <div className="main-container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
