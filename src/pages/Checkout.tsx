import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import { Order } from '@/types';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, userType, clearCart, addOrder } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => {
    const price = userType === 'government' ? item.product.governmentPrice : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const order: Order = {
      id: `ORD-${Date.now()}`,
      customerId: `CUST-${Date.now()}`,
      customerName: formData.name,
      customerEmail: formData.email,
      userType,
      items: [...cart],
      total,
      status: 'pending',
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      trackingNumber: `TRK${Date.now().toString().slice(-8)}`,
    };

    addOrder(order);
    clearCart();
    
    toast.success('Order placed successfully!', {
      description: `Order ${order.id} has been placed. You can track it using order ID.`,
    });
    
    navigate(`/order-confirmation/${order.id}`);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        required
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  {cart.map((item) => {
                    const price = userType === 'government' 
                      ? item.product.governmentPrice 
                      : item.product.price;
                    return (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span>{item.product.name} x{item.quantity}</span>
                        <span>${(price * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Place Order
                </Button>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
