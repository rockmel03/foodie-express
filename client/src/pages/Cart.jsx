import React, { useState } from "react";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import OrderSummaryCard from "../features/cart/components/OrderSummaryCard";
import PromoCodeCard from "../features/cart/components/PromoCodeCard";
import DeliveryInformationCard from "../features/cart/components/DeliveryInformationCard";
import CartItemCard from "../features/cart/components/CartItemCard";

const CartPage = () => {
  // Mock cart items data
  const [cartItems, setCartItems] = useState([
    {
      _id: "food1",
      title: "Margherita Pizza",
      description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
      discount: 15,
      category: "cat1",
      image: {
        url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      },
      price: 12.99,
      quantity: 2,
    },
    {
      _id: "food2",
      title: "Beef Burger",
      description: "Juicy beef patty with lettuce, tomato, and special sauce",
      discount: 0,
      category: "cat2",
      image: {
        url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      },
      price: 9.99,
      quantity: 1,
    },
    {
      _id: "food3",
      title: "Chicken Ramen",
      description: "Rich chicken broth with noodles, egg, and vegetables",
      discount: 20,
      category: "cat3",
      image: {
        url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
      },
      price: 11.5,
      quantity: 1,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(
    "123 Main Street, New York, NY 10001"
  );

  const navigate = useNavigate();

  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
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
    const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
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
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ShoppingCart className="w-5 h-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, index) => {
                  const discountedPrice = calculateDiscountedPrice(
                    item.price,
                    item.discount
                  );
                  const itemTotal = discountedPrice * item.quantity;

                  return (
                    <CartItemCard
                      key={item._id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeItem={removeItem}
                      index={index}
                      discountedPrice={discountedPrice}
                      itemTotal={itemTotal}
                      cartItems={cartItems}
                    />
                  );
                })}
              </CardContent>
            </Card>

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
