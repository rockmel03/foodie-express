import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../cartThunks";

const useAddToCart = (foodId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (quantity = 1) => {
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
