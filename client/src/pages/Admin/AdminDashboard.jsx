import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  UtensilsCrossed, 
  FolderOpen, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalFood: 0,
    totalCategories: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0
  });

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalOrders: 156,
      totalFood: 48,
      totalCategories: 8,
      pendingOrders: 12,
      completedOrders: 134,
      cancelledOrders: 10
    });
  }, []);

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', items: 3, total: '$28.50', status: 'pending', time: '10:30 AM' },
    { id: 'ORD-002', customer: 'Jane Smith', items: 2, total: '$15.80', status: 'completed', time: '10:15 AM' },
    { id: 'ORD-003', customer: 'Mike Johnson', items: 5, total: '$42.30', status: 'preparing', time: '10:00 AM' },
    { id: 'ORD-004', customer: 'Sarah Wilson', items: 1, total: '$8.90', status: 'completed', time: '9:45 AM' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'preparing': return 'bg-info text-info-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock;
      case 'preparing': return UtensilsCrossed;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at your restaurant today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3" /> +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food Items</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalFood}</div>
            <p className="text-xs text-muted-foreground">
              Across {stats.totalCategories} categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Active menu categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <StatusIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id} - {order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.items} items • {order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{order.total}</span>
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;