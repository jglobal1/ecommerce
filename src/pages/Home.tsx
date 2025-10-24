import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, CreditCard, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { products } from '@/lib/products';
import heroBanner from '@/assets/hero-banner.jpg';
import categoryOffice from '@/assets/category-office.jpg';
import categoryTech from '@/assets/category-tech.jpg';
import categoryLighting from '@/assets/category-lighting.jpg';

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const categories = [
    { name: 'Office Equipment', image: categoryOffice, itemCount: 15 },
    { name: 'Technology', image: categoryTech, itemCount: 12 },
    { name: 'Lighting', image: categoryLighting, itemCount: 8 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Equipment for Your Business
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Quality office equipment and supplies with special government pricing. 
              Trusted by organizations nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/account">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Government Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Discover our most popular items</p>
            </div>
            <Link to="/products">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security for all transactions
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Free delivery on orders over $500
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Government Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Save up to 20% with institutional rates
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Top Quality</h3>
              <p className="text-sm text-muted-foreground">
                Premium products from trusted brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by 5,000+ Organizations
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join government agencies and businesses nationwide who trust CommercePro
            </p>
            <Link to="/account">
              <Button size="lg" variant="secondary">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
