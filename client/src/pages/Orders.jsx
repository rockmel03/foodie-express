import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../features/order/orderThunks";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  MapPin,
  CreditCard,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Loading from "../components/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllOrders())
      .unwrap()
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setIsLoading(false);
      });
  }, [dispatch]);

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

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <Loading />
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Package className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 text-center">
                When you place orders, they will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order._id} to={`${order._id}`} className="block">
                <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-1">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(order.status)} capitalize`}
                      >
                        {order.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {order.items.length} Item
                          {order.items.length > 1 ? "s" : ""}
                        </p>
                        <div className="text-sm text-gray-600">
                          {order.items.map((item, idx) => (
                            <div key={item._id}>
                              {item.quantity}x Item (
                              {formatCurrency(item.price)})
                              {idx < order.items.length - 1 && ", "}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>

                    {order.address && order.address[0] && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">
                            Delivery Address
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.address[0].addressLine}
                            {order.address[0].street &&
                              `, ${order.address[0].street}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.address[0].city}, {order.address[0].state}{" "}
                            {order.address[0].zipcode}
                          </p>
                        </div>
                      </div>
                    )}

                    {order.payment && (
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">
                            Payment
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-600 capitalize">
                              {order.payment.paymentMethod}
                            </p>
                            <Badge
                              variant="outline"
                              className={
                                order.payment.status === "success"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                              }
                            >
                              {order.payment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end pt-2 border-t">
                      <span className="text-sm font-medium text-blue-600 flex items-center">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
