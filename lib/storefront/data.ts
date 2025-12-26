import type { Metadata } from "next";
import { cache } from "react";

import { storefrontApiService } from "@/services/api/storefront.service";
import type {
  PublicStorefront,
  StorefrontProduct,
} from "@/types/services/storefront";

import {
  resolveThemeFromStorefront,
  type StorefrontThemeTokens,
} from "./theme";

export interface StorefrontProductsMeta {
	page?: number;
	limit?: number;
	total?: number;
	last_page?: number;
}

const DEFAULT_PRODUCTS_LIMIT = 9;

interface StorefrontProductsPageResult {
	items: StorefrontProduct[];
	meta?: StorefrontProductsMeta;
}

export interface StorefrontHomeData {
	storefront: PublicStorefront;
	products: StorefrontProduct[];
	productsMeta?: StorefrontProductsMeta;
	theme: StorefrontThemeTokens;
	layout: "grid" | "list";
}

export const getStorefront = cache(async (slug: string) => {
	const response = await storefrontApiService.getStorefront(slug);

	if (!response.success || !response.data) {
		return null;
	}

	return response.data;
});

const fetchStorefront = getStorefront;

const fetchStorefrontProductsPage = cache(
	async (slug: string, page = 1, limit = DEFAULT_PRODUCTS_LIMIT) => {
		const response = await storefrontApiService.getStorefrontProducts(slug, {
			page,
			limit,
		});

		if (!response.success || !response.data) {
			console.warn(
				"Failed to load storefront products",
				response.message,
			);
			return null;
		}

		return response.data;
	},
);

export async function getStorefrontProductsPage(
	slug: string,
	options?: { page?: number; limit?: number },
): Promise<StorefrontProductsPageResult | null> {
	const { page = 1, limit = DEFAULT_PRODUCTS_LIMIT } = options ?? {};
	const response = await fetchStorefrontProductsPage(slug, page, limit);

	if (!response) {
		return null;
	}

	return {
		items: response.items ?? [],
		meta: {
			page: response.page ?? page,
			limit: response.limit ?? limit,
			total: response.total,
			last_page: response.last_page,
		},
	};
}

export async function getStorefrontHomeData(
	slug: string,
	options?: { page?: number; limit?: number },
): Promise<StorefrontHomeData | null> {
	const { page = 1, limit = DEFAULT_PRODUCTS_LIMIT } = options ?? {};
	const storefrontPromise = fetchStorefront(slug);
	const productsPromise = getStorefrontProductsPage(slug, { page, limit });

  const storefront = await storefrontPromise;
  
  if (!storefront) {
    return null;
  }

	const products = await productsPromise;

	const layout = storefront.theme_config?.layout === "list" ? "list" : "grid";

	const productsMeta = products?.meta;

	return {
		storefront,
		products: products?.items ?? [],
		productsMeta,
		theme: resolveThemeFromStorefront(storefront),
		layout,
	};
}

export async function getStorefrontSeoMetadata(
  slug: string,
): Promise<Metadata | null> {
  const storefront = await fetchStorefront(slug);

  if (!storefront) {
    return null;
  }

  return {
    title: storefront.seo?.title || storefront.name,
    description:
      storefront.seo?.description ||
      storefront.description ||
      "Discover the latest drops from Tijaratk storefronts.",
    openGraph: {
      title: storefront.seo?.title || storefront.name,
      description:
        storefront.seo?.description ||
        storefront.description ||
        "Shop curated products powered by Tijaratk.",
      images: storefront.seo?.image
        ? [{ url: storefront.seo.image }]
        : storefront.cover_image_url
          ? [{ url: storefront.cover_image_url }]
          : undefined,
    },
  } satisfies Metadata;
}
