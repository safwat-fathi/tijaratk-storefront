import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-(--store-bg) px-4 text-center text-(--store-text)]">
			<div className="flex flex-col items-center max-w-xl space-y-4 rounded-3xl border border-dashed border-(--store-border) bg-(--store-surface)/70 px-8 py-10 shadow-sm">
				<Image
					src="/logo.png"
					alt="Tijaratk Storefront"
					width={128}
					height={128}
				/>
				<p className="text-xs uppercase tracking-[0.4em] text-black">
					Tijaratk Storefront
				</p>
				<h1 className="text-3xl text-black font-semibold">
					Choose a storefront slug
				</h1>
				<p className="text-sm text-black">
					Append a storefront identifier to the URL to view its public
					storefront, e.g.,
					<code className="mx-1 rounded bg-(--store-surface-muted) px-2 py-1 text-xs">
						/your-storefront-slug
					</code>
					.
				</p>
				<p className="text-sm text-black">
					Each slug is anonymous-friendly and powered entirely by Tijaratk
					public APIs.
				</p>

				<Link
					href="/learn-more"
					className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/80"
				>
					Learn more
				</Link>
			</div>
		</main>
	);
}
