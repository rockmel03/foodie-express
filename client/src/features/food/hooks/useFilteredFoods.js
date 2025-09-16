import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

const useFilteredFoods = () => {
  const { items: foods, isLoading, error } = useSelector((state) => state.food);
  const [filteredFoods, setFilteredFoods] = useState([]);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const filterCategory = searchParams.get("category");
  const filterAvailability = searchParams.get("available") === "true";

  useEffect(() => {
    let filtered = foods;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category?.title === filterCategory
      );
    }

    if (filterAvailability !== "all") {
      filtered = filtered.filter((item) =>
        filterAvailability === "available"
          ? item.isAvailable
          : !item.isAvailable
      );
    }

    setFilteredFoods(filtered);
  }, [foods, searchTerm, filterCategory, filterAvailability]);



  return { filteredFoods, isLoading, error };
};

export default useFilteredFoods;
