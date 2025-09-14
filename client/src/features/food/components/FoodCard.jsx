import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
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

const FoodCard = ({ item, openEditForm, handleDeleteItem }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={item.image?.url}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300`;
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge variant={item.isAvailable ? "default" : "secondary"}>
            {item.isAvailable ? "Available" : "Out of Stock"}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge
            variant="outline"
            className="bg-black/50 text-white border-white/20"
          >
            {item.categoryName}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${item.price}
            </span>
            {/* <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>{item.cookingTime}min</span>
            <span>•</span>
            <span>{item.calories}cal</span>
          </div> */}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/foods/${item._id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => openEditForm(item)}
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
                      Are you sure you want to delete "{item.title}"? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
