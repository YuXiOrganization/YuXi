// ,createHashRouter #
import { createBrowserRouter } from "react-router-dom";

import Login from "../page/Login";
import App from "../App";
// import Board from "../page/Board";
import NotFound from "@/page/NotFound/NotFound";

import { Suspense, lazy } from "react";
const Board = lazy(() => import("@/page/Board"));

const router = createBrowserRouter([
  {
    path: "/login/:id",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        // path: "board",
        element: (
          <Suspense fallback={"loading..."}>
            <Board />
          </Suspense>
        ),
        // element: () => import("../page/Board"),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
