import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllFoods } from "../foodThunk";
import toast from "react-hot-toast";
import FoodCard from "./FoodCard";

const FoodItemsGrid = ({ filteredItems, openEditForm, handleDeleteItem }) => {
  const dispatch = useDispatch();

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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredItems?.map((item) => (
        <FoodCard key={item._id} item={item} openEditForm={openEditForm} handleDeleteItem={handleDeleteItem} />
      ))}
    </div>
  );
};

export default FoodItemsGrid;
