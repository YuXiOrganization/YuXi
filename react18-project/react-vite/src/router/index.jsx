import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import NotFound from "@/pages/NotFound/NotFound";
import "./loading-bar.css";

// 懒加载页面组件
const Home = lazy(() => import("@/pages/Home"));
const HomePage = lazy(() => import("@/pages/views/HomePage"));
const CarSu7Demo = lazy(() => import("@/pages/views/demoList/CarSu7Demo"));
const DemoList = lazy(() => import("@/pages/views/demoList/DemoList"));

// 全局 Suspense 包裹
const router = createBrowserRouter([
  {
    path: "/app1",
    element: (
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Home />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/app1/demo/su7",
        element: (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <CarSu7Demo />
          </Suspense>
        ),
      },
      {
        path: "/app1/demo",
        element: (
          <Suspense fallback={<div className="loading">Loading...</div>}>
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
