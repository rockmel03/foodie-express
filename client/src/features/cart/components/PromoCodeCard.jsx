import React from "react";
import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PromoCodeCard = ({
  appliedPromo,
  removePromoCode,
  promoCode,
  setPromoCode,
  applyPromoCode,
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Promo Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appliedPromo ? (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-green-800">
                {appliedPromo.code}
              </div>
              <div className="text-sm text-green-600 truncate">
                {appliedPromo.description}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removePromoCode}
              className="text-green-600 hover:text-green-700 ml-2 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={applyPromoCode}
              variant="outline"
              disabled={!promoCode.trim()}
              className="w-full sm:w-auto"
            >
              Apply
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromoCodeCard;
