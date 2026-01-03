import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

import { storefrontApiService } from "@/services/api/storefront.service";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductDescription } from "@/components/product/product-description";

interface ProductPageProps {
	params: Promise<{ slug: string; productSlug: string }>;
}

export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const { slug, productSlug } = await params;
	const t = await getTranslations("Storefront.Product");

	try {
		const productResponse = await storefrontApiService.getStorefrontProduct(
			slug,
			productSlug
		);

		if (!productResponse.success || !productResponse.data) {
			return { title: t("notFound") };
		}

		const product = productResponse.data;

		return {
			title: `${product.name} | Tijaratk`, // Keep Tijaratk hardcoded or use Common.title if available but mixed string is complex
			description:
				product.description ||
				`Buy ${product.name} from our storefront. ${
					product.price ? `EG ${product.price}` : ""
				}`,
			openGraph: {
				title: product.name,
				description:
					product.description || `Buy ${product.name} from our storefront.`,
				images: product.main_image
					? [{ url: product.main_image }]
					: product.images?.[0]
					? [{ url: product.images[0] }]
					: undefined,
			},
		};
	} catch {
		return { title: t("notFound") };
	}
}

const Product = async ({ params }: ProductPageProps) => {
	const { slug, productSlug } = await params;
	const t = await getTranslations("Storefront.Product");

	// Fetch product and storefront data
	const [productResponse, storefrontResponse] = await Promise.all([
		storefrontApiService.getStorefrontProduct(slug, productSlug),
		storefrontApiService.getStorefront(slug),
	]);

	if (!productResponse.success || !productResponse.data) {
		notFound();
	}

	const product = productResponse.data;
	const storefront = storefrontResponse.success
		? storefrontResponse.data
		: null;

	const storefrontCategoryName =
		storefront?.storefrontCategory?.primaryCategory?.name_en;

	return (
		<main className="min-h-screen bg-(--store-background) px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				{/* Back Navigation */}
				<div className="mb-8">
					<Link
						href={`/${slug}`}
						className="inline-flex items-center gap-2 text-sm font-medium text-(--store-text-muted) transition hover:text-(--store-accent)"
						aria-label={t("backToStore")}
						prefetch
					>
						<svg
							className="h-5 w-5 rtl:rotate-180"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						{t("backToStore")}
					</Link>
				</div>

				{/* Product Content */}
				<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
					{/* Left Column - Gallery */}
					<div>
						<ProductGallery
							productName={product.name}
							mainImage={product.main_image}
							images={product.images}
						/>
					</div>

					{/* Right Column - Product Info */}
					<div>
						<ProductInfo
							product={product}
							storefrontCategoryName={storefrontCategoryName}
							storefrontId={storefront?.id ?? 0}
						/>
					</div>
				</div>

				{/* Product Description */}
				{product.description && (
					<div className="mt-16 border-t border-(--store-border) pt-12">
						<ProductDescription description={product.description} />
					</div>
				)}
			</div>
		</main>
	);
};

export default Product;
