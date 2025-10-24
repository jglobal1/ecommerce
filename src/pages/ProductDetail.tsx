import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/products';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { userType, addToCart } = useStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const price = userType === 'government' ? product.governmentPrice : product.price;
  const discount = userType === 'government' 
    ? Math.round(((product.price - product.governmentPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success('Added to cart', {
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <Badge className="mb-4">{product.category}</Badge>
            
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold">${price.toFixed(2)}</span>
              {discount > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="destructive">
                    Save {discount}%
                  </Badge>
                </>
              )}
            </div>

            {userType === 'government' && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium">
                  🏛️ Government Pricing Applied - You save ${(product.price - product.governmentPrice).toFixed(2)} per unit
                </p>
              </div>
            )}

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">SKU</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Stock</span>
                <span className="font-medium">{product.stock} units available</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>✓ Secure checkout</p>
              <p>✓ Fast shipping with tracking</p>
              <p>✓ 30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
