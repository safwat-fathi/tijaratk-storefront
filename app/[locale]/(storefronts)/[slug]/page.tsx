import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import {
	ProductGridSkeleton,
	StorefrontHero,
	StorefrontHighlights,
	StorefrontThemeProvider,
} from "@/components/storefront";
import {
	getStorefrontHomeData,
	getStorefrontSeoMetadata,
} from "@/lib/storefront/data";
import { Suspense } from "react";
import { StorefrontProductsSection } from "./components/storefront-products-section";

export const revalidate = 120;

type StorefrontPageProps = {
	params: Promise<{ slug: string }>;
	searchParams?: Promise<{ page?: string }>;
};

export async function generateMetadata(props: StorefrontPageProps) {
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

export default async function StorefrontPage(props: StorefrontPageProps) {
	const { slug, locale } = await props.params as any; // Cast as any because locale is injected by layout but types might be strict
	const searchParams = props.searchParams ? await props.searchParams : {};
	const currentPage = normalizePage(searchParams?.page);

	const decodedSlug = decodeURIComponent(slug);
	const data = await getStorefrontHomeData(decodedSlug, { page: currentPage });

	if (!data) {
		notFound();
	}

	return (
		<StorefrontThemeProvider theme={data.theme}>
			<main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-10">
				<StorefrontHero storefront={data.storefront} locale={locale} />
				<StorefrontHighlights storefront={data.storefront} />
				<Suspense
					key={`${slug}-${currentPage}-${data.layout}`}
					fallback={<ProductGridSkeleton layout={data.layout} />}
				>
					<StorefrontProductsSection
						slug={decodedSlug}
						layout={data.layout}
						page={currentPage}
						initialProducts={data.products}
						initialMeta={data.productsMeta}
						locale={locale}
					/>
				</Suspense>
			</main>
		</StorefrontThemeProvider>
	);
}

function normalizePage(pageParam?: string) {
	const parsed = Number(pageParam);
	if (!pageParam || Number.isNaN(parsed) || parsed < 1) {
		return 1;
	}
	return Math.floor(parsed);
}
