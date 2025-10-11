import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AppLayout from "../layout/AppLayout";
import About from "../pages/About";
import FoodPage from "../pages/FoodPage";
import FoodDetails from "../pages/FoodDetails";

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
      {
        path: "foods/:id",
        element: <FoodDetails />,
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
