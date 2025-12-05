import { notFound } from "next/navigation";

import {
  ProductGrid,
  StorefrontHero,
  StorefrontHighlights,
  StorefrontThemeProvider,
} from "@/components/storefront";
import {
  getStorefrontHomeData,
  getStorefrontSeoMetadata,
} from "@/lib/storefront/data";
import { Suspense } from "react";

export const revalidate = 120;

type StorefrontPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: StorefrontPageProps) {
  const { slug } = await props.params;
  const decodedSlug = decodeURIComponent(slug);
  const metadata = await getStorefrontSeoMetadata(decodedSlug);

  return (
    metadata ?? {
      title: "Storefront not found",
      description: "The requested storefront does not exist.",
    }
  );
}

export default async function StorefrontPage(props: StorefrontPageProps) {
  const { slug } = await props.params;
  
  const decodedSlug = decodeURIComponent(slug);
  const data = await getStorefrontHomeData(decodedSlug);
  

  if (!data) {
    notFound();
  }

  return (
		<StorefrontThemeProvider theme={data.theme}>
			<main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-10">
				<StorefrontHero storefront={data.storefront} />
				<StorefrontHighlights storefront={data.storefront} />
				<Suspense
					key={`${slug}-${JSON.stringify(data.products)}`}
					fallback={<div>Loading...</div>}
				>
					<ProductGrid products={data.products} layout={data.layout} />
				</Suspense>
			</main>
		</StorefrontThemeProvider>
	);
}
