import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { formatCurrency } from "@/lib/utils/currency";
import type {
	PublicStorefront,
	StoreThemeConfig,
} from "@/types/services/storefront";

// Dummy data reused/consistent with designer
const DUMMY_PRODUCT = {
	id: 1,
	slug: "product-1",
	name: "Product 1",
	description:
		"Hand-picked item with exemplary craftsmanship. This is a longer description to show how text wraps and looks in the details view. It includes multiple sentences to demonstrate the typography and spacing of the product page.",
	price: 20,
	currency: "EGP",
	images: [],
	stock: 10,
};

const DUMMY_STORE: PublicStorefront = {
	id: 0,
	name: "Tijaratk Studio",
	slug: "tijaratk-studio",
	description: "Preview Storefront",
};

interface ProductDetailsPreviewProps {
	productSlug: string;
	themeConfig?: StoreThemeConfig;
	locale: string;
	searchParams?: Record<string, string>;
}

export function ProductDetailsPreview({
	productSlug,
	themeConfig,
	locale,
	searchParams,
}: ProductDetailsPreviewProps) {
	const t = useTranslations("Storefront");
	const product = {
		...DUMMY_PRODUCT,
		slug: productSlug,
		name: `Product ${productSlug.split("-")[1] || "Detail"}`,
		description: t("Product.dummyDescription"),
	};

	

	// Resolve theme tokens if needed, but StorefrontThemeProvider takes 'theme' which is tokens, not config?
	// StorefrontPreviewDesigner calculates 'themeTokens'.
	// If we visit this page directly, we might not have the custom theme state from the designer unless passed via URL/State.
	// The user requirement says "users can check product details page without needing BE data".
	// If they click from PreviewDesigner, they probably expect the SAME theme they are editing.
	// Passing theme state across routes (from /preview to /preview/products/...) is hard without persistent state or large URL params.
	// For now, I will implementation a basic preview that uses default theme or maybe simple mock.
	// If the user wants the *edited* theme, that's complex (needs Context/URL state).
	// I'll stick to basic dummy data first.

	// Actually, StorefrontThemeProvider expects resolved tokens.
	// I'll import helper to resolve default theme.

	return (
		<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="mb-8">
				<Link
					href={{
						pathname: "/preview",
						query: searchParams,
					}}
					className="inline-flex items-center gap-2 text-sm text-(--store-text-muted) hover:text-(--store-accent)"
				>
					<ArrowLeft className="h-4 w-4 rtl:rotate-180" />
					{t("Product.backToStore")}
				</Link>
			</div>

			<div className="grid gap-12 lg:grid-cols-2">
				{/* Gallery */}
				<div className="aspect-square relative overflow-hidden rounded-3xl bg-(--store-surface-muted)">
					<div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.2em] text-(--store-text-muted)">
						{t("ProductCard.imageComingSoon")}
					</div>
				</div>

				{/* Info */}
				<div className="flex flex-col gap-6">
					<div>
						<h1 className="text-3xl font-bold text-(--store-text) sm:text-4xl">
							{product.name}
						</h1>
						<div className="mt-4 flex items-center justify-between">
							<span className="text-2xl font-semibold text-(--store-text)">
								{formatCurrency(product.price, product.currency, locale)}
							</span>
							<span className="inline-flex items-center gap-1 rounded-full bg-(--store-surface-muted) px-3 py-1 text-sm font-medium text-(--store-text)">
								<Star className="h-4 w-4 fill-current text-yellow-400" />
								4.9
							</span>
						</div>
					</div>

					<p className="text-lg leading-relaxed text-(--store-text-muted)">
						{product.description}
					</p>

					<div className="mt-6 flex gap-4 border-t border-(--store-border) pt-8">
						{/* Dummy Add to Cart */}
						<button
							disabled
							className="w-full flex-1 rounded-full bg-(--store-accent) px-8 py-4 text-center font-semibold text-white shadow-lg shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
						>
							{t("Product.addToCartPreview")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
