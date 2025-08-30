import React, { useEffect, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useAuth } from "../authSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { refreshAuthToken } from "../authThunks";

const PersistLogin = () => {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [persist] = useLocalStorage("persist", false);
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated || !isLoggedIn || !persist) return setLoading(false);

    dispatch(refreshAuthToken())
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [isAuthenticated, isLoggedIn, persist, dispatch]);

  return loading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
