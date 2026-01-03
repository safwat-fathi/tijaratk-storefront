import { ProductGrid, StorefrontPagination } from "@/components/storefront";
import {
	getStorefrontProductsPage,
	StorefrontProductsMeta,
} from "@/lib/storefront/data";
import type {
	ProductsLayout,
	StorefrontProduct,
} from "@/types/services/storefront";

interface StorefrontProductsSectionProps {
	slug: string;
	layout: ProductsLayout;
	page: number;
	initialProducts?: StorefrontProduct[];
	initialMeta?: StorefrontProductsMeta;
  locale: string;
}

export async function StorefrontProductsSection({
	slug,
	layout,
	page,
	initialProducts,
	initialMeta,
  locale
}: StorefrontProductsSectionProps) {
	const shouldUseInitial = initialMeta?.page === page && initialProducts;
	const pageResult = shouldUseInitial
		? { items: initialProducts ?? [], meta: initialMeta }
		: await getStorefrontProductsPage(slug, { page });

	const products = pageResult?.items ?? [];
	const meta = pageResult?.meta;

	return (
		<section className="space-y-8">
			<ProductGrid products={products} storefrontSlug={slug} layout={layout} locale={locale} />
			{meta ? <StorefrontPagination meta={meta} initialPage={page} /> : null}
		</section>
	);
}
