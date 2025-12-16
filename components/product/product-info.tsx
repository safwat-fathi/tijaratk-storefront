"use client";

import { useState } from "react";
import type { StorefrontProduct } from "@/types/services/storefront";

interface ProductInfoProps {
	product: StorefrontProduct;
	storefrontCategoryName?: string;
}

export function ProductInfo({ product, storefrontCategoryName }: ProductInfoProps) {
	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = () => {
		if (product.stock && quantity >= product.stock) return;
		setQuantity((prev) => prev + 1);
	};

	const decrementQuantity = () => {
		if (quantity <= 1) return;
		setQuantity((prev) => prev - 1);
	};

	const formatPrice = (price?: number) => {
		if (!price) return "Price not available";
		return `EGP ${price.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})}`;
	};

	const isOutOfStock = !product.stock || product.stock === 0;

	return (
		<div className="space-y-6">
			{/* Category */}
			{storefrontCategoryName && (
				<div>
					<span className="inline-flex items-center gap-2 rounded-full bg-(--store-accent)/10 px-4 py-1.5 text-sm font-medium text-(--store-accent) shadow-sm ring-1 ring-(--store-accent)/20">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
							/>
						</svg>
						{storefrontCategoryName}
					</span>
				</div>
			)}

			{/* Product Name */}
			<div>
				<h1 className="text-3xl font-bold leading-tight tracking-tight text-(--store-text) sm:text-4xl">
					{product.name}
				</h1>
			</div>

			{/* Price */}
			<div className="border-y border-(--store-border) py-6">
				<p className="text-3xl font-semibold text-(--store-text)">
					{formatPrice(product.price)}
				</p>
			</div>

			{/* SKU and Stock */}
			<div className="space-y-2 text-sm text-(--store-text-muted)">
				{product.sku && (
					<p>
						<span className="font-medium">SKU:</span> {product.sku}
					</p>
				)}
				<p>
					<span className="font-medium">Stock:</span>{" "}
					{isOutOfStock ? (
						<span className="text-red-600">Out of stock</span>
					) : (
						<span className="text-green-600">{product.stock} available</span>
					)}
				</p>
			</div>

			{/* Quantity Selector */}
			{!isOutOfStock && (
				<div className="space-y-3">
					<label
						htmlFor="quantity"
						className="text-sm font-medium text-(--store-text)"
					>
						Quantity
					</label>
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={decrementQuantity}
							disabled={quantity <= 1}
							className="flex h-10 w-10 items-center justify-center rounded-full border border-(--store-border) text-(--store-text) transition hover:border-(--store-accent) hover:text-(--store-accent) disabled:cursor-not-allowed disabled:opacity-40"
							aria-label="Decrease quantity"
						>
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
							</svg>
						</button>
						<input
							type="number"
							id="quantity"
							value={quantity}
							onChange={(e) => {
								const val = Number.parseInt(e.target.value, 10);
								if (val >= 1 && (product.stock ? val <= product.stock : true)) {
									setQuantity(val);
								}
							}}
							min={1}
							max={product.stock}
							className="h-10 w-16 rounded-2xl border border-(--store-border) bg-(--store-surface) text-center text-(--store-text) focus:border-(--store-accent) focus:outline-none focus:ring-2 focus:ring-(--store-accent)/20"
						/>
						<button
							type="button"
							onClick={incrementQuantity}
							disabled={product.stock ? quantity >= product.stock : false}
							className="flex h-10 w-10 items-center justify-center rounded-full border border-(--store-border) text-(--store-text) transition hover:border-(--store-accent) hover:text-(--store-accent) disabled:cursor-not-allowed disabled:opacity-40"
							aria-label="Increase quantity"
						>
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
							</svg>
						</button>
					</div>
				</div>
			)}

			{/* Action Buttons */}
			<div className="space-y-3">
				<button
					type="button"
					disabled={isOutOfStock}
					className="w-full cursor-pointer rounded-full bg-(--store-accent) px-8 py-4 text-center font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
				>
					{isOutOfStock ? "Out of Stock" : "Add to Cart"}
				</button>
				<button
					type="button"
					disabled={isOutOfStock}
					className="w-full cursor-pointer rounded-full border-2 border-(--store-accent) bg-transparent px-8 py-4 text-center font-semibold text-(--store-accent) transition hover:bg-(--store-accent)/5 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isOutOfStock ? "Notify When Available" : "Buy Now"}
				</button>
			</div>
		</div>
	);
}
