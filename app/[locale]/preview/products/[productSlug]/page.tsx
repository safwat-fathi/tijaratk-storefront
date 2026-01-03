import { notFound } from "next/navigation";
import { ProductDetailsPreview } from "@/components/preview/product-details-preview";
import { StorefrontThemeProvider } from "@/components/storefront";
import { resolveThemeFromStorefront } from "@/lib/storefront/theme";
import type { PublicStorefront } from "@/types/services/storefront";

const DEFAULT_STOREFRONT: PublicStorefront = {
	id: 0,
	name: "Tijaratk Studio",
	slug: "tijaratk-studio",
	description: "Preview Storefront",
};

export default async function ProductPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { locale, productSlug } = await params;
  const resolvedSearchParams = await searchParams;
  
  // Resolve default theme tokens
  const themeTokens = resolveThemeFromStorefront(DEFAULT_STOREFRONT);

  return (
    <StorefrontThemeProvider theme={themeTokens}>
      <main className="min-h-screen bg-(--store-bg) text-(--store-text)">
        <ProductDetailsPreview 
          productSlug={productSlug} 
          locale={locale} 
          searchParams={resolvedSearchParams}
        />
      </main>
    </StorefrontThemeProvider>
  );
}
