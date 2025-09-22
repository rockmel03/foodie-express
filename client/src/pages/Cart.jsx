import React, { useEffect, useState } from "react";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import OrderSummaryCard from "../features/cart/components/OrderSummaryCard";
import PromoCodeCard from "../features/cart/components/PromoCodeCard";
import DeliveryInformationCard from "../features/cart/components/DeliveryInformationCard";
import CartItemCard from "../features/cart/components/CartItemCard";
import CartItemsList from "../features/cart/components/CartItemsList";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart } from "../features/cart/cartThunks";
import toast from "react-hot-toast";

const CartPage = () => {
  const { items: cartItems } = useSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(
    "123 Main Street, New York, NY 10001"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const clearCart = () => {
    dispatch(deleteCart());
  };

  const applyPromoCode = () => {
    const validPromoCodes = {
      SAVE10: { discount: 10, description: "10% off your order" },
      FIRST20: { discount: 20, description: "20% off for new customers" },
      DELIVERY5: { discount: 5, description: "$5 off delivery" },
    };

    if (validPromoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...validPromoCodes[promoCode.toUpperCase()],
      });
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const discountedPrice = calculateDiscountedPrice(
      item.food.price,
      item.food.discount
    );
    return sum + discountedPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 25 ? 0 : 2.99;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === "DELIVERY5") {
      promoDiscount = Math.min(5, deliveryFee);
    } else {
      promoDiscount = subtotal * (appliedPromo.discount / 100);
    }
  }

  const total = subtotal + deliveryFee + tax - promoDiscount;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Proceeding to checkout...");
  };

  const goBackToMenu = () => {
    navigate(-1);
  };

  useEffect(() => {
    const toastId = toast.loading("Loading cart items...");

    const promise = dispatch(getCart());
    promise
      .unwrap()
      .then(() => {
        toast.success("Cart items loaded successfully", {
          id: toastId,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          toast.dismiss(toastId);
          return;
        }

        toast.error("Failed to load cart items", {
          id: toastId,
        });
      });

    return () => {
      promise?.abort?.();
    };
  }, [dispatch]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBackToMenu}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Back to Menu</span>
              <span className="xs:hidden">Back</span>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Your Cart
            </h1>
          </div>

          {/* Empty Cart */}
          <Card className="text-center py-12 sm:py-16">
            <CardContent className="px-4">
              <ShoppingCart className="w-16 sm:w-24 h-16 sm:h-24 mx-auto text-gray-300 mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
                Add some delicious food items to get started!
              </p>
              <Button
                onClick={goBackToMenu}
                className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
              >
                Browse Menu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBackToMenu}
              className="flex items-center gap-2 self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Back to Menu</span>
              <span className="xs:hidden">Back</span>
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Your Cart
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {cartItems.length} items in your cart
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Clear Cart</span>
            <span className="sm:hidden">Clear</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-4">
            <CartItemsList />

            {/* Delivery Information */}
            <DeliveryInformationCard
              deliveryAddress={deliveryAddress}
              setDeliveryAddress={setDeliveryAddress}
            />
          </div>

          {/* Order Summary - Sticky on larger screens */}
          <div className="space-y-4 xl:sticky xl:top-4 xl:self-start">
            {/* Promo Code */}
            <PromoCodeCard
              appliedPromo={appliedPromo}
              removePromoCode={removePromoCode}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              applyPromoCode={applyPromoCode}
            />

            {/* Order Summary */}
            <OrderSummaryCard
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              appliedPromo={appliedPromo}
              promoDiscount={promoDiscount}
              total={total}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
