import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";

import PersistLogin from "../features/auth/components/PersistLogin";
import RequireAuth from "../features/auth/components/RequireAuth";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PersistLogin />,
      children: [
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

        // public routes
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
