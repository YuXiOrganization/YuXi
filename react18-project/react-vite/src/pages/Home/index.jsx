
import { Outlet } from "react-router-dom";
import Header from "./Header";
import RouteProgress from "../../router/RouteProgress";
import "./index.scss";
// function RouteChangeLogger() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   console.log("RouteChangeLogger ready");
//   useEffect(() => {
//     dispatch(setDefaultOpenKeys(location.pathname));
//     // console.log("路由切换到:", location.pathname);
//   }, [location]);

//   return null; // This component doesn't render anything
// }
const Home = () => {
  // console.log("scene");
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
