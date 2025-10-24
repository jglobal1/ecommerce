export type UserType = 'individual' | 'government';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  governmentPrice: number;
  category: string;
  image: string;
  stock: number;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  userType: UserType;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}
