import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getFoodById } from "../features/food/foodThunk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Clock,
  Star,
  Heart,
} from "lucide-react";
import useAddToCart from "../features/cart/hooks/useAddToCart";
import Loading from "../components/Loading";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: foods } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  const selectedFood = foods.find((food) => food._id === id) || null;

  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!selectedFood) {
      setLoading(true);
      dispatch(getFoodById(id))
        .unwrap()
        .then((res) => {
          setFoodData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch food details:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setFoodData(selectedFood);
    }
  }, [dispatch, id, selectedFood]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const calculateDiscountedPrice = () => {
    if (foodData.discount > 0) {
      return foodData.price - (foodData.price * foodData.discount) / 100;
    }
    return foodData.price;
  };

  const { handleAddToCart, loading: addToCartLoading } = useAddToCart(
    foodData?._id
  );

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!foodData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Food not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice();
  const totalPrice = discountedPrice * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              <img
                src={foodData.image?.url || "https://via.placeholder.com/600"}
                alt={foodData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600?text=Food+Image";
                }}
              />
              <button
                onClick={toggleFavorite}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                } shadow-lg`}
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              {foodData.discount > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white text-sm px-3 py-1 border-red-500">
                    {foodData.discount}% OFF
                  </Badge>
                </div>
              )}
              {!foodData.isActive && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Badge className="bg-red-600 text-white text-lg px-4 py-2 border-red-600">
                    Currently Unavailable
                  </Badge>
                </div>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Preparation Time
                </h3>
                <p className="text-gray-600">15-20 minutes</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {foodData.title}
                </h1>
                <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-lg">
                  <Star className="w-5 h-5 fill-green-600 text-green-600" />
                  <span className="font-semibold text-green-800">4.5</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {foodData.description}
              </p>
            </div>

            <div className="border-t border-b py-4">
              <div className="flex items-baseline gap-3 flex-wrap">
                {foodData.discount > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">
                      {formatCurrency(discountedPrice)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatCurrency(foodData.price)}
                    </span>
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      Save {formatCurrency(foodData.price - discountedPrice)}
                    </Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatCurrency(foodData.price)}
                  </span>
                )}
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    About this item
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      Fresh ingredients
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      Prepared on order
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      Served hot
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="sticky bottom-0 bg-white border-t lg:border-t-0 lg:relative p-4 lg:p-0 -mx-4 lg:mx-0 shadow-lg lg:shadow-none">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(quantity)}
                  disabled={!foodData.isActive || addToCartLoading}
                  className="w-full h-14 text-lg font-semibold bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {foodData.isActive ? "Add to Cart" : "Currently Unavailable"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-gray-600">JD</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        John Doe
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Absolutely delicious! The quality and taste exceeded my
                      expectations. Will definitely order again.
                    </p>
                    <p className="text-gray-400 text-xs mt-2">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
