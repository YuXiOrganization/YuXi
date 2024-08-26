import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import NotFound from "@/pages/NotFound/NotFound";
import "./loading-bar.css";

const Home = lazy(() => import("@/pages/Home"));
const HomePage = lazy(() => import("@/pages/views/HomePage"));
const CarSu7Demo = lazy(() => import("@/pages/views/demoList/CarSu7Demo"));
const DemoList = lazy(() => import("@/pages/views/demoList/DemoList"));

const router = createBrowserRouter([
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
        path: "/app1/demo/su7",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <CarSu7Demo />
          </Suspense>
        ),
      },
      {
        path: "/app1/demo",
        element: (
          <Suspense fallback={<div className="loading-bar" />}>
            <DemoList />
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
