import Link from "next/link";
import { Package, Sparkles } from "lucide-react";

interface EmptyProductsStateProps {
  storefrontSlug: string;
}

export function EmptyProductsState({ storefrontSlug }: EmptyProductsStateProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-(--store-border) bg-linear-to-br from-(--store-surface)/30 via-(--store-surface)/50 to-(--store-surface)/30 backdrop-blur-sm">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-(--store-primary)/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-(--store-accent)/10 blur-3xl" />
      
      <div className="relative flex flex-col items-center justify-center px-6 py-16 text-center sm:px-12 sm:py-20">
        {/* Icon with animated background */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-pulse rounded-full bg-(--store-primary)/20 blur-xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-(--store-surface) shadow-lg shadow-black/5 ring-1 ring-(--store-border)">
            <Package className="h-10 w-10 text-(--store-text-muted)" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <h3 className="mb-2 text-2xl font-bold text-(--store-text) sm:text-3xl">
          No Products Yet
        </h3>
        
        {/* Description */}
        <p className="mb-8 max-w-md text-base text-(--store-text-muted) sm:text-lg">
          This store is just getting started. Check back soon, or request a custom order for exactly what you need.
        </p>

        {/* CTA Button */}
        <Link
          href={`/${storefrontSlug}/custom-order`}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-(--store-accent) px-8 py-4 font-semibold text-(--store-surface) shadow-lg shadow-(--store-accent)/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-(--store-accent)/40"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          
          <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
          <span>Request Custom Order</span>
        </Link>

        {/* Supporting text */}
        <p className="mt-6 text-sm text-(--store-text-muted)/80">
          Tell us what you&apos;re looking for and we&apos;ll create it just for you
        </p>
      </div>
    </div>
  );
}
