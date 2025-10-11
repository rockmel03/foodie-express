import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart, UtensilsCrossed } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import FoodCard from "./FoodCard";
import toast from "react-hot-toast";
import { getAllFoods } from "../foodThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading.jsx";

const FoodListGrid = ({ foods = [], openEditForm, handleDeleteItem }) => {
  const { items: categories } = useSelector((state) => state.category);
  const { isLoading: foodsLoading } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "Unknown";
  };

  const handleFoodClick = (food) => {
    // Navigate to food details page (mock implementation)
    navigate(`/foods/${food._id}`);
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

  if (foodsLoading) {
    return <Loading />;
  }

  return (
    <>
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
              handleFoodClick={handleFoodClick}
              handleDeleteItem={handleDeleteItem}
              openEditForm={openEditForm}
            />
          );
        })}
      </div>
      {foods.length === 0 && (
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
