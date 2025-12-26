import { notFound } from "next/navigation";
import { getStorefront } from "@/lib/storefront/data";
import { StorefrontThemeProvider } from "@/components/storefront/storefront-theme-provider";
import { resolveThemeFromStorefront } from "@/lib/storefront/theme";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { CartDrawer } from "@/components/cart/cart-drawer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

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
