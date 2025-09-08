import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../features/category/categoryThunks";
import { useSelector } from "react-redux";
import CategoryListGrid from "../../features/category/components/CategoryListGrid";
import SearchCategory from "../../features/category/components/SearchCategory";
import CategoryForm from "../../features/category/components/CategoryForm";

const Categories = () => {
  const { items: categories } = useSelector((state) => state.category);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const toastId = toast.loading("Loading categories...");

    const promise = dispatch(getAllCategories());
    promise
      .unwrap()
      .then(() => {
        toast.success("Categories loaded successfully", { id: toastId });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        toast.error(error, { id: toastId });
      });

    return () => {
      toast.dismiss(toastId);

      // abort previous request
      promise.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const handleCreateCategory = (categoryData) => {
    const toastId = toast.loading("Creating category...");
    dispatch(createNewCategory(categoryData))
      .unwrap()
      .then(() => {
        setIsFormOpen(false);
        toast.success("Category created successfully", { id: toastId });
      })
      .catch((error) => {
        toast.error(error, { id: toastId });
      })
      .finally(() => {
        setIsFormOpen(false);
      });
  };

  const handleUpdateCategory = (categoryData) => {
    // todo: handle update category
    console.log(categoryData);

    const toastId = toast.loading("Updating category...");
    dispatch(updateCategory([editingCategory._id, categoryData]))
      .unwrap()
      .then(() => {
        setIsFormOpen(false);
        toast.success("Category updated successfully", { id: toastId });
      })
      .catch((error) => {
        toast.error(error, { id: toastId });
      })
      .finally(() => {
        setIsFormOpen(false);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    // todo: hanlde delete category
    console.log(categoryId);

    const toastId = toast.loading("Deleting category...");
    dispatch(deleteCategory(categoryId))
      .unwrap()
      .then(() => {
        toast.success("Category deleted successfully", { id: toastId });
      })
      .catch((error) => {
        toast.error(error, { id: toastId });
      });
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Categories
          </h2>
          <p className="text-muted-foreground">
            Organize your menu items into categories
          </p>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Create New Category"}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              initialData={editingCategory}
              onSubmit={
                editingCategory ? handleUpdateCategory : handleCreateCategory
              }
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <SearchCategory onSearch={setSearchTerm} />

      {/* Categories Grid */}
      <CategoryListGrid
        categories={filteredCategories}
        openEditForm={openEditForm}
        handleDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};

export default Categories;
