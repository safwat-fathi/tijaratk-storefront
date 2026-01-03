import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { formatCurrency } from "@/lib/utils/currency";
import type { StorefrontProduct } from "@/types/services/storefront";

import { isProductNew } from "@/lib/utils/date";

interface ProductCardProps {
	product: StorefrontProduct;
	storefrontSlug: string;
	index: number;
	locale: string;
	searchParams?: Record<string, string>;
}

export function ProductCard({
	product,
	storefrontSlug,
	index,
	locale,
	searchParams,
}: ProductCardProps) {
	const t = useTranslations("Storefront.ProductCard");
	// Use main_image if available, otherwise use first image from images array
	const cover = product.main_image || product.images?.[0];
	const priceLabel = formatCurrency(product.price, product.currency, locale);
	const isNew = isProductNew(product.updated_at || product.created_at);

	return (
		<Link
			href={{
				pathname: `/${storefrontSlug}/products/${product.slug}`,
				query: searchParams,
			}}
			className="block"
			prefetch
		>
			<article
				className="group flex flex-col overflow-hidden rounded-3xl border border-(--store-border) bg-(--store-surface) p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
				style={{ animationDelay: `${index * 60}ms` }}
			>
				<div className="relative aspect-square overflow-hidden rounded-2xl bg-(--store-surface-muted)">
					{isNew && (
						<span className="absolute top-4 left-4 w-fit inline-flex items-center rounded-full bg-(--store-accent) px-2.5 py-0.5 text-xs font-medium text-(--store-surface)">
							{t("new")}
						</span>
					)}
					{cover ? (
						<Image
							src={cover}
							alt={product.name}
							fill
							sizes="(max-width: 768px) 100vw, 33vw"
							className="object-cover transition duration-700 group-hover:scale-105"
						/>
					) : (
						<div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-(--store-text-muted)">
							{t("imageComingSoon")}
						</div>
					)}
					<div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" />
				</div>

				<div className="mt-4 flex flex-1 flex-col">
					<div className="flex items-start justify-between gap-4">
						<h3 className="text-base font-medium text-(--store-text)">
							{product.name}
						</h3>
						{priceLabel ? (
							<span className="text-sm font-semibold text-(--store-text)">
								{priceLabel}
							</span>
						) : null}
					</div>
					{product.description ? (
						<p className="mt-2 text-sm text-(--store-text-muted) line-clamp-2">
							{product.description}
						</p>
					) : null}
				</div>
			</article>
		</Link>
	);
}
