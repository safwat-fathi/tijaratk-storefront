"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ProductGrid,
  StorefrontHero,
  StorefrontHighlights,
  StorefrontThemeProvider,
} from "@/components/storefront";
import { resolveThemeFromStorefront } from "@/lib/storefront/theme";
import type {
  ProductsLayout,
  PublicStorefront,
  StorefrontProduct,
  StorefrontThemeConfig,
  StorefrontThemePalette,
} from "@/types/services/storefront";

const PALETTE_FIELDS: Array<{ key: keyof StorefrontThemePalette; label: string }> = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "surfaceMuted", label: "Surface Muted" },
  { key: "accent", label: "Accent" },
  { key: "accentSoft", label: "Accent Soft" },
  { key: "text", label: "Text" },
  { key: "textMuted", label: "Text Muted" },
  { key: "border", label: "Border" },
];

const PREVIEW_PRODUCTS: StorefrontProduct[] = Array.from({ length: 9 }).map(
  (_, index) => ({
    id: index + 1,
    slug: `preview-product-${index + 1}`,
    name: `Preview Product ${index + 1}`,
    description: "Demo product for live preview.",
    price: 45 + index * 7,
    currency: "USD",
    images: [],
  })
);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const EXPIRATION_MESSAGE =
  "Editor session expired. Please reopen the theme editor from the dashboard.";

type ThemeEditorAppProps = {
	slug: string;
	storefront: PublicStorefront;
};
	
export function ThemeEditorApp({ storefront, slug }: ThemeEditorAppProps) {
	console.log("🚀 ~ :49 ~ ThemeEditorApp ~ storefront:", storefront);
	const [token, setToken] = useState<string | null>(null);
	const [theme, setTheme] = useState<StorefrontThemeConfig | null>(null);
	
	const [status, setStatus] = useState<
		"loading" | "idle" | "error" | "expired"
	>("loading");
	const [error, setError] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const searchParams = new URLSearchParams(window.location.search);
		const tokenFromQuery = searchParams.get("token");

		if (!tokenFromQuery) {
			setStatus("error");
			setError("Missing editor token. Please relaunch the editor.");
			return;
		}

		setToken(tokenFromQuery);
	}, []);

	useEffect(() => {
		if (!token) {
			return;
		}

		try {
			const [, payload] = token.split(".");
			if (!payload) {
				throw new Error("Invalid token payload.");
			}
			const decoded = JSON.parse(
				atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
			);
			const decodedId = decoded?.storefrontId;
			if (!decodedId) {
				throw new Error("Invalid storefront identifier inside token.");
			}
			setStatus("idle");
			setError(null);
		} catch (err) {
			setStatus("error");
			setError(
				err instanceof Error ? err.message : "Unable to decode editor token."
			);
		}
	}, [token]);

	useEffect(() => {
		const fetchTheme = async () => {
			if (!API_BASE_URL) {
				setStatus("error");
				setError("API base URL is not configured.");
				return;
			}

			if (!token || !slug) return;

			setStatus("loading");
			setError(null);

			try {
				const response = await fetch(
					`${API_BASE_URL}/storefronts/${slug}/theme`,
					{
						cache: "no-store",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === 401 || response.status === 403) {
					setStatus("expired");
					setError(EXPIRATION_MESSAGE);
					return;
				}

				if (!response.ok) {
					const message = await response.text();
					throw new Error(message || "Failed to load storefront theme.");
				}

				const data = await response.json();
				const themeConfig = (data?.theme_config ??
					null) as StorefrontThemeConfig | null;
				setTheme(themeConfig);
				
				setStatus("idle");
			} catch (err) {
				setStatus("error");
				setError(
					err instanceof Error ? err.message : "Unable to load theme data."
				);
			}
		};

		if (token && slug) {
			fetchTheme();
		}
	}, [slug, token]);

	const handlePaletteChange = (
		key: keyof StorefrontThemePalette,
		value: string
	) => {
		setTheme(current => {
			const palette = { ...(current?.palette ?? {}) };
			if (!value) {
				delete palette[key];
			} else {
				palette[key] = value;
			}

			return {
				...(current ?? {}),
				palette,
			} as StorefrontThemeConfig;
		});
	};

	const handlePrimaryColorChange = (value: string) => {
		setTheme(current => ({
			...(current ?? {}),
			primaryColor: value || undefined,
		}));
	};

	const handleLayoutChange = (value: ProductsLayout) => {
		setTheme(current => ({
			...(current ?? {}),
			layout: value,
		}));
	};

	const handleSave = async () => {
		if (!API_BASE_URL || !token || !slug) return;
		setIsSaving(true);
		setError(null);

		try {
			const response = await fetch(
				`${API_BASE_URL}/storefronts/${slug}/theme`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ theme }),
				}
			);

			if (response.status === 401 || response.status === 403) {
				setStatus("expired");
				setError(EXPIRATION_MESSAGE);
				return;
			}

			if (!response.ok) {
				const message = await response.text();
				throw new Error(message || "Failed to save theme changes.");
			}

			const data = await response.json();
			const updatedTheme = (data?.theme_config ??
				theme) as StorefrontThemeConfig | null;
			setTheme(updatedTheme);
			
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to save theme.");
		} finally {
			setIsSaving(false);
		}
	};

	const previewStorefront = useMemo(() => {
		if (!storefront) {
			return null;
		}

		return {
			...storefront,
			theme_config: theme ?? undefined,
		} as PublicStorefront;
	}, [storefront, theme]);

	const themeTokens = useMemo(() => {
		if (!previewStorefront) return null;
		return resolveThemeFromStorefront(previewStorefront);
	}, [previewStorefront]);

	if (status === "loading" && !previewStorefront) {
		return <div className="text-white">Loading theme data...</div>;
	}

	if (status === "error" && !previewStorefront) {
		return (
			<div className="rounded-2xl border border-red-300/60 bg-red-50/80 p-6 text-sm text-red-700">
				{error}
			</div>
		);
	}

	if (!previewStorefront) {
		return (
			<div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-sm text-yellow-700">
				Unable to load storefront data. {error}
			</div>
		);
	}

	return (
		<div className="grid gap-6 lg:grid-cols-[360px,1fr]">
			<aside className="space-y-6 rounded-3xl border border-(--store-border) bg-white/90 p-6 shadow-sm">
				{status === "expired" && (
					<div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
						{EXPIRATION_MESSAGE}
					</div>
				)}
				{error && status !== "expired" && (
					<div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
						{error}
					</div>
				)}
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-gray-500">
						Layout
					</p>
					<div className="mt-3 flex gap-2">
						{(["grid", "list"] as ProductsLayout[]).map(value => (
							<button
								key={value}
								type="button"
								onClick={() => handleLayoutChange(value)}
								className={`flex-1 rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
									theme?.layout === value
										? "bg-black text-white"
										: "border-gray-300 text-gray-800"
								}`}
							>
								{value === "grid" ? "Grid" : "List"}
							</button>
						))}
					</div>
				</div>

				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-gray-500">
						Primary Color
					</p>
					<input
						type="color"
						value={theme?.primaryColor || "#111827"}
						onChange={event => handlePrimaryColorChange(event.target.value)}
						className="mt-3 h-12 w-full cursor-pointer rounded-2xl border border-gray-300"
					/>
				</div>

				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-gray-500">
						Palette
					</p>
					<div className="mt-3 space-y-3">
						{PALETTE_FIELDS.map(field => (
							<label
								key={field.key}
								className="flex flex-col gap-2 text-xs font-semibold text-gray-600"
							>
								{field.label}
								<input
									type="color"
									value={
										(theme?.palette?.[field.key] as string | undefined) ||
										"#ffffff"
									}
									onChange={event =>
										handlePaletteChange(field.key, event.target.value)
									}
									className="h-10 w-full cursor-pointer rounded-2xl border border-gray-200"
								/>
							</label>
						))}
					</div>
				</div>

				<button
					type="button"
					onClick={handleSave}
					disabled={isSaving || status === "expired"}
					className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-black/40"
				>
					{isSaving ? "Saving..." : "Save Theme"}
				</button>
			</aside>

			{themeTokens ? (
				<StorefrontThemeProvider theme={themeTokens}>
					<section className="space-y-8 rounded-4xl border border-(--store-border) bg-(--store-surface) shadow-sm overflow-hidden">
						<div className="space-y-10 p-6">
							<StorefrontHero storefront={previewStorefront} />
							<StorefrontHighlights storefront={previewStorefront} />
							<ProductGrid
								products={PREVIEW_PRODUCTS}
								layout={theme?.layout ?? "grid"}
								storefrontSlug={slug}
							/>
						</div>
					</section>
				</StorefrontThemeProvider>
			) : (
				<div className="rounded-3xl border border-white/30 p-6 text-white">
					Loading preview...
				</div>
			)}
		</div>
	);
}
