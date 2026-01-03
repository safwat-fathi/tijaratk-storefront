import Image from "next/image";
import { useTranslations } from "next-intl";

import { formatCurrency } from "@/lib/utils/currency";
import type { StorefrontProduct } from "@/types/services/storefront";

interface ProductListProps {
	products: StorefrontProduct[];
	locale: string;
	searchParams?: Record<string, string>;
}

export function ProductList({
	products,
	locale,
	searchParams,
}: ProductListProps) {
	return (
		<div className="flex flex-col gap-4">
			{products.map(product => (
				<ProductListItem
					key={product.id ?? product.slug}
					product={product}
					locale={locale}
					searchParams={searchParams}
				/>
			))}
		</div>
	);
}

function ProductListItem({
	product,
	locale,
	searchParams,
}: {
	product: StorefrontProduct;
	locale: string;
	searchParams?: Record<string, string>;
}) {
	const t = useTranslations("Storefront.ProductCard");
	const cover = product.images?.[0];
	const priceLabel = formatCurrency(product.price, product.currency, locale);

	return (
		<article className="flex flex-col gap-4 rounded-3xl border border-(--store-border) bg-(--store-surface) p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg md:flex-row md:items-center">
			<div className="relative h-36 w-full overflow-hidden rounded-2xl bg-(--store-surface-muted) md:h-32 md:w-32">
				{cover ? (
					<Image
						src={cover}
						alt={product.name}
						fill
						sizes="128px"
						className="object-cover"
					/>
				) : (
					<div className="p-1 flex w-full text-center h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-color:var(--store-text-muted)">
						{t("imageComingSoon")}
					</div>
				)}
			</div>
			<div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
				<div className="flex-1 space-y-1">
					<p className="text-base font-medium text-(--store-text)">
						{product.name}
					</p>
					{product.description ? (
						<p className="text-sm text-(--store-text-muted)">
							{product.description}
						</p>
					) : null}
					{priceLabel ? (
						<span className="text-sm font-semibold text-(--store-text)">
							{priceLabel}
						</span>
					) : null}
				</div>

				<div className="flex flex-col h-full justify-between gap-10">
					<span className="self-end w-fit inline-flex items-center rounded-full bg-(--store-accent) px-2.5 py-0.5 text-xs font-medium text-(--store-surface)">
						{t("badge")}
					</span>
					<button
						type="button"
						className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--store-border) px-4 py-2 text-sm font-medium text-(--store-text) transition hover:border-(--store-accent) hover:text-(--store-accent) cursor-pointer"
					>
						{t("viewDetails")}
						<span aria-hidden>→</span>
					</button>
				</div>
			</div>
		</article>
	);
}
