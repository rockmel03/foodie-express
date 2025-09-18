import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useDebounceCallback from "@/hooks/useDebounceCallback";
import {  } from "../cartThunks";

const useQuantityIncrement = (itemId, initialQuantity) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => prev - 1);
  };

  const debouncedQuantity = useDebounceCallback(() => {
    setLoading(true);
    const toastId = toast.loading("Adding to cart...");
    try {

      // Todo update quantitiy in database
      // dispatch(addToCart({ foodId: itemId, quantity })).unwrap();
      toast.success("Added to cart", { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  }, 1000);

  useEffect(() => {
    debouncedQuantity();
  }, [quantity, debouncedQuantity]);

  return { quantity, incrementQuantity, decrementQuantity, loading };
};

export default useQuantityIncrement;
