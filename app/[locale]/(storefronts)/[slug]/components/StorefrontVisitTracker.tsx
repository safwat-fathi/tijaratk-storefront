"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { recordStoreVisit } from "@/lib/storefront/data";

interface StorefrontVisitTrackerProps {
  storeId: number;
}

export function StorefrontVisitTracker({ storeId }: StorefrontVisitTrackerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
		// Record visit on mount (client-side only to ensure browser session)
		const source = searchParams.get("source") || undefined;
		const utmSource =
			searchParams.get("utm_source") ||
			searchParams.get("utm_campaign") || // often used interchangeably in simple setups
			undefined;

		recordStoreVisit(storeId, {
			userAgent: navigator.userAgent,
			referer: document.referrer,
			source,
			utmSource,
		});
	}, [storeId, searchParams]);

  return null;
}
