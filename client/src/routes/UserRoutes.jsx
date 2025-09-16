import React from "react";
import AppLayout from "../layout/AppLayout";
import RequireAuth from "../features/auth/components/RequireAuth";
import Cart from "../pages/Cart";

const UserRoutes = [
  {
    element: <AppLayout />,
    children: [
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
