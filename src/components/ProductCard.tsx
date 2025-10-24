import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { userType, addToCart } = useStore();
  const price = userType === 'government' ? product.governmentPrice : product.price;
  const discount = userType === 'government' 
    ? Math.round(((product.price - product.governmentPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success('Added to cart', {
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">${price.toFixed(2)}</span>
          {discount > 0 && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
              <Badge variant="destructive" className="text-xs">
                -{discount}%
              </Badge>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
