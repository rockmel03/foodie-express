import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import FoodForm from "@/features/food/components/FoodForm";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createNewFood,
  deleteFood,
  updateFood,
} from "../../features/food/foodThunk";
import FoodFileters from "../../features/food/components/FoodFileters";
import FoodListGrid from "../../features/food/components/FoodListGrid";
import useFilteredFoods from "../../features/food/hooks/useFilteredFoods";

const Foods = () => {
  const dispatch = useDispatch();
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { filteredFoods } = useFilteredFoods();

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
      <FoodListGrid
        foods={filteredFoods}
        openEditForm={openEditForm}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default Foods;
