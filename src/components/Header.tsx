import { Link } from 'react-router-dom';
import { ShoppingCart, User, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';

export function Header() {
  const cart = useStore((state) => state.cart);
  const userType = useStore((state) => state.userType);
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">CommercePro</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/track-order" className="text-sm font-medium hover:text-primary transition-colors">
            Track Order
          </Link>
          <Link to="/account" className="text-sm font-medium hover:text-primary transition-colors">
            Account
          </Link>
          <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
            Admin
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="text-xs text-muted-foreground hidden sm:block">
            Account Type: <span className="font-medium text-foreground capitalize">{userType}</span>
          </div>
          
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="destructive"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
