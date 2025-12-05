export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-(--store-bg) px-4 text-center text-(--store-text)]">
			<div className="max-w-xl space-y-4 rounded-3xl border border-dashed border-(--store-border) bg-(--store-surface)/70 px-8 py-10 shadow-sm">
				<p className="text-xs uppercase tracking-[0.4em] text-(--store-text-muted)">
					Tijaratk Storefront
				</p>
				<h1 className="text-3xl font-semibold">Choose a storefront slug</h1>
				<p className="text-sm text-(--store-text-muted)">
					Append a storefront identifier to the URL to view its public
					storefront, e.g.,
					<code className="mx-1 rounded bg-(--store-surface-muted) px-2 py-1 text-xs">
						/your-storefront-slug
					</code>
					.
				</p>
				<p className="text-sm text-(--store-text-muted)">
					Each slug is anonymous-friendly and powered entirely by Tijaratk
					public APIs.
				</p>
			</div>
		</main>
	);
}
