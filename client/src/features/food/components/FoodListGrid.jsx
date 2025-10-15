import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { UtensilsCrossed } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { getAllFoods } from "../foodThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading.jsx";

const FoodCard = React.lazy(() => import("./FoodCard"));

const FoodListGrid = ({ foods = [], openEditForm, handleDeleteItem }) => {
  const { items: categories } = useSelector((state) => state.category);
  const { isLoading: foodsLoading } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "Unknown";
  };

  const handleFoodClick = (food) => {
    // Navigate to food details page (mock implementation)
    navigate(`/foods/${food._id}`);
  };

  const featchFoods = useCallback(() => {
    const promise = dispatch(getAllFoods({ page, limit: 10 }));
    promise
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.status) {
          const { totalPages, currentPage } = res.data;
          if (!totalPages || !currentPage) return;
          if (totalPages > currentPage) {
            setHasMore(true);
            setPage((prev) => prev + 1);
          } else if (totalPages <= currentPage) {
            setHasMore(false);
          }
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        toast.error(err);
      });

    return promise;
  }, [dispatch, page]);

  useEffect(() => {
    if (foods.length > 0) return;
    const promise = featchFoods();
    return () => {
      promise?.abort();
    };
  }, [featchFoods]);

  return (
    <>
      <InfiniteScroll
        dataLength={foods.length}
        next={featchFoods}
        hasMore={hasMore}
        loader={
          <div className="w-full h-46">
            <Loading />
          </div>
        }
        endMessage={
          <div className="mt-10">
            <p className="text-center opacity-50">
              <b>Yay! You have seen it all</b>
            </p>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => {
            const discountedPrice = calculateDiscountedPrice(
              food.price,
              food.discount
            );

            return (
              <Suspense fallback={<Loading />}>
                <FoodCard
                  key={food._id}
                  food={food}
                  getCategoryTitle={getCategoryTitle}
                  discountedPrice={discountedPrice}
                  handleFoodClick={handleFoodClick}
                  handleDeleteItem={handleDeleteItem}
                  openEditForm={openEditForm}
                />
              </Suspense>
            );
          })}
        </div>
      </InfiniteScroll>

      {foods.length === 0 && !foodsLoading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UtensilsCrossed className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No food items found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default FoodListGrid;
