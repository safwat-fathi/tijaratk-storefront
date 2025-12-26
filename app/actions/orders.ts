"use server";

import { ordersPublicApiService } from "@/services/api/orders-public.service";
import { storefrontApiService } from "@/services/api/storefront.service";
import { CreateStorefrontOrderRequest } from "@/types/services/storefront";
import { revalidatePath } from "next/cache";

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

export async function placeOrder(
	slug: string,
	data: CreateStorefrontOrderRequest
) {
	const response = await storefrontApiService.createOrder(slug, data);

	if (!response.success || !response.data) {
		return { error: response.message ?? "Failed to place order" };
	}

	// Revalidate orders if necessary, though public lookup is dynamic
	// revalidatePath(`/${slug}/orders`);

	return { success: true, data: response.data };
}
