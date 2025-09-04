import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Eye, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Simulate loading orders
    const mockOrders = [
      {
        id: "ORD-001",
        customer: "John Doe",
        items: [
          { name: "Margherita Pizza", quantity: 1, price: 18.5 },
          { name: "Caesar Salad", quantity: 1, price: 10.0 },
        ],
        total: 28.5,
        status: "pending",
        createdAt: "2024-01-15T10:30:00Z",
        phone: "+1234567890",
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        items: [{ name: "Chicken Burger", quantity: 2, price: 15.8 }],
        total: 15.8,
        status: "completed",
        createdAt: "2024-01-15T10:15:00Z",
        phone: "+1234567891",
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson",
        items: [
          { name: "Spaghetti Carbonara", quantity: 1, price: 22.3 },
          { name: "Garlic Bread", quantity: 2, price: 10.0 },
          { name: "Tiramisu", quantity: 1, price: 10.0 },
        ],
        total: 42.3,
        status: "preparing",
        createdAt: "2024-01-15T10:00:00Z",
        phone: "+1234567892",
      },
      {
        id: "ORD-004",
        customer: "Sarah Wilson",
        items: [{ name: "Coffee", quantity: 1, price: 8.9 }],
        total: 8.9,
        status: "completed",
        createdAt: "2024-01-15T09:45:00Z",
        phone: "+1234567893",
      },
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, filterStatus]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "preparing":
        return "bg-info text-info-foreground";
      case "ready":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Orders
        </h2>
        <p className="text-muted-foreground">
          Manage and track all restaurant orders
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {order.customer} • {order.phone} •{" "}
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={getStatusColor(order.status)}
                    variant="secondary"
                  >
                    {order.status}
                  </Badge>
                  <span className="text-lg font-bold">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Order Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(order.id, value)
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">
              No orders found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orders;
