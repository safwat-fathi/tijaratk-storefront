"use client";

import { useMemo, useState } from "react";

import clsx from "clsx";
import { resolveThemeFromStorefront } from "@/lib/storefront/theme";
import { THEME_PRESETS, type ThemePreset } from "@/lib/storefront/palettes";
import type {
	ProductsLayout,
	PublicStorefront,
	StorefrontProduct,
} from "@/types/services/storefront";
import {
	StorefrontThemeProvider,
	StorefrontHero,
	StorefrontHighlights,
	ProductGrid,
} from "../storefront";

const DEFAULT_STOREFRONT: Pick<
	PublicStorefront,
	"name" | "slug" | "description"
> = {
	name: "Tijaratk Studio",
	slug: "tijaratk-studio",
	description:
		"A curated collective of design-forward goods, crafted with intention and delivered with care.",
};

const DUMMY_PRODUCTS: StorefrontProduct[] = Array.from({ length: 24 }).map(
	(_, index) => ({
		id: index + 1,
		slug: `product-${index + 1}`,
		name: `Product ${index + 1}`,
		description: "Hand-picked item with exemplary craftsmanship.",
		price: 20 + index * 5,
		currency: "USD",
		images: [],
	})
);

export function StorefrontPreviewDesigner() {
	const [selectedPresetId, setSelectedPresetId] = useState(
		THEME_PRESETS[0]?.id
	);
	const [layout, setLayout] = useState<ProductsLayout>("grid");

	const selectedPreset: ThemePreset =
		THEME_PRESETS.find(preset => preset.id === selectedPresetId) ??
		THEME_PRESETS[0];

	const previewStorefront = useMemo<PublicStorefront>(() => {
		return {
			...DEFAULT_STOREFRONT,
			id: 0,
			theme_config: {
				...selectedPreset.config,
				layout,
			},
		} as PublicStorefront;
	}, [layout, selectedPreset]);

	const themeTokens = useMemo(
		() => resolveThemeFromStorefront(previewStorefront),
		[previewStorefront]
	);

	return (
		<div className="grid gap-6 lg:grid-cols-[360px,1fr]">
			<aside className="space-y-6 rounded-3xl border border-(--store-border) bg-(--store-surface) p-6 shadow-sm">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-(--store-text-muted)">
						Layout
					</p>
					<div className="mt-3 flex gap-2">
						{(["grid", "list"] as const).map(value => (
							<button
								key={value}
								type="button"
								onClick={() => setLayout(value)}
								className={clsx(
									"flex-1 rounded-2xl border px-4 py-2 text-sm font-semibold transition",
									{
										"bg-black text-white":
											layout === value,
										"border-neutral text-black": value !== layout,
									}
								)}
							>
								{value === "grid" ? "Grid" : "List"}
							</button>
						))}
					</div>
				</div>

				<header className="space-y-1">
					<p className="text-xs uppercase tracking-[0.3em] text-(--store-text-muted)">
						Theme palettes
					</p>
					<p className="text-sm text-(--store-text-muted)">
						Pick one of our curated combinations. Selecting a palette updates
						the preview instantly.
					</p>
				</header>
				<div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-1">
					{THEME_PRESETS.map(preset => (
						<button
							key={preset.id}
							type="button"
							onClick={() => setSelectedPresetId(preset.id)}
							className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
								preset.id === selectedPresetId
									? "border-(--store-accent) bg-(--store-accent)/5"
									: "border-(--store-border)"
							}`}
						>
							<p className="text-sm font-semibold text-(--store-text)">
								{preset.name}
							</p>
							<p className="text-xs text-(--store-text-muted)">
								{preset.description}
							</p>
							<div className="mt-2 flex gap-1">
								{Object.values(preset.config.palette ?? {})
									.slice(0, 6)
									.map(color => (
										<span
											key={`${preset.id}-${color}`}
											style={{ backgroundColor: color ?? "#fff" }}
											className="h-4 w-4 rounded-full border border-black/10"
										/>
									))}
							</div>
						</button>
					))}
				</div>
			</aside>

			<section className="space-y-8 rounded-4xl border border-(--store-border) bg-(--store-surface) shadow-sm overflow-hidden">
				<StorefrontThemeProvider theme={themeTokens}>
					<div className="space-y-10 p-6 ">
						<StorefrontHero storefront={previewStorefront} />
						<StorefrontHighlights storefront={previewStorefront} />
						<ProductGrid products={DUMMY_PRODUCTS} layout={layout} />
					</div>
				</StorefrontThemeProvider>
			</section>
		</div>
	);
}
