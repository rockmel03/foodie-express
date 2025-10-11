import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { getOrderById } from "../features/order/orderThunks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle2,
  Phone,
  Truck,
} from "lucide-react";
import Loading from "../components/Loading";

const OrderDisplay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      dispatch(getOrderById(id))
        .unwrap()
        .then((res) => {
          console.log(res);
          setOrderData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [id, dispatch]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      confirmed: "bg-blue-100 text-blue-800 border-blue-300",
      preparing: "bg-purple-100 text-purple-800 border-purple-300",
      "out-for-delivery": "bg-orange-100 text-orange-800 border-orange-300",
      delivered: "bg-green-100 text-green-800 border-green-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getOrderSteps = (status) => {
    const steps = [
      { label: "Order Placed", status: "confirmed", icon: CheckCircle2 },
      { label: "Preparing", status: "preparing", icon: Package },
      { label: "Out for Delivery", status: "out-for-delivery", icon: Truck },
      { label: "Delivered", status: "delivered", icon: CheckCircle2 },
    ];

    const statusOrder = [
      "pending",
      "confirmed",
      "preparing",
      "out-for-delivery",
      "delivered",
    ];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const address = orderData.address?.[0];
  const steps = getOrderSteps(orderData.status);

  return (
    <div className="min-h-screen ">
      <div className="border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #{orderData._id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-gray-600 mt-1">
                Placed on {formatDate(orderData.createdAt)}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`${getStatusColor(
                orderData.status
              )} text-base px-4 py-2 w-fit capitalize`}
            >
              {orderData.status?.replace("-", " ")}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="flex justify-between">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center flex-1 relative"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              step.completed
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-400"
                            } transition-colors duration-300 z-10`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <p
                            className={`text-xs mt-2 text-center ${
                              step.completed
                                ? "text-gray-900 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {step.label}
                          </p>
                          {index < steps.length - 1 && (
                            <div
                              className={`absolute top-5 left-1/2 h-0.5 w-full ${
                                step.completed ? "bg-green-500" : "bg-gray-200"
                              }`}
                              style={{ transform: "translateY(-50%)" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items ({orderData.items?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items?.map((item, index) => (
                    <div key={item.foodId || index}>
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.food?.image?.url || "/placeholder.jpg"}
                            alt={item.food?.title || "Food item"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/80?text=Food";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.food?.title || "Item"}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.food?.description || ""}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {index < orderData.items.length - 1 && (
                        <div className="border-t my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      {address.addressLine}
                    </p>
                    {address.street && (
                      <p className="text-gray-600 text-sm mt-1">
                        {address.street}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm">
                      {address.city}, {address.state} {address.zipcode}
                    </p>
                    <p className="text-gray-600 text-sm">{address.country}</p>
                  </div>
                  <div className="border-t pt-3" />
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{address.phone}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {orderData.payment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium capitalize">
                      {orderData.payment.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <Badge
                      variant="outline"
                      className={
                        orderData.payment.status === "success"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {orderData.payment.status}
                    </Badge>
                  </div>
                  <div className="border-t pt-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment ID</span>
                    <span className="text-xs text-gray-500 font-mono">
                      {orderData.payment.razorpayPaymentId?.slice(-12) || "N/A"}
                    </span>
                  </div>
                  <div className="border-t pt-3" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(orderData.payment.amount)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono text-xs text-gray-900">
                    {orderData._id.slice(-12)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Date</span>
                  <span className="text-gray-900">
                    {formatDate(orderData.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-gray-900">
                    {formatDate(orderData.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDisplay;
