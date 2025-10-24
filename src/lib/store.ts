import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, UserType, Order } from '@/types';

interface StoreState {
  userType: UserType;
  setUserType: (type: UserType) => void;
  
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      userType: 'individual',
      setUserType: (type) => set({ userType: type }),
      
      cart: [],
      addToCart: (product, quantity) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
      },
      
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      orders: [],
      addOrder: (order) => {
        set({ orders: [order, ...get().orders] });
      },
    }),
    {
      name: 'ecommerce-store',
    }
  )
);
