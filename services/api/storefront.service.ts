import { HttpService } from "@/services/base";
import { IPaginatedResponse } from "@/types/services/base";
import type {
	CreateStorefrontOrderRequest,
	CreateStorefrontOrderResponse,
	PublicStorefront,
	StorefrontProduct,
	StorefrontProductListResponse,
	StorefrontProductsQuery,
} from "@/types/services/storefront";

/**
 * StorefrontApiService wraps the anonymous/public storefront endpoints defined
 * in `public-storefront-endpoints.json`. Every method is typed to mirror the
 * contract of those endpoints so consuming components can rely on proper intellisense.
 */
export class StorefrontApiService extends HttpService {
	constructor() {
		super("/public/storefronts");
	}

	/**
	 * GET /public/storefronts/{slug}
	 */
	public getStorefront(slug: string) {
		return this.get<PublicStorefront>(slug);
	}

	/**
	 * GET /public/storefronts/{slug}/products
	 */
	public getStorefrontProducts(
		slug: string,
		query?: StorefrontProductsQuery
	) {
		return this.get<StorefrontProductListResponse>(`${slug}/products`, query);
	}

	/**
	 * GET /public/storefronts/{slug}/products/{productSlug}
	 */
	public getStorefrontProduct(slug: string, productSlug: string) {
		return this.get<StorefrontProduct>(`${slug}/products/${productSlug}`);
	}

	/**
	 * POST /public/storefronts/{slug}/orders
	 */
	public createOrder(slug: string, payload: CreateStorefrontOrderRequest) {
		return this.post<CreateStorefrontOrderResponse>(`${slug}/orders`, payload);
	}
}

export const storefrontApiService = new StorefrontApiService();
