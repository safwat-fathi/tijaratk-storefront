import type { ProductsLayout } from "@/types/services/storefront";

interface ProductGridSkeletonProps {
	layout?: ProductsLayout;
}

const GRID_PLACEHOLDERS = Array.from({ length: 9 });

export function ProductGridSkeleton({
	layout = "grid",
}: ProductGridSkeletonProps) {
	const isList = layout === "list";

	if (isList) {
		return (
			<div className="flex flex-col gap-4" aria-hidden>
				{GRID_PLACEHOLDERS.map((_, index) => (
					<div
						key={`list-skeleton-${index}`}
						className="flex flex-col gap-4 rounded-3xl border border-(--store-border) bg-(--store-surface) p-4 shadow-sm md:flex-row md:items-center"
					>
						<div className="h-36 w-full animate-pulse rounded-2xl bg-(--store-surface-muted) md:h-32 md:w-32" />
						<div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
							<div className="flex-1 space-y-2">
								<div className="h-5 w-2/3 rounded-full bg-(--store-surface-muted)" />
								<div className="h-4 w-full rounded-full bg-(--store-surface-muted)" />
								<div className="h-4 w-1/3 rounded-full bg-(--store-surface-muted)" />
							</div>
							<div className="flex flex-col gap-3">
								<div className="h-7 w-24 rounded-full bg-(--store-surface-muted)" />
								<div className="h-10 w-32 rounded-2xl border border-(--store-border) bg-(--store-surface-muted)" />
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-6" aria-hidden>
			<div className="flex flex-col gap-2">
				<div className="h-3 w-32 rounded-full bg-(--store-surface-muted)" />
				<div className="h-6 w-48 rounded-full bg-(--store-surface-muted)" />
			</div>
			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{GRID_PLACEHOLDERS.map((_, index) => (
					<div
						key={`grid-skeleton-${index}`}
						className="rounded-3xl border border-(--store-border) bg-(--store-surface) p-4 shadow-sm"
					>
						<div className="h-48 w-full animate-pulse rounded-2xl bg-(--store-surface-muted)" />
						<div className="mt-4 space-y-2">
							<div className="h-5 w-3/4 rounded-full bg-(--store-surface-muted)" />
							<div className="h-4 w-1/2 rounded-full bg-(--store-surface-muted)" />
							<div className="h-4 w-1/3 rounded-full bg-(--store-surface-muted)" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
