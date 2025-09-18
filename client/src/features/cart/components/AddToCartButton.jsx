import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../cartThunks";

const AddToCartButton = ({ foodId, className, children, ...props }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    const toastId = toast.loading("Adding to cart...");
    setLoading(true);
    try {
      await dispatch(addToCart({ foodId })).unwrap();
      toast.success("Added to cart", { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      {...props}
      onClick={handleAddToCart}
      className={
        className instanceof Function ? className({ loading }) : className
      }
      disabled={loading}
    >
      {children instanceof Function ? children({ loading }) : children}
    </div>
  );
};

export default AddToCartButton;
