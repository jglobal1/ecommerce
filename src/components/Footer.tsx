import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-muted mt-16 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">CommercePro</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Professional equipment for businesses and government organizations nationwide.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>1-800-COMMERCE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@commercepro.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary">
                  Office Equipment
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary">
                  Furniture
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/track-order" className="text-muted-foreground hover:text-primary">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-muted-foreground hover:text-primary">
                  Account Settings
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 johnson oluwafemi adedokun. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
