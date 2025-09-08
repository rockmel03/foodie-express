import React from "react";
import CategoryCard from "./CategoryCard";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

const CategoryListGrid = ({
  categories,
  openEditForm,
  handleDeleteCategory,
}) => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            openEditForm={openEditForm}
            handleDeleteCategory={handleDeleteCategory}
          />
        ))}
      </div>

      {categories.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No categories found matching your search.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CategoryListGrid;
