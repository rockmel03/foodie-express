import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import PersistLogin from "../features/auth/components/PersistLogin";
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  const router = createBrowserRouter([
    // public routes
    ...PublicRoutes,
    {
      path: "/",
      element: <PersistLogin />,
      children: [
        // user routes
        ...UserRoutes,
        // admin routes
        ...AdminRoutes,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
