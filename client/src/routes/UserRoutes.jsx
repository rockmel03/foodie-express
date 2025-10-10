import React from "react";
import AppLayout from "../layout/AppLayout";
import RequireAuth from "../features/auth/components/RequireAuth";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import OrderDisplay from "../pages/OrderDisplay";

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
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/:id",
            element: <OrderDisplay />,
          },
        ],
      },
    ],
  },
];

export default UserRoutes;
