import React, { useState } from "react";
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
import { useSelector } from "react-redux";

const FoodFileters = () => {
  const categories = useSelector((state) => state.category.items);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Searchbar onSearch={() => {}} placeholder="Search food items..." />
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
                <SelectItem key={category._id} value={category._id.toString()}>
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
