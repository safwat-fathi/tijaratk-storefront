"use client";

import { useMemo } from "react";

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
	const totalPages = Math.max(1, meta?.last_page ?? 1);
	const { params, setParam } = useQueryParams<PaginationSchema>(["page"], {
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

	const handlePrev = () => {
		if (currentPage <= 1) return;
		setParam("page", currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage >= totalPages) return;
		setParam("page", currentPage + 1);
	};

	return (
		<div className="flex flex-col gap-3 border-t border-(--store-border) pt-6 text-(--store-text)">
			<div className="text-sm text-(--store-text-muted)">
				Page {currentPage} of {totalPages}
			</div>
			<div className="flex gap-3">
				<button
					type="button"
					onClick={handlePrev}
					disabled={currentPage <= 1}
					className="inline-flex flex-1 items-center justify-center rounded-2xl border border-(--store-border) px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 hover:border-(--store-accent) hover:text-(--store-accent)"
				>
					Previous
				</button>
				<button
					type="button"
					onClick={handleNext}
					disabled={currentPage >= totalPages}
					className="inline-flex flex-1 items-center justify-center rounded-2xl border border-(--store-border) px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 hover:border-(--store-accent) hover:text-(--store-accent)"
				>
					Next
				</button>
			</div>
		</div>
	);
}
