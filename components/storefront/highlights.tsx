import { useTranslations } from "next-intl";

import type { PublicStorefront } from "@/types/services/storefront";

const icons = {
	spark: (
		<svg
			viewBox="0 0 24 24"
			className="h-6 w-6 text-(--store-accent)"
			aria-hidden
		>
			<path
				d="M12 3v6m0 6v6m9-9h-6m-6 0H3m12.5-5.5-4 4m0 0-4 4m4-4 4 4m-4-4-4-4"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
	shield: (
		<svg
			viewBox="0 0 24 24"
			className="h-6 w-6 text-(--store-accent)"
			aria-hidden
		>
			<path
				d="M12 3 4 6v5c0 4.418 3.134 8.418 8 10 4.866-1.582 8-5.582 8-10V6l-8-3Z"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
			<path
				d="M9 12.5 11 14l4-4"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
	smile: (
		<svg
			viewBox="0 0 24 24"
			className="h-6 w-6 text-(--store-accent)"
			aria-hidden
		>
			<circle
				cx="12"
				cy="12"
				r="9"
				stroke="currentColor"
				strokeWidth="1.6"
				fill="none"
			/>
			<path
				d="M15.5 14.5a4 4 0 0 1-7 0"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
			<circle cx="9" cy="10" r=".75" fill="currentColor" />
			<circle cx="15" cy="10" r=".75" fill="currentColor" />
		</svg>
	),
};

export function StorefrontHighlights({
	storefront,
}: {
	storefront: PublicStorefront;
}) {
	const t = useTranslations("Storefront.Highlights");
	const cards = [
		{
			title: t("guests.title"),
			body: t("guests.body"),
			icon: icons.spark,
		},
		{
			title: t("fulfillment.title"),
			body: t("fulfillment.body"),
			icon: icons.shield,
		},
		{
			title: t("support.title", { name: storefront.name }),
			body: t("support.body"),
			icon: icons.smile,
		},
	];

	return (
		<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{cards.map(card => (
				<article
					key={card.title}
					className="animate-fade-up space-y-4 rounded-3xl border border-(--store-border) bg-(--store-surface-muted)/60 p-6 shadow-sm"
				>
					<div className="inline-flex items-center justify-center rounded-2xl bg-(--store-accent-soft)/60 p-3">
						{card.icon}
					</div>
					<div>
						<h3 className="text-lg font-semibold text-(--store-text)">
							{card.title}
						</h3>
						<p className="mt-2 text-sm text-(--store-text-muted)">
							{card.body}
						</p>
					</div>
				</article>
			))}
		</section>
	);
}
