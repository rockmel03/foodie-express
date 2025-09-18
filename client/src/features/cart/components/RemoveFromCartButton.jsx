import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { removeFromCart } from "../cartThunks";

const RemoveFromCartButton = ({ foodId, className, children, ...props }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = async () => {
    const toastId = toast.loading("Removing from cart...");
    setLoading(true);
    try {
      await dispatch(removeFromCart({ foodId })).unwrap();
      toast.success("Removed from cart", { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleRemoveFromCart}
      {...props}
      className={
        className instanceof Function ? className({ loading }) : className
      }
      disabled={loading}
    >
      {children instanceof Function ? children({ loading }) : children}
    </div>
  );
};

export default RemoveFromCartButton;
