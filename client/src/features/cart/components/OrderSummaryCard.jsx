import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const OrderSummaryCard = ({
  subtotal,
  deliveryFee,
  tax,
  appliedPromo,
  promoDiscount,
  total,
  handleCheckout,
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Delivery Fee</span>
              {subtotal > 25 && (
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  FREE
                </Badge>
              )}
            </div>
            <span className="font-medium">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          {appliedPromo && (
            <div className="flex justify-between items-center text-green-600">
              <span className="text-sm">
                Promo Discount ({appliedPromo.code})
              </span>
              <span className="font-medium">-${promoDiscount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {subtotal < 25 && (
          <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
            💡 Add ${(25 - subtotal).toFixed(2)} more for free delivery!
          </div>
        )}

        <Button
          onClick={handleCheckout}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-medium"
          size="lg"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          <span className="hidden xs:inline">Proceed to Checkout</span>
          <span className="xs:hidden">Checkout</span>
        </Button>

        <div className="text-xs text-gray-500 text-center leading-relaxed">
          By placing your order, you agree to our Terms of Service and Privacy
          Policy
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
