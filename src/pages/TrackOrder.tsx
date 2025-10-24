import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { OrderStatus } from '@/types';

const statusSteps: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'pending', label: 'Order Placed', icon: Clock },
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { status: 'processing', label: 'Processing', icon: Package },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [searchedOrderId, setSearchedOrderId] = useState('');
  const orders = useStore((state) => state.orders);

  const order = orders.find(o => o.id === searchedOrderId);

  useEffect(() => {
    if (searchParams.get('orderId')) {
      setSearchedOrderId(searchParams.get('orderId') || '');
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedOrderId(orderId);
  };

  const getStatusIndex = (status: OrderStatus) => {
    if (status === 'cancelled') return -1;
    return statusSteps.findIndex(step => step.status === status);
  };

  const currentStatusIndex = order ? getStatusIndex(order.status) : -1;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Track Your Order</h1>

        <Card className="p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              placeholder="Enter your order ID (e.g., ORD-1234567890)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Track Order</Button>
          </form>
        </Card>

        {searchedOrderId && !order && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No order found with ID: {searchedOrderId}</p>
          </Card>
        )}

        {order && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Order {order.id}</h2>
                  <p className="text-muted-foreground">
                    Placed on {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <Badge 
                  variant={order.status === 'delivered' ? 'default' : 'secondary'}
                  className="text-sm px-4 py-2"
                >
                  {order.status === 'cancelled' ? 'Cancelled' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              {order.status !== 'cancelled' && (
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                  
                  <div className="space-y-8">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;

                      return (
                        <div key={step.status} className="relative flex items-center gap-4">
                          <div 
                            className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                              isCompleted 
                                ? 'bg-primary border-primary text-primary-foreground' 
                                : 'bg-background border-border text-muted-foreground'
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <p className={`font-semibold ${isCurrent ? 'text-primary' : ''}`}>
                              {step.label}
                            </p>
                            {isCurrent && (
                              <p className="text-sm text-muted-foreground">
                                Current status
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {order.status === 'cancelled' && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-destructive font-medium">This order has been cancelled</p>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Order Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tracking Number</p>
                  <p className="font-medium">{order.trackingNumber || 'Not available yet'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Shipping Address</p>
                  <p className="font-medium">{order.shippingAddress}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Items</p>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span>{item.product.name} x{item.quantity}</span>
                        <span className="font-medium">
                          ${((order.userType === 'government' ? item.product.governmentPrice : item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
