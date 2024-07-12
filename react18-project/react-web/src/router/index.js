import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "../pages/Login";
import NotFound from "@/pages/NotFound/NotFound";
import "./loading-bar.css";

const Home = lazy(() => import("@/pages/Home/Home"));
const HomePage = lazy(() => import("@/pages/views/HomePage/HomePage"));
const PolymerizePay = lazy(() => import("@/pages/views/PolymerizePay/index"));
const Solution = lazy(() => import("@/pages/views/Solution/index"));
const AboutUs = lazy(() => import("@/pages/views/AboutUs/AboutUs/index"));
const NewsDynamic = lazy(() =>
  import("@/pages/views/AboutUs/NewsDynamic/index")
);

const router = createBrowserRouter([
  {
    path: "/app1/login/:id",
    element: <Login />,
  },
  {
    path: "/app1",
    element: (
      <Suspense fallback={<div className="loading-bar" />}>
        <Home />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/app1/PolymerizePay",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <PolymerizePay />
          </Suspense>
        ),
      },
      {
        path: "/app1/Solution/:id",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <Solution />
          </Suspense>
        ),
      },
      {
        path: "/app1/AboutUs",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/app1/NewsDynamic",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <NewsDynamic />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
