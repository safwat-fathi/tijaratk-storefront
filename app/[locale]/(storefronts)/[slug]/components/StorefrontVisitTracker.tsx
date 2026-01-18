"use client";

import { useEffect } from "react";
import { recordStoreVisit } from "@/lib/storefront/data";

interface StorefrontVisitTrackerProps {
  storeId: number;
}

export function StorefrontVisitTracker({ storeId }: StorefrontVisitTrackerProps) {
  useEffect(() => {
    // Record visit on mount (client-side only to ensure browser session)
    recordStoreVisit(storeId, {
      userAgent: navigator.userAgent,
      referer: document.referrer,
    });
  }, [storeId]);

  return null;
}
