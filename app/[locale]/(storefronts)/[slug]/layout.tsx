import { notFound } from "next/navigation";
import { getStorefront, getStorefrontSeoMetadata } from "@/lib/storefront/data";
import { StorefrontThemeProvider } from "@/components/storefront/storefront-theme-provider";
import { resolveThemeFromStorefront } from "@/lib/storefront/theme";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

type Props = {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const { slug } = await props.params;
	const decodedSlug = decodeURIComponent(slug);
	const metadata = await getStorefrontSeoMetadata(decodedSlug);
	const t = await getTranslations("Storefront");

	return (
		metadata ?? {
			title: t("notFoundTitle"),
			description: t("notFoundDescription"),
		}
	);
}

export default async function StorefrontLayout({ children, params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const storefront = await getStorefront(decodedSlug);

  if (!storefront) {
    notFound();
  }

  const theme = resolveThemeFromStorefront(storefront);

  return (
    <StorefrontThemeProvider theme={theme}>
       <StorefrontHeader storefront={storefront} />
       <CartDrawer />
       {children}
    </StorefrontThemeProvider>
  );
}
