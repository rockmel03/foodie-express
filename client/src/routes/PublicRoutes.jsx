import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

const PublicRoutes = [
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
