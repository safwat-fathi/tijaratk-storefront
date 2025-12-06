import { Suspense } from "react";

import { StorefrontPreviewDesigner } from "@/components/preview/storefront-preview-designer";
import { storefrontApiService } from "@/services/api/storefront.service";
import { notFound } from "next/navigation";

function decodeToken(token?: string | null) {
	if (!token) return null;

	const [, payload] = token.split(".");
	if (!payload) return null;

	try {
		const decoded = JSON.parse(
			Buffer.from(
				payload.replace(/-/g, "+").replace(/_/g, "/"),
				"base64"
			).toString("utf-8")
		);

		if (
			!decoded?.storefrontId ||
			!decoded?.scope?.includes("storefront:edit-theme")
		) {
			return null;
		}

		if (decoded?.exp && Date.now() / 1000 > decoded.exp) {
			return null;
		}

		return decoded;
	} catch {
		return null;
	}
}

export const metadata = {
	title: "Storefront Theme Editor",
	description: "Edit storefront themes live with scoped access tokens.",
};

export default async function ThemeEditorPage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedParams = await params;
	const slug = resolvedParams?.slug;
	const resolvedSearchParams = await searchParams;
	const hashToken =
		typeof resolvedSearchParams?.token === "string"
			? resolvedSearchParams.token
			: undefined;
	const decoded = decodeToken(hashToken);
	const isTokenValid = Boolean(decoded);

	const response = await storefrontApiService.getStorefront(slug);

	if (!response.success || !response.data) {
		return notFound();
	}

	const storefront = response.data;

	return (
		<main className="mx-auto flex min-h-screen flex-col gap-6 px-4 py-10 sm:px-6 lg:px-10">
			<div>
				<h1 className="text-3xl font-semibold text-white">Theme Editor</h1>
				<p className="text-sm text-white/80">
					Launch live storefront previews, tweak layout tokens, and save changes
					without leaving this tab.
				</p>
			</div>
			{isTokenValid ? (
				<Suspense
					fallback={<div className="text-white">Loading editor...</div>}
				>
					<StorefrontPreviewDesigner
						storefront={storefront}
						slug={slug}
						token={hashToken}
					/>
				</Suspense>
			) : (
				<div className="rounded-2xl border border-red-300/60 bg-red-50/80 p-6 text-sm text-red-700">
					Editor link is invalid or expired. Please relaunch the theme editor
					from the dashboard.
				</div>
			)}
		</main>
	);
}
