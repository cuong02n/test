import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import User from "./pages/User";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      errorElement: <AppLayout props={<ErrorPage />} />,
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/user/:id",
          element: <User username={"cuong2905say"} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/problem/:contest/:index",
          element: <Solutions />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ],
  {
    basename: "/codeforces-explorer",
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
