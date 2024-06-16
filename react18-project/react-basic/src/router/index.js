import Login from "../page/Login";
import App from "../App";
import Board from "../page/Board";
import NotFound from "@/page/NotFound/NotFound";

// ,createHashRouter #
import { createBrowserRouter } from "react-router-dom";

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
        element: <Board />,
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
