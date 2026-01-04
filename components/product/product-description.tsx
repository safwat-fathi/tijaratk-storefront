import { useTranslations } from "next-intl";

interface ProductDescriptionProps {
	description?: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
	const t = useTranslations("Storefront.Product");

	if (!description) {
		return null;
	}

	return (
		<section className="space-y-4">
			<h2 className="text-lg font-semibold uppercase tracking-wide text-(--store-text)">
				{t("productDetails")}
			</h2>
			<div className="prose prose-sm max-w-none text-(--store-text-muted)">
				<p className="whitespace-pre-wrap">{description}</p>
			</div>
		</section>
	);
}
