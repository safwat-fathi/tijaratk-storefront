"use client";

import Link from "next/link";
import Image from "next/image";
import { PublicStorefront } from "@/types/services/storefront";
import { CartButton } from "@/components/cart/cart-button";

interface StorefrontHeaderProps {
  storefront: PublicStorefront;
}

export function StorefrontHeader({ storefront }: StorefrontHeaderProps) {
  return (
		<header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href={`/${storefront.slug}`} className="flex items-center gap-3">
					{storefront.logo_url ? (
						<div className="relative h-8 w-8 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
							<Image
								src={storefront.logo_url}
								alt={storefront.name}
								fill
								sizes="32px"
								className="object-contain"
							/>
						</div>
					) : (
						<div className="relative h-8 w-8 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
							<Image
								src="/logo-no-bg.png"
								alt="Logo"
								fill
								sizes="32px"
								className="object-contain"
							/>
						</div>
					)}
					<span className="font-semibold text-gray-900 line-clamp-1">
						{storefront.name}
					</span>
				</Link>
				<div className="flex items-center gap-4">
					<Link
						href={`/${storefront.slug}/custom-order`}
						className="text-sm font-medium text-gray-700 hover:text-black transition"
					>
						Request Custom Order
					</Link>
					<CartButton />
				</div>
			</div>
		</header>
	);
}
