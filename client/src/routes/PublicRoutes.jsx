import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AppLayout from "../layout/AppLayout";
import About from "../pages/About";
import FoodPage from "../pages/FoodPage";

const PublicRoutes = [
  {
    path: "",
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
      {
        path: "foods",
        element: <FoodPage />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
];

export default PublicRoutes;
