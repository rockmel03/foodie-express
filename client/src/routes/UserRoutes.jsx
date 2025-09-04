import React from "react";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import RequireAuth from "../features/auth/components/RequireAuth";
import Cart from "../pages/Cart";

const UserRoutes = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      // protected routes for user
      {
        element: <RequireAuth roles={["user"]} />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
];

export default UserRoutes;
