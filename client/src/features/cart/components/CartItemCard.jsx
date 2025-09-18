import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useQuantityIncrement from "../hooks/useQuantityIncrement";

const CartItemCard = ({
  item,
  removeItem,
  index,
  discountedPrice,
  itemTotal,
  cartItems,
}) => {
  const { quantity, incrementQuantity, decrementQuantity, loading } =
    useQuantityIncrement(item._id, item.quantity);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={item.image.url}
          alt={item.title}
          className="w-full sm:w-20 h-32 sm:h-20 rounded-lg object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0 space-y-3 sm:space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item._id)}
              className="text-gray-400 hover:text-red-500 p-1 h-8 w-8 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-green-600 text-lg">
                ${discountedPrice.toFixed(2)}
              </span>
              {item.discount > 0 && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    ${item.price.toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {item.discount}% OFF
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end">
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || loading}
                  className="w-8 h-8 p-0 hover:bg-white"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementQuantity}
                  disabled={loading}
                  className="w-8 h-8 p-0 hover:bg-white"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              <div className="text-right ml-4 sm:ml-6">
                <div className="text-xs text-gray-600">Total</div>
                <div className="font-semibold text-lg">
                  ${itemTotal.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {index < cartItems.length - 1 && <Separator className="mt-4" />}
    </div>
  );
};

export default CartItemCard;
