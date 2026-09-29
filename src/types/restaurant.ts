export type MenuCategoryId = 'all' | 'pizza' | 'burger' | 'appetizer' | 'roll' | 'drinks';

export interface MenuCategory {
  id: MenuCategoryId;
  name: string;
  iconName: string;
}

export interface MenuItem {
  id: string;
  name: string;
  categoryId: 'pizza' | 'burger' | 'appetizer' | 'roll' | 'drinks';
  categoryName: string;
  description: string;
  price: number;
  priceDisplay: string;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  tags?: string[];
  sizesAvailable?: string[];
  sizePrices?: {
    small?: number;
    medium?: number;
    large?: number;
  };
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  specialInstructions?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  dealNumber?: number;
  tagline: string;
  description: string;
  itemsIncluded: string[];
  price: number;
  originalPrice: number;
  priceDisplay: string;
  originalPriceDisplay: string;
  savingsDisplay: string;
  badge: string;
  image: string;
  isWeekendSpecial?: boolean;
  timingNote?: string;
  dealOnlyPrice?: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  cityOrTag: string;
  rating: number;
  comment: string;
  favoriteDish: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface RestaurantInfo {
  name: string;
  branch: string;
  proprietor?: string;
  tagline: string;
  taglineUrdu?: string;
  address: string;
  addressUrdu?: string;
  phone: string;
  secondaryPhone?: string;
  orderHotline: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  currencySymbol: string;
  deliveryTimeEstimate: string;
  minimumOrder: number;
  deliveryFee: number;
  paymentMethods: string[];
  socials: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

export interface OrderSubmission {
  orderId: string;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  deliveryNotes?: string;
  paymentMethod: 'cod' | 'pickup' | 'jazzcash' | 'easypaisa';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  timestamp: string;
}
