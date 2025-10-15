import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../cartThunks";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

const useAddToCart = (foodId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async (quantity = 1) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to cart");
      navigate("/login", { state: { from: location } });
      return;
    }
    const toastId = toast.loading("Adding to cart...");
    setLoading(true);
    try {
      await dispatch(addToCart({ foodId, quantity })).unwrap();
      toast.success("Added to cart", { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return { handleAddToCart, loading };
};

export default useAddToCart;
