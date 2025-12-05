export interface PublicOrderProduct {
  id?: number;
  name?: string;
  price?: number;
}

export interface PublicOrderItem {
  id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: PublicOrderProduct;
}

export interface PublicOrder {
  id: number;
  status: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_email?: string;
  shipping_city: string;
  shipping_state?: string;
  shipping_postal_code?: string;
  total_amount: number;
  created_at: string;
  storefront: {
    id: number;
    name: string;
    slug: string;
  };
  items: PublicOrderItem[];
}
