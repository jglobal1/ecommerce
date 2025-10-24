import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/lib/store';
import { OrderStatus } from '@/types';
import { toast } from 'sonner';
import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

export default function Admin() {
  const orders = useStore((state) => state.orders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // In a real app, this would update the backend
    toast.success('Order status updated', {
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-2xl font-bold">{completedOrders}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

          {orders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-bold">{order.id}</p>
                        <Badge variant="outline">{order.userType}</Badge>
                        <Badge 
                          variant={
                            order.status === 'delivered' ? 'default' : 
                            order.status === 'cancelled' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName} • {order.customerEmail}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items • ${order.total.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrderId(order.id === selectedOrderId ? null : order.id)}
                      >
                        {order.id === selectedOrderId ? 'Hide Details' : 'View Details'}
                      </Button>
                    </div>
                  </div>

                  {selectedOrderId === order.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Items:</p>
                        <div className="space-y-1">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="text-sm flex justify-between">
                              <span>{item.product.name} x{item.quantity}</span>
                              <span className="font-medium">
                                ${((order.userType === 'government' ? item.product.governmentPrice : item.product.price) * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Shipping Address:</p>
                        <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Tracking Number:</p>
                        <p className="text-sm text-muted-foreground">{order.trackingNumber || 'Not assigned'}</p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
