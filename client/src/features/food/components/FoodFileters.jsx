import React, { useEffect, useState } from "react";
import Searchbar from "../../../components/Searchbar";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllCategories } from "../../category/categoryThunks";
import { useSearchParams } from "react-router";

const FoodFileters = () => {
  const categories = useSelector((state) => state.category.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  let timeOut;
  const handleSearchChange = (query) => {
    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
      setSearchQuery(query);
    }, 300);
  };

  useEffect(() => {
    searchParams.set("search", searchQuery);
    searchParams.set("category", filterCategory);
    searchParams.set("availability", filterAvailability);
    setSearchParams(searchParams);
  }, [
    searchQuery,
    filterCategory,
    filterAvailability,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (categories.length > 0) return;
    const toastId = toast.loading("Loading categories...");
    const categoryPromise = dispatch(getAllCategories());
    categoryPromise
      .unwrap()
      .then(() => {
        toast.success("Categories loaded successfully", { id: toastId });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        toast.error(err, { id: toastId });
      });

    return () => {
      toast.dismiss(toastId);
      categoryPromise?.abort?.();
    };
  }, [categories.length, dispatch]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Searchbar
              onSearch={handleSearchChange}
              placeholder="Search food items..."
            />
          </div>

          <Select
            value={[filterCategory]}
            onValueChange={setFilterCategory}
            defaultValue="all"
          >
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterAvailability}
            onValueChange={setFilterAvailability}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodFileters;
