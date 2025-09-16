import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useSearchParams } from "react-router";

const CategoryFilter = () => {
  const { items: categories } = useSelector((state) => state.category);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );

  const filteredCategories = categories.filter((category) => {
    return category.isActive;
  });

  useEffect(() => {
    if (selectedCategory === "all") {
      setSearchParams({ category: "all" });
    } else {
      setSearchParams({ category: selectedCategory.title });
    }
  }, [setSearchParams, selectedCategory]);

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
              selectedCategory._id === category._id
                ? "ring-2 ring-blue-500"
                : ""
            }`}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev._id === category._id ? "all" : category
              )
            }
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
