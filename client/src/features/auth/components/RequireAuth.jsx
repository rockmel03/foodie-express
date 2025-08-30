import React from "react";
import { useAuth } from "../authSlice";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = ({ roles = [] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    roles.length === 0 || roles.includes(user.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
