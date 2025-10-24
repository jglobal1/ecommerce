import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const orders = useStore((state) => state.orders);
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. We've sent a confirmation email to {order.customerEmail}
          </p>

          <div className="bg-muted rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-bold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-bold">{order.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-bold">${order.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-bold capitalize">{order.status}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link to={`/track-order?orderId=${order.id}`}>
              <Button className="w-full" size="lg">
                <Package className="mr-2 h-5 w-5" />
                Track Your Order
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="w-full" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
