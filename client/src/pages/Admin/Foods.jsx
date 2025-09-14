import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router";
import FoodForm from "@/features/food/components/FoodForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import toast from "react-hot-toast";
import FoodItemsGrid from "../../features/food/components/FoodItemsGrid";
import FoodFileters from "../../features/food/components/FoodFileters";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewFood,
  deleteFood,
  updateFood,
} from "../../features/food/foodThunk";

const Foods = () => {
  const foodItems = useSelector((state) => state.food.items);

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let filtered = foodItems;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.categoryId === parseInt(filterCategory)
      );
    }

    if (filterAvailability !== "all") {
      filtered = filtered.filter((item) =>
        filterAvailability === "available"
          ? item.isAvailable
          : !item.isAvailable
      );
    }

    setFilteredItems(filtered);
  }, [foodItems, searchTerm, filterCategory, filterAvailability]);

  const handleCreateItem = async (itemData) => {
    const toastId = toast.loading("Creating food item...");

    try {
      const res = await dispatch(createNewFood(itemData)).unwrap();
      toast.success(res.data?.message || "Food item created successfully!", {
        id: toastId,
      });
      setIsFormOpen(false);
    } catch (error) {
      toast.error(error, { id: toastId });
    }
  };

  const handleUpdateItem = async (itemData) => {
    const toastId = toast.loading("Updating food item...");

    try {
      const res = await dispatch(
        updateFood([editingItem._id, itemData])
      ).unwrap();
      toast.success(res.data?.message || "Food item updated successfully!", {
        id: toastId,
      });
      setEditingItem(null);
      setIsFormOpen(false);
    } catch (error) {
      toast.error(error, { id: toastId });
    }
  };

  const handleDeleteItem = async (itemId) => {
    const toastId = toast.loading("Deleting food item...");

    try {
      const res = await dispatch(deleteFood(itemId)).unwrap();
      toast.success(res.data?.message || "Food item deleted successfully!", {
        id: toastId,
      });
      setIsFormOpen(false);
    } catch (error) {
      toast.error(error, { id: toastId });
    }
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Food Items
          </h2>
          <p className="text-muted-foreground">
            Manage your restaurant's menu items
          </p>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Food Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Food Item" : "Create New Food Item"}
              </DialogTitle>
            </DialogHeader>
            <FoodForm
              initialData={editingItem}
              onSubmit={editingItem ? handleUpdateItem : handleCreateItem}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <FoodFileters />

      {/* Food Items Grid */}
      <FoodItemsGrid
        filteredItems={filteredItems}
        openEditForm={openEditForm}
        handleDeleteItem={handleDeleteItem}
      />

      {filteredItems?.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UtensilsCrossed className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No food items found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Foods;
