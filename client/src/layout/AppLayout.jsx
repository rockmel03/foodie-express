import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
