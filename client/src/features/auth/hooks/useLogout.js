import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../authThunks";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async function logout() {
    const toastId = toast.loading("Logging out...");
    try {
      await dispatch(logoutUser()).unwrap();
      localStorage.removeItem("isLoggedIn");
      navigate("/login");

      toast.success("Logout successful", { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    }
  };
};

export default useLogout;
