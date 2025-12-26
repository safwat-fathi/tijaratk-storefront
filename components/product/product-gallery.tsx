"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductGalleryProps {
	productName: string;
	mainImage?: string;
	images?: string[];
}

export function ProductGallery({
	productName,
	mainImage,
	images: propImages,
}: ProductGalleryProps) {
	const images = propImages || [];
	// Use main_image as default, or first image, or undefined
	const defaultImage = mainImage || images[0];
	const [selectedImage, setSelectedImage] = useState<string | undefined>(
		defaultImage
	);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	// Combine main image with other images for gallery
	const galleryImages = mainImage
		? [mainImage, ...images.filter(img => img !== mainImage)]
		: images;

	// Limit to 5 images max
	const displayImages = galleryImages.slice(0, 5);

	// Get current image index for lightbox navigation
	const currentIndex = displayImages.findIndex(img => img === selectedImage);

	// Keyboard navigation for lightbox
	useEffect(() => {
		if (!isLightboxOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsLightboxOpen(false);
			} else if (e.key === "ArrowLeft" && currentIndex > 0) {
				setSelectedImage(displayImages[currentIndex - 1]);
			} else if (
				e.key === "ArrowRight" &&
				currentIndex < displayImages.length - 1
			) {
				setSelectedImage(displayImages[currentIndex + 1]);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isLightboxOpen, currentIndex, displayImages]);

	// Fallback placeholder if no images
	if (!selectedImage && displayImages.length === 0) {
		return (
			<div className="aspect-square w-full overflow-hidden rounded-3xl border border-(--store-border) bg-(--store-surface-muted) flex items-center justify-center">
				<div className="text-center text-(--store-text-muted)">
					<svg
						className="mx-auto h-24 w-24 opacity-20"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<p className="mt-2 text-sm">No image available</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-4">
				{/* Main Image */}
				<div className="aspect-square w-full overflow-hidden rounded-3xl border border-(--store-border) bg-white shadow-sm relative">
					<button
						type="button"
						onClick={() => setIsLightboxOpen(true)}
						className="relative h-full w-full cursor-zoom-in"
						aria-label="Open image in fullscreen"
					>
						<Image
							src={selectedImage || "/placeholder-product.png"}
							alt={productName}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
							className="object-cover transition hover:opacity-95"
							priority
						/>
					</button>
				</div>

				{/* Thumbnails */}
				{displayImages.length > 1 && (
					<div className="flex gap-3 overflow-x-auto pb-2">
						{displayImages.map((image, index) => (
							<button
								key={`${image}-${index}`}
								type="button"
								onClick={() => setSelectedImage(image)}
								className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
									selectedImage === image
										? "border-(--store-accent) ring-2 ring-(--store-accent)/20"
										: "border-(--store-border) hover:border-(--store-accent)/50"
								}`}
							>
								<Image
									src={image}
									alt={`${productName} ${index + 1}`}
									fill
									sizes="80px"
									className="object-cover"
								/>
							</button>
						))}
					</div>
				)}
			</div>

			{/* Lightbox Modal */}
			{isLightboxOpen && selectedImage && (
				<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 animate-in fade-in duration-200">
					{/* Close button */}
					<button
						type="button"
						onClick={() => setIsLightboxOpen(false)}
						className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
						aria-label="Close lightbox"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{/* Image counter */}
					{displayImages.length > 1 && (
						<div className="absolute top-4 left-4 z-10 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
							{currentIndex + 1} / {displayImages.length}
						</div>
					)}

					{/* Previous button */}
					{currentIndex > 0 && (
						<button
							type="button"
							onClick={() => setSelectedImage(displayImages[currentIndex - 1])}
							className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
							aria-label="Previous image"
						>
							<svg
								className="h-8 w-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
					)}

					{/* Main lightbox image */}
					<div className="relative h-[90vh] w-[90vw]">
						<Image
							src={selectedImage}
							alt={productName}
							fill
							sizes="90vw"
							className="object-contain"
							priority
						/>
					</div>

					{/* Next button */}
					{currentIndex < displayImages.length - 1 && (
						<button
							type="button"
							onClick={() => setSelectedImage(displayImages[currentIndex + 1])}
							className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
							aria-label="Next image"
						>
							<svg
								className="h-8 w-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					)}
				</div>
			)}
		</>
	);
}
