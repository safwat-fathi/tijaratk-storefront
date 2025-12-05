"use server";

import { ordersPublicApiService } from "@/services/api/orders-public.service";

export async function fetchPublicOrder(orderId: string) {
  const trimmed = orderId.trim();
  if (!trimmed) {
    return { error: "Order ID is required" };
  }

  const response = await ordersPublicApiService.getOrder(trimmed);

  if (!response.success || !response.data) {
    return { error: response.message ?? "Order not found" };
  }

  return { data: response.data };
}
