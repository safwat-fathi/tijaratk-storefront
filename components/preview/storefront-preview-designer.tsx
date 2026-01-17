"use client";

import { useEffect, useMemo, useState } from "react";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { resolveThemeFromStorefront } from "@/lib/storefront/theme";
import { THEME_PRESETS, type ThemePreset } from "@/lib/storefront/palettes";
import type {
	ProductsLayout,
	PublicStorefront,
	StorefrontProduct,
	StorefrontThemePalette,
} from "@/types/services/storefront";
import { StoreThemeConfig } from "@/types/services/storefront";
import {
	StorefrontThemeProvider,
	StorefrontHero,
	StorefrontHighlights,
	ProductGrid,
} from "../storefront";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const EXPIRATION_MESSAGE =
	"Editor session expired. Please reopen the theme editor from the dashboard.";
const PALETTE_KEYS: Array<keyof StorefrontThemePalette> = [
	"background",
	"surface",
	"surfaceMuted",
	"accent",
	"accentSoft",
	"text",
	"textMuted",
	"border",
];

type StorefrontPreviewDesignerProps = {
	storefront?: PublicStorefront;
	slug?: string;
	token?: string;
};

const DEFAULT_STOREFRONT: PublicStorefront = {
	id: 0,
	name: "Tijaratk Studio",
	slug: "tijaratk-studio",
	description:
		"A curated collective of design-forward goods, crafted with intention and delivered with care.",
};

const DUMMY_PRODUCTS: StorefrontProduct[] = Array.from({ length: 12 }).map(
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

export function StorefrontPreviewDesigner({
	storefront,
	slug,
	token,
}: StorefrontPreviewDesignerProps) {
	const baseStorefront = storefront ?? DEFAULT_STOREFRONT;
	const derivedPresetId = useMemo(
		() => findPresetIdFromTheme(storefront?.theme_config as StoreThemeConfig),
		[storefront]
	);
	const [selectedPresetId, setSelectedPresetId] = useState(
		derivedPresetId ?? THEME_PRESETS[0]?.id
	);
	const initialLayout =
		((storefront?.theme_config as StoreThemeConfig)
			?.layout as ProductsLayout) ?? "grid";
	const [layout, setLayout] = useState<ProductsLayout>(initialLayout);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);
	const [isSaved, setIsSaved] = useState(false);

	const selectedPreset: ThemePreset =
		THEME_PRESETS.find(preset => preset.id === selectedPresetId) ??
		THEME_PRESETS[0];

	const t = useTranslations("Storefront.ThemePreview");

	useEffect(() => {
		if (!derivedPresetId) return;
		setSelectedPresetId(derivedPresetId);
	}, [derivedPresetId]);

	useEffect(() => {
		const layoutFromTheme =
			((storefront?.theme_config as StoreThemeConfig)
				?.layout as ProductsLayout) ?? "grid";
		setLayout(layoutFromTheme);
	}, [storefront]);

	useEffect(() => {
		if (!isSaved) {
			return;
		}
		const timeout = setTimeout(() => setIsSaved(false), 2500);
		return () => clearTimeout(timeout);
	}, [isSaved]);

	useEffect(() => {
		setSaveError(null);
		setIsSaved(false);
	}, [selectedPresetId, layout]);

	const currentThemeConfig = useMemo<StoreThemeConfig>(() => {
		return {
			...((storefront?.theme_config as StoreThemeConfig) ?? {}),
			...selectedPreset.config,
			layout,
			presetId: selectedPreset.id,
		};
	}, [layout, selectedPreset, storefront]);

	const previewStorefront = useMemo<PublicStorefront>(() => {
		return {
			...baseStorefront,
			theme_config: currentThemeConfig,
		};
	}, [baseStorefront, currentThemeConfig]);

	const themeTokens = useMemo(
		() => resolveThemeFromStorefront(previewStorefront),
		[previewStorefront]
	);

	const handleSave = async () => {
		if (!slug || !token) {
			setSaveError("Missing editor session token. Please relaunch the editor.");
			return;
		}

		if (!API_BASE_URL) {
			setSaveError("API base URL is not configured.");
			return;
		}

		setIsSaving(true);
		setSaveError(null);
		setIsSaved(false);

		try {
			const response = await fetch(`${API_BASE_URL}/stores/${slug}/theme`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ theme: currentThemeConfig }),
			});

			if (response.status === 401 || response.status === 403) {
				setSaveError(EXPIRATION_MESSAGE);
				return;
			}

			if (!response.ok) {
				const message = await response.text();
				throw new Error(message || "Failed to save theme changes.");
			}

			setIsSaved(true);
		} catch (err) {
			setSaveError(
				err instanceof Error ? err.message : "Unable to save theme."
			);
		} finally {
			setIsSaving(false);
		}
	};

	const showSaveControls = Boolean(slug && token);

	const ActionSection = () => (
		<div className="space-y-3">
			{saveError && (
				<div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
					{t("saveError")}
				</div>
			)}
			{isSaved && !saveError && (
				<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
					{t("saveSuccess")}
				</div>
			)}
			<button
				type="button"
				onClick={handleSave}
				disabled={isSaving}
				className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-black/40"
			>
				{isSaving ? t("saving") : t("saveTheme")}
			</button>
		</div>
	);

	return (
		<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:min-h-[640px] lg:max-h-[calc(100vh-140px)]">
			<section className="flex h-full flex-col overflow-hidden rounded-4xl border border-(--store-border) bg-(--store-surface) shadow-sm">
				<StorefrontThemeProvider theme={themeTokens}>
					<div className="flex-1 space-y-10 overflow-y-auto p-6 pb-16">
						<StorefrontHero storefront={previewStorefront} />
						<StorefrontHighlights storefront={previewStorefront} />
						<ProductGrid
							products={DUMMY_PRODUCTS}
							layout={layout}
							storefrontSlug="preview"
							locale={useLocale()} // Need to import useLocale or check if available
							searchParams={token ? { token } : undefined}
						/>
					</div>
				</StorefrontThemeProvider>
			</section>
			<aside className="flex h-full flex-col overflow-hidden rounded-3xl border border-(--store-border) bg-(--store-surface) shadow-sm">
				<div className="flex-1 space-y-6 overflow-y-auto p-6">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-(--store-text-muted)">
							{t("layout")}
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
											"bg-black text-white": layout === value,
											"border-neutral text-black": value !== layout,
										}
									)}
								>
									{value === "grid" ? t("grid") : t("list")}
								</button>
							))}
						</div>
					</div>

					<header className="space-y-1">
						<p className="text-xs uppercase tracking-[0.3em] text-(--store-text-muted)">
							{t("palettesTitle")}
						</p>
						<p className="text-sm text-(--store-text-muted)">
							{t("palettesDescription")}
						</p>
					</header>
					<div className="grid gap-3 pr-1">
						{THEME_PRESETS.map(preset => (
							<button
								key={preset.id}
								type="button"
								onClick={() => setSelectedPresetId(preset.id)}
								className={`cursor-pointer w-full rounded-2xl border px-4 py-3 text-left transition hover:border-(--store-accent) hover:bg-(--store-accent)/5 ${
									preset.id === selectedPresetId
										? "border-(--store-accent) bg-(--store-accent)/5"
										: "border-(--store-border)"
								}`}
							>
								<p className="text-sm font-semibold text-(--store-text)">
									{t(`presets.${preset.id}.name`)}
								</p>
								<p className="text-xs text-(--store-text-muted)">
									{t(`presets.${preset.id}.description`)}
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
				</div>
				{showSaveControls && (
					<div className="border-t border-(--store-border)/60 bg-white/70 p-6">
						<ActionSection />
					</div>
				)}
			</aside>
		</div>
	);
}

function findPresetIdFromTheme(
	theme?: StoreThemeConfig | null
): string | undefined {
	if (!theme) return undefined;

	const themeWithPreset = theme as StoreThemeConfig & {
		presetId?: string;
	};
	if (themeWithPreset.presetId) {
		const presetExists = THEME_PRESETS.some(
			preset => preset.id === themeWithPreset.presetId
		);
		if (presetExists) {
			return themeWithPreset.presetId;
		}
	}

	return THEME_PRESETS.find(preset =>
		doesThemeMatchPreset(theme, preset.config)
	)?.id;
}

function doesThemeMatchPreset(
	theme: StoreThemeConfig,
	presetConfig: StoreThemeConfig
) {
	if (
		(theme.primaryColor ?? "").toLowerCase() !==
		(presetConfig.primaryColor ?? "").toLowerCase()
	) {
		return false;
	}

	return PALETTE_KEYS.every(key => {
		const themeColor = theme.palette?.[key] ?? "";
		const presetColor = presetConfig.palette?.[key] ?? "";
		return themeColor.toLowerCase() === presetColor.toLowerCase();
	});
}
