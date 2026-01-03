"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useQueryParams } from "@/lib/hooks/useQueryParams";
import type { StorefrontProductsMeta } from "@/lib/storefront/data";

type PaginationSchema = {
	page: number;
};

const pageParser = {
	parse: (value: string | null) => {
		const parsed = Number(value);
		if (!parsed || Number.isNaN(parsed) || parsed < 1) {
			return 1;
		}
		return Math.floor(parsed);
	},
	serialize: (value: number) => `${value}`,
	default: 1,
};

interface StorefrontPaginationProps {
	meta?: StorefrontProductsMeta;
	initialPage: number;
}

export function StorefrontPagination({
	meta,
	initialPage,
}: StorefrontPaginationProps) {
	const t = useTranslations("Storefront.pagination");
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const totalPages = Math.max(1, meta?.last_page ?? 1);
	const { params } = useQueryParams<PaginationSchema>(["page"], {
		defaultValues: { page: initialPage },
		schema: { page: pageParser },
		pushMode: "replace",
		refreshOnChange: false,
	});

	const currentPage = useMemo(() => {
		return params.page ?? initialPage ?? 1;
	}, [params.page, initialPage]);

	if (!meta || totalPages <= 1) {
		return null;
	}

	const prevPage = currentPage - 1;
	const nextPage = currentPage + 1;
	const hasPrev = currentPage > 1;
	const hasNext = currentPage < totalPages;

	const buildPageUrl = (page: number) => {
		const newParams = new URLSearchParams(searchParams?.toString());
		newParams.set("page", String(page));
		return `${pathname}?${newParams.toString()}`;
	};

	return (
		<div className="flex flex-col gap-3 border-t border-(--store-border) pt-6 text-(--store-text)">
			<div className="text-sm text-(--store-text-muted)">
				{t("pageInfo", { currentPage, totalPages })}
			</div>
			<div className="flex gap-3">
				{hasPrev ? (
					<Link
						href={buildPageUrl(prevPage)}
						prefetch={false}
						className="cursor-pointer inline-flex flex-1 items-center justify-center rounded-2xl border border-(--store-border) px-4 py-2 text-sm font-medium transition hover:border-(--store-accent) hover:text-(--store-accent)"
					>
						{t("previous")}
					</Link>
				) : (
					<span className="inline-flex flex-1 items-center justify-center rounded-2xl border border-(--store-border) px-4 py-2 text-sm font-medium cursor-not-allowed opacity-40">
						{t("previous")}
					</span>
				)}
				{hasNext ? (
					<Link
						href={buildPageUrl(nextPage)}
						prefetch={true}
						className="cursor-pointer inline-flex flex-1 items-center justify-center rounded-2xl border border-(--store-border) px-4 py-2 text-sm font-medium transition hover:border-(--store-accent) hover:text-(--store-accent)"
					>
						{t("next")}
					</Link>
				) : (
					<span className="inline-flex flex-1 items-center justify-center rounded-2xl border border-(--store-border) px-4 py-2 text-sm font-medium cursor-not-allowed opacity-40">
						{t("next")}
					</span>
				)}
			</div>
		</div>
	);
}
