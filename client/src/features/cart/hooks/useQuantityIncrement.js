import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../cartThunks";

const useQuantityIncrement = (itemId, initialQuantity) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const isFirstTime = useRef(true);

  useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      return;
    }

    const toastId = toast.loading("Adding to cart...");
    setLoading(true);
    const promise = dispatch(updateCartItem({ foodId: itemId, quantity }));
    promise
      .unwrap()
      .then(() => {
        toast.success("Updated cart item", { id: toastId });
      })
      .catch((error) => {
        if (error.name === "AbortError") return toast.dismiss(toastId);
        toast.error(error, { id: toastId });
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      toastId && toast.dismiss(toastId);
      promise?.abort();
    };
  }, [quantity]);

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => prev - 1);
  }, []);

  return { quantity, incrementQuantity, decrementQuantity, loading };
};

export default useQuantityIncrement;
