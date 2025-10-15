import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "../components/Container";
import CategoryFilter from "../features/category/components/CategoryFilter";
import { Link, useSearchParams } from "react-router";
import FoodListGrid from "../features/food/components/FoodListGrid";
import { useSelector } from "react-redux";

const FoodPage = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const searchInputRef = useRef(null);

  const { items: foods } = useSelector((state) => state.food);
  const { items: categories } = useSelector((state) => state.category);
  const { items: cart } = useSelector((state) => state.cart);

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return foods
      .filter(
        (food) =>
          food.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          food.isActive
      )
      .slice(0, 5)
      .map((food) => food.title);
  }, [searchQuery]);

  // Filtered foods
  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch =
        food.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || food.category?.title === selectedCategory;
      return matchesSearch && matchesCategory && food.isActive;
    });
  }, [searchQuery, selectedCategory, foods]);

  const getCategoryTitle = (catgoryName) => {
    const category = categories.find((cat) => cat.title === catgoryName);
    return category ? category.title : "Unknown";
  };

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <div className="min-h-screen p-4">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Food Delivery
          </h1>
          <p className="text-gray-600">
            Discover delicious food from your favorite restaurants
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              ref={searchInputRef}
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full text-lg"
            />
          </div>

          {/* Search Suggestions */}
          {searchSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  onClick={() => setSearchQuery(suggestion)}
                >
                  <div className="flex items-center">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Cart Summary */}
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
              <Link to="/cart">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Food List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === "all"
              ? "All Foods"
              : `${getCategoryTitle(selectedCategory)} Menu`}
          </h2>

          <FoodListGrid foods={filteredFoods} />
        </div>

        {/* Results Summary */}
        <div className="text-center text-gray-500 mt-8">
          Showing {filteredFoods.length} of{" "}
          {foods.filter((f) => f.isActive).length} available items
        </div>
      </Container>
    </div>
  );
};

export default FoodPage;
