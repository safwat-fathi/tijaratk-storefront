import Image from "next/image";

import { formatCurrency } from "@/lib/utils/currency";
import type { StorefrontProduct } from "@/types/services/storefront";

interface ProductCardProps {
  product: StorefrontProduct;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const cover = product.images?.[0];
  const priceLabel = formatCurrency(product.price, product.currency);

  return (
		<article
			className="group flex flex-col overflow-hidden rounded-3xl border border-(--store-border) bg-(--store-surface) p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
			style={{ animationDelay: `${index * 60}ms` }}
		>
			<div className="relative aspect-square overflow-hidden rounded-2xl bg-(--store-surface-muted)">
				<span className="absolute top-4 left-4 w-fit inline-flex items-center rounded-full bg-(--store-accent) px-2.5 py-0.5 text-xs font-medium text-(--store-surface)">
					Badge
				</span>
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
						Image coming soon
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
					<p className="mt-2 text-sm text-(--store-text-muted)">
						{product.description}
					</p>
				) : null}

				<button
					type="button"
					className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-(--store-border) px-4 py-2 text-sm font-medium text-(--store-text) transition hover:border-(--store-accent) hover:text-(--store-accent) cursor-pointer"
				>
					View Details
					<span aria-hidden>→</span>
				</button>
			</div>
		</article>
	);
}
