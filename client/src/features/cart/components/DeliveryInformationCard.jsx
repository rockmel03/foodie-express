import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Clock } from "lucide-react";

const DeliveryInformationCard = ({ deliveryAddress, setDeliveryAddress }) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MapPin className="w-5 h-5" />
          Delivery Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Address
          </label>
          <Input
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter your delivery address"
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>Estimated delivery time: 25-35 minutes</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryInformationCard;
