"use client";

import { ShoppingBag } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useCartStore } from "@/store/cart-store";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Hydration-safe mounted check using useSyncExternalStore
const emptySubscribe = () => () => {};
function useMounted() {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);
}

export function CartButton({ className }: { className?: string }) {
  const { totalItems, toggleCart } = useCartStore();
  const mounted = useMounted();

  const count = mounted ? totalItems() : 0;

  return (
		<button
			onClick={toggleCart}
			className={cn(
				"cursor-pointer relative p-2 text-gray-700 hover:text-gray-900",
				className
			)}
		>
			<ShoppingBag className="h-6 w-6" />
			{count > 0 && (
				<span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
					{count > 99 ? "99+" : count}
				</span>
			)}
		</button>
	);
}
