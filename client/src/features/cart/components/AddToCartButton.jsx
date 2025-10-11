import React from "react";
import useAddToCart from "../hooks/useAddToCart";

const AddToCartButton = ({ foodId, className, children, ...props }) => {
  const { handleAddToCart, loading } = useAddToCart(foodId);

  return (
    <div
      {...props}
      onClick={() => handleAddToCart()}
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
