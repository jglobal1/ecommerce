import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, userType } = useStore();

  const subtotal = cart.reduce((sum, item) => {
    const price = userType === 'government' ? item.product.governmentPrice : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const price = userType === 'government' 
                ? item.product.governmentPrice 
                : item.product.price;

              return (
                <Card key={item.product.id} className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        SKU: {item.product.sku}
                      </p>
                      <p className="font-bold">${price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div>
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              {userType === 'government' && (
                <div className="bg-primary/10 border border-primary/20 rounded p-3 mb-4 text-sm">
                  🏛️ Government pricing applied
                </div>
              )}

              <Link to="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
