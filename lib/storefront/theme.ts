import type { CSSProperties } from "react";

import type {
	PublicStorefront,
	StorefrontThemeConfig,
	StorefrontThemePalette,
} from "@/types/services/storefront";

export interface StorefrontThemeTokens {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  border: string;
  gradient: string;
}

const DEFAULT_THEME: StorefrontThemeTokens = {
  background: "#fdfbf7",
  surface: "#ffffff",
  surfaceMuted: "#f4f3ef",
  text: "#0f172a",
  textMuted: "#475569",
  accent: "#111827",
  accentSoft: "#d1fae5",
  border: "#e2e8f0",
  gradient: "linear-gradient(135deg, #111827 0%, #4338ca 100%)",
};

const coerceColor = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback;

const appendAlpha = (hex: string, alphaHex = "33") => {
  if (!hex.startsWith("#")) {
    return hex;
  }

  const normalized = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;

  return `${normalized}${alphaHex}`;
};

export function resolveThemeFromStorefront(
	storefront?: PublicStorefront | null,
): StorefrontThemeTokens {
	const parsed = storefront?.theme_config as StorefrontThemeConfig | undefined;
	const palette: StorefrontThemePalette = parsed?.palette ?? {};

  const primaryColor = coerceColor(
    parsed?.primaryColor,
    DEFAULT_THEME.accent,
  );
  const accent = coerceColor(palette.accent, primaryColor);
  const accentSoft = coerceColor(
    palette.accentSoft,
    appendAlpha(primaryColor, "1A"),
  );

  return {
    background: coerceColor(palette.background, DEFAULT_THEME.background),
    surface: coerceColor(palette.surface, DEFAULT_THEME.surface),
    surfaceMuted: coerceColor(
      palette.surfaceMuted,
      DEFAULT_THEME.surfaceMuted,
    ),
    text: coerceColor(palette.text, DEFAULT_THEME.text),
    textMuted: coerceColor(palette.textMuted, DEFAULT_THEME.textMuted),
    accent,
    accentSoft,
    border: coerceColor(palette.border, DEFAULT_THEME.border),
    gradient: `linear-gradient(135deg, ${accent} 0%, ${accentSoft} 100%)`,
  };
}

export function themeToCssVars(theme: StorefrontThemeTokens) {
  return {
    "--store-bg": theme.background,
    "--store-surface": theme.surface,
    "--store-surface-muted": theme.surfaceMuted,
    "--store-text": theme.text,
    "--store-text-muted": theme.textMuted,
    "--store-accent": theme.accent,
    "--store-accent-soft": theme.accentSoft,
    "--store-border": theme.border,
    "--store-gradient": theme.gradient,
  } as CSSProperties;
}
