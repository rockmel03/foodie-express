import React from "react";
import RequireAuth from "../features/auth/components/RequireAuth";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Orders from "../pages/Admin/Orders";
import Foods from "../pages/Admin/Foods";
import Categories from "../pages/Admin/Categories";
import Users from "../pages/Admin/Users";

const AdminRoutes = [
  {
    element: <RequireAuth roles={["admin"]} />,
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard?",
            element: <AdminDashboard />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "foods",
            element: <Foods />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
];

export default AdminRoutes;
