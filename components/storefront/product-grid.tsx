import type { ProductsLayout, StorefrontProduct } from "@/types/services/storefront";

import { ProductCard } from "./product-card";
import { ProductList } from "./product-list";
import { EmptyProductsState } from "./empty-products-state";

interface Props {
	products: StorefrontProduct[];
	storefrontSlug: string;
	layout?: ProductsLayout;
}

export function ProductGrid({
	products,
	storefrontSlug,
	layout = "grid",
}: Props) {
	const isList = layout === "list";

	if (!products.length) {
		return <EmptyProductsState storefrontSlug={storefrontSlug} />;
	}

	return (
		<section id="products" className="space-y-6">
			<div className="flex flex-col gap-2">
				<p className="text-sm uppercase tracking-[0.3em] text-(--store-text-muted)">
					products
				</p>
				<h2 className="text-2xl font-semibold text-(--store-text)">
					Freshly stocked for this week
				</h2>
			</div>
			{isList ? (
				<ProductList products={products} />
			) : (
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((product, index) => (
						<ProductCard
							key={product.id ?? product.slug}
							product={product}
							storefrontSlug={storefrontSlug}
							index={index}
						/>
					))}
				</div>
			)}
		</section>
	);
}
