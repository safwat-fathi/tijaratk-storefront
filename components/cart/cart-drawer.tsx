"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

import Link from "next/link";

// Hydration-safe mounted check using useSyncExternalStore
const emptySubscribe = () => () => {};
function useMounted() {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);
}

export function CartDrawer() {
  const { items, isOpen, removeItem, updateQuantity, totalPrice, setOpen } =
		useCartStore();
	const mounted = useMounted();

	if (!mounted) return null;

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 z-50 transition-opacity"
				onClick={() => setOpen(false)}
			/>

			{/* Drawer */}
			<div
				className={cn(
					"fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out transform",
					isOpen ? "translate-x-0" : "translate-x-full"
				)}
			>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b">
						<h2 className="text-lg font-semibold">Shopping Cart</h2>
						<button
							onClick={() => setOpen(false)}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					{/* Items */}
					<div className="flex-1 overflow-y-auto p-4 space-y-4">
						{items.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-full text-gray-500">
								<p>Your cart is empty</p>
								<button
									onClick={() => setOpen(false)}
									className="mt-4 text-blue-600 hover:underline"
								>
									Continue Shopping
								</button>
							</div>
						) : (
							items.map(item => (
								<div
									key={item.id}
									className="flex gap-4 border-b pb-4 last:border-0 last:pb-0"
								>
									<div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
										{item.image ? (
											// eslint-disable-next-line @next/next/no-img-element
											<img
												src={item.image}
												alt={item.name}
												className="h-full w-full object-cover object-center"
											/>
										) : (
											<div className="flex h-full items-center justify-center text-gray-400">
												<span className="text-xs">No img</span>
											</div>
										)}
									</div>

									<div className="flex flex-1 flex-col">
										<div>
											<div className="flex justify-between text-base font-medium text-gray-900">
												<h3 className="line-clamp-2 pr-4">
													<a href={`/product/${item.slug}`}>{item.name}</a>
												</h3>
												<p className="ml-4">
													{item.price.toLocaleString()} EGP
												</p>
											</div>
										</div>
										<div className="flex flex-1 items-end justify-between text-sm">
											<div className="flex items-center gap-2 border rounded-md">
												<button
													onClick={() =>
														updateQuantity(item.id, item.quantity - 1)
													}
													className="p-1 hover:bg-gray-100 disabled:opacity-50"
													disabled={item.quantity <= 1}
												>
													<Minus className="h-4 w-4" />
												</button>
												<span className="w-8 text-center">{item.quantity}</span>
												<button
													onClick={() =>
														updateQuantity(item.id, item.quantity + 1)
													}
													className="p-1 hover:bg-gray-100"
												>
													<Plus className="h-4 w-4" />
												</button>
											</div>

											<button
												type="button"
												onClick={() => removeItem(item.id)}
												className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
											>
												<Trash2 className="h-4 w-4" />
												<span className="sr-only">Remove</span>
											</button>
										</div>
									</div>
								</div>
							))
						)}
					</div>

					{/* Footer */}
					{items.length > 0 && (
						<div className="border-t p-4 space-y-4 bg-gray-50">
							<div className="flex justify-between text-base font-medium text-gray-900">
								<p>Subtotal</p>
								<p>{totalPrice().toLocaleString()} EGP</p>
							</div>
							<p className="mt-0.5 text-sm text-gray-500">
								Shipping and taxes calculated at checkout.
							</p>
							<div className="mt-6">
								{/* Link to checkout. We need slug. items[0].slug might be product slug. 
                            Wait, we need storefront slug. 
                            I don't store storefront slug in cart item, only storefrontId.
                            I should store storefrontSlug in cart item or get it from URL/context.
                            If I'm on a page, I rely on the URL. 
                            But the checkout link must be consistent.
                            Ideally, I should store `storefrontSlug` in the cart store so I can link back.
                            Ill assume the user is on the correct domain/path segment for now.
                            But `App` structure is `app/(storefronts)/[slug]`.
                            So generic checkout link might be problematic if we don't know slug.
                            I'll verify how to get slug. `useParams`?
                         */}
								<CheckoutButton />
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

import { useParams } from 'next/navigation';

function CheckoutButton() {
     const params = useParams();
     const slug = params?.slug as string;
     
     if (!slug) return null; // Should not happen if inside route

     return (
        <Link
            href={`/${slug}/checkout`}
            className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 w-full"
            onClick={() => useCartStore.getState().setOpen(false)}
        >
            Checkout
        </Link>
     );
}
