import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import CartItemCard from "./CartItemCard";
import { deleteCartItem } from "../cartThunks";
import toast from "react-hot-toast";

const CartItemsList = () => {
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const removeItem = (id) => {
    const toastId = toast.loading("Removing item...");
    dispatch(deleteCartItem(id))
      .unwrap()
      .then(() => {
        toast.success("Item removed successfully", {
          id: toastId,
        });
      })
      .catch(() => {
        toast.error("Failed to remove item", {
          id: toastId,
        });
      });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <ShoppingCart className="w-5 h-5" />
          Order Items
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems?.map((item, index) => {
          const food = { ...item.food, quantity: item.quantity };
          const discountedPrice = calculateDiscountedPrice(
            food.price,
            food.discount
          );
          const itemTotal = discountedPrice * food.quantity;

          return (
            <CartItemCard
              index={index}
              key={food._id}
              item={food}
              removeItem={removeItem}
              discountedPrice={discountedPrice}
              itemTotal={itemTotal}
              cartItems={cartItems}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CartItemsList;
