import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  image: string;
  itemCount: number;
}

export function CategoryCard({ name, image, itemCount }: CategoryCardProps) {
  return (
    <Link to="/products">
      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center">
            {itemCount} Products
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
      </Card>
    </Link>
  );
}
