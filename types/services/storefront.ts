import type { IPaginatedResponse, IParams } from "@/types/services/base";

export type ProductsLayout = "grid" | "list";

export interface StorefrontThemePalette {
  background?: string;
  surface?: string;
  surfaceMuted?: string;
  accent?: string;
  accentSoft?: string;
  text?: string;
  textMuted?: string;
  border?: string;
}

export interface StorefrontThemeConfig {
  primaryColor?: string;
  layout?: ProductsLayout;
  palette?: StorefrontThemePalette;
  [key: string]: unknown;
}

export interface Category {
	id: number;
	key: string;
	name_en: string;
	name_ar: string;
	suggested_sub_categories: { name_en: string; name_ar: string }[];
}

export interface StorefrontCategory {
	id: number;
	storefrontId: number;
	primaryCategoryId: number;
	primaryCategory: Category;
	secondaryCategoryId?: number;
	secondaryCategory?: Category;
}

export interface SubCategory {
	id: number;
	storefrontId: number;
	categoryId: number;
	category: Category;
	name: string;
	is_custom: boolean;
}

export interface PublicStorefront {
	id: number;
	slug: string;
	name: string;
	description?: string;
	logo_url?: string;
	cover_image_url?: string;
	theme_config?: StorefrontThemeConfig;
	tracking_config?: Record<string, string | undefined>;
	seo?: {
		title?: string;
		description?: string;
		image?: string;
	};
	storefrontCategory?: StorefrontCategory;
	subCategories?: SubCategory[];
	[key: string]: unknown;
}

export interface StorefrontProduct {
	id: number;
	slug: string;
	name: string;
	description?: string;
	main_image?: string;
	images?: string[];
	price?: number;
	currency?: string;
	sku?: string;
	stock?: number;
	[key: string]: unknown;
}

export interface StorefrontProductsQuery extends IParams {
  page?: number;
  limit?: number;
  keyword?: string;
}

export type StorefrontProductListResponse = IPaginatedResponse<StorefrontProduct>;

export interface StorefrontOrderItem {
  productId: number;
  quantity: number;
}

export interface CreateStorefrontOrderRequest {
  buyer_name: string;
  buyer_phone: string;
  buyer_email?: string;
  shipping_address_line1: string;
  shipping_address_line2?: string;
  shipping_city: string;
  shipping_state?: string;
  shipping_postal_code?: string;
  notes?: string;
  items: StorefrontOrderItem[];
}

export interface CreateStorefrontOrderResponse {
  order_id: string;
  status?: string;
  message?: string;
  [key: string]: unknown;
}

export interface CreateCustomOrderRequest {
	buyer_name: string;
	buyer_phone: string;
	description: string;
	budget?: number;
	images?: string[];
}
