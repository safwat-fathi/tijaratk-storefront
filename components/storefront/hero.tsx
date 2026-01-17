import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import type {
	PublicStorefront,
	StorefrontCategory,
} from "@/types/services/storefront";

interface StorefrontHeroProps {
	storefront: PublicStorefront;
	categories?: StorefrontCategory | null;
	locale?: string;
}

export function StorefrontHero({
	storefront,
	categories,
	locale,
}: StorefrontHeroProps) {
	const t = useTranslations("Storefront.Hero");
	const primaryCategory = categories;
	const subCategories = (storefront.suggested_sub_categories as any) || [];

	const defaultChipMessages = [
		t("defaultChips.curated"),
		t("defaultChips.guest"),
		t("defaultChips.secure"),
	];

	// Use sub-categories if available, otherwise fall back to default messages
	let displayChips = defaultChipMessages;

	if (subCategories.length > 0) {
		if (locale === "ar" && primaryCategory?.suggested_sub_categories) {
			// Map sub-category names to localized names from primary category suggestions
			displayChips = subCategories.map((sub: any) => {
				const suggestion = primaryCategory?.suggested_sub_categories?.find(
					(s: any) => s.name_en === sub.name
				);
				return suggestion ? suggestion.name_ar : sub.name;
			});
		} else {
			displayChips = subCategories.map((sub: any) => sub.name);
		}
	}

	return (
		<section className="hero-section relative overflow-hidden rounded-4xl border border-(--store-border) bg-(--store-surface) px-6 py-12 shadow-sm sm:px-10 sm:py-16">
			{storefront.cover_image_url ? (
				<Image
					src={storefront.cover_image_url}
					alt={storefront.name}
					fill
					sizes="100vw"
					className="absolute inset-0 h-full w-full object-cover opacity-25"
					priority
				/>
			) : (
				<div className="absolute inset-0 bg-(--store-gradient) opacity-10" />
			)}

			<div className="relative z-10 flex flex-col gap-8">
				<div className="flex flex-wrap items-center gap-3 text-sm text-(--store-text-muted)">
					{storefront.logo_url ? (
						<span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/70 shadow">
							<Image
								src={storefront.logo_url}
								alt={t("logoAlt", { name: storefront.name })}
								fill
								sizes="44px"
								className="object-contain"
							/>
						</span>
					) : (
						<span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/70 shadow">
							<Image
								src="/logo-no-bg.png"
								alt={t("logoAlt", { name: storefront.name })}
								fill
								sizes="44px"
								className="object-contain"
							/>
						</span>
					)}

					<Link
						href="/"
						className="rounded-full border border-(--store-border)/60 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.2em] text-(--store-text-muted)"
					>
						{t("badge")}
					</Link>
				</div>

				<div className="max-w-3xl space-y-4">
					{primaryCategory && (
						<div className="flex items-center gap-2">
							<span className="inline-flex items-center gap-2 rounded-full bg-(--store-accent)/10 px-4 py-1.5 text-sm font-medium text-(--store-accent) shadow-sm ring-1 ring-(--store-accent)/20">
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
									/>
								</svg>
								{locale === "ar"
									? primaryCategory.name_ar
									: primaryCategory.name_en}
							</span>
						</div>
					)}
					<h1 className="text-4xl font-semibold leading-tight tracking-tight text-(--store-text) sm:text-5xl">
						{storefront.name}
					</h1>
					<p className="text-lg text-(--store-text-muted)">
						{storefront.description || t("descriptionFallback")}
					</p>
				</div>

				<div className="flex flex-wrap gap-3 text-sm text-(--store-text-muted)">
					{displayChips.map((message, index) => (
						<span
							key={`${message}-${index}`}
							className="inline-flex items-center gap-2 rounded-full bg-(--store-accent-soft)/50 px-5 py-2 text-(--store-text)"
						>
							<span className="h-2 w-2 rounded-full bg-(--store-accent)" />
							{message}
						</span>
					))}
				</div>

				<div className="flex flex-wrap gap-4 text-sm font-medium">
					<a
						href="#products"
						className="cursor-pointer inline-flex items-center justify-center rounded-full bg-(--store-accent) px-6 py-3 text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl"
					>
						{t("explore")}
					</a>
				</div>
			</div>
		</section>
	);
}
