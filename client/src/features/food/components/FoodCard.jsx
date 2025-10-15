import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Star, Plus, Loader2 } from "lucide-react";
import { Link } from "react-router";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSelector } from "react-redux";
import AddToCartButton from "../../cart/components/AddToCartButton";

const FoodCard = ({
  food,
  getCategoryTitle = () => "",
  discountedPrice = 0,
  openEditForm = () => {
    alert("Edit form");
  },
  handleDeleteItem = () => {
    alert("Delete item");
  },
  handleFoodClick = () => {
    alert("Food clicked");
  },
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Card
      key={food._id}
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div onClick={() => handleFoodClick(food)} className="relative">
        <img
          src={food.image.url}
          alt={food.title}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {food.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {food.discount}% OFF
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-white/90 text-gray-700"
        >
          {getCategoryTitle(food.category?._id)}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle
            className="text-lg hover:text-blue-600 cursor-pointer"
            onClick={() => handleFoodClick(food)}
          >
            {food.title}
          </CardTitle>
          {food.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm text-gray-600">{food.rating}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-sm">
          {food.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-green-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {food.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${food.price.toFixed(2)}
              </span>
            )}
          </div>
          {user?.role !== "admin" && (
            <AddToCartButton foodId={food._id}>
              {({ loading }) => (
                <Button
                  size="sm"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {!loading ? (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </>
                  ) : (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  )}
                </Button>
              )}
            </AddToCartButton>
          )}

          {user?.role === "admin" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/foods/${food._id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditForm(food)}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Food Item</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{food.title}"? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteItem(food._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(FoodCard);
