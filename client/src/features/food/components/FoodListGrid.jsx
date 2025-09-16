import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart, UtensilsCrossed } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FoodCard from "./FoodCard";
import toast from "react-hot-toast";
import { getAllFoods } from "../foodThunk";
import { useDispatch } from "react-redux";

const FoodListGrid = ({ foods = [], openEditForm, handleDeleteItem }) => {
  const { items: categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "Unknown";
  };

  const handleFoodClick = (food) => {
    // Navigate to food details page (mock implementation)
    alert(`Navigating to details page for: ${food.title}`);
  };

  const handleAddToCart = (food) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === food._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  useEffect(() => {
    const toastId = toast.loading("Loading foods...");
    const promise = dispatch(getAllFoods());
    promise
      .unwrap()
      .then(() => {
        toast.success("Foods loaded successfully", { id: toastId });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        toast.error(err, { id: toastId });
      });

    return () => {
      toast.dismiss(toastId);
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      {cart.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items in
                cart
              </span>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              View Cart
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {foods.map((food) => {
          const discountedPrice = calculateDiscountedPrice(
            food.price,
            food.discount
          );

          return (
            <FoodCard
              key={food._id}
              food={food}
              getCategoryTitle={getCategoryTitle}
              discountedPrice={discountedPrice}
              handleAddToCart={handleAddToCart}
              handleFoodClick={handleFoodClick}
              handleDeleteItem={handleDeleteItem}
              openEditForm={openEditForm}
            />
          );
        })}
      </div>

      {foods?.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UtensilsCrossed className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No food items found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default FoodListGrid;
