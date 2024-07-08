import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

import NotFound from "@/pages/NotFound/NotFound";
import { Suspense, lazy } from "react";
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
    element: <Home />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/app1/PolymerizePay",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <PolymerizePay />
          </Suspense>
        ),
      },

      {
        index: true,
        path: "/app1/Solution/:id",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <Solution />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/app1/AboutUs",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        index: true,
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
