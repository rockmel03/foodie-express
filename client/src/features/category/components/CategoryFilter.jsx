import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../categoryThunks";
import toast from "react-hot-toast";

const CategoryFilter = () => {
  const { items: categories } = useSelector((state) => state.category);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCategories = categories.filter((category) => {
    return category.isActive;
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => {
      const newSelectedCategory =
        prev === category.title ? "all" : category.title;
      setSearchParams({ category: newSelectedCategory });
      return newSelectedCategory;
    });
  };

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category || "all");
  }, [searchParams]);

  useEffect(() => {
    const toastId = toast.loading("Loading categories...");
    const promise = dispatch(getAllCategories());
    promise
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
      promise.abort();
    };
  }, [dispatch]);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto p-2">
        {filteredCategories.map((category) => (
          <Card
            key={category._id}
            className={`min-w-[200px] cursor-pointer transition-all hover:shadow-md ${
              selectedCategory === category.title ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <img
                  src={category.image.url}
                  alt={category.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
