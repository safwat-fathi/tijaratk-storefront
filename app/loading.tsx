export default function Loading() {
  return (
		<div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-var(--store-bg) text-var(--store-text)">
			<div
				className="h-12 w-12 rounded-full border-4 border-(--store-border) border-t-var(--store-accent) animate-spin"
				role="status"
				aria-label="Loading"
			/>
			<p className="text-sm text-var(--store-text-muted)">Loading...</p>
		</div>
	);
}
