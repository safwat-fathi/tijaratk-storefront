"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { fetchPublicOrder } from "@/app/actions/orders";
import { formatCurrency } from "@/lib/utils/currency";
import type { PublicOrder } from "@/types/services/orders";

export function OrdersLookup() {
  const searchParams = useSearchParams();
	const [orderId, setOrderId] = useState(searchParams.get("id") ?? "");

  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

 	useEffect(() => {
		const idParam = searchParams.get("id");
		if (idParam) {
			// Auto-fetch
			startTransition(async () => {
				setError(null);
				setOrder(null);
				const response = await fetchPublicOrder(idParam);
				if (response.error) {
					setError(response.error);
					return;
				}
				setOrder(response.data!);
			});
		}
	}, [searchParams]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      setError(null);
      setOrder(null);
      const response = await fetchPublicOrder(orderId);
      if (response.error) {
        setError(response.error);
        return;
      }
      setOrder(response.data!);
    });
  };

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6 rounded-3xl border border-(--store-border) bg-(--store-surface) p-6 shadow-sm">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-(--store-text-muted)">
          Order lookup
        </p>
        <h1 className="text-3xl font-semibold text-(--store-text)">
          Track your purchase
        </h1>
        <p className="text-sm text-(--store-text-muted)">
          Enter the order ID from your confirmation message to view status and items.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(event) => setOrderId(event.target.value)}
          className="flex-1 rounded-2xl border border-(--store-border) bg-transparent px-4 py-3 text-(--store-text) focus:border-(--store-accent) focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-2xl bg-(--store-accent) px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Looking up..." : "Check status"}
        </button>
      </form>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {order ? <OrderDetails order={order} /> : null}
    </section>
  );
}

function OrderDetails({ order }: { order: PublicOrder }) {
  return (
    <div className="space-y-4 rounded-2xl border border-(--store-border) bg-(--store-surface-muted)/60 px-5 py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-(--store-text-muted)">
            Order #{order.id}
          </p>
          <h2 className="text-xl font-semibold text-(--store-text)">
            {order.storefront?.name}
          </h2>
        </div>
        <span className="inline-flex items-center rounded-full border border-(--store-border) px-3 py-1 text-xs font-semibold uppercase tracking-widest text-(--store-text)">
          {order.status}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-(--store-text-muted)">
            Buyer
          </p>
          <p className="text-sm text-(--store-text)">
            {order.buyer_name} · {order.buyer_phone}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-(--store-text-muted)">
            Shipping
          </p>
          <p className="text-sm text-(--store-text)">
            {order.shipping_city}
            {order.shipping_state ? `, ${order.shipping_state}` : ""}
            {order.shipping_postal_code ? ` ${order.shipping_postal_code}` : ""}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-widest text-(--store-text-muted)">
          Items
        </p>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-(--store-border) bg-white/60 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-(--store-text)">
                  {item.product?.name ?? `Item ${item.id}`}
                </p>
                <p className="text-xs text-(--store-text-muted)">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold text-(--store-text)">
                {formatCurrency(item.total_price)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-(--store-border) pt-3">
        <span className="text-xs uppercase tracking-[0.3em] text-(--store-text-muted)">
          Total
        </span>
        <span className="text-lg font-semibold text-(--store-text)">
          {formatCurrency(order.total_amount)}
        </span>
      </div>
    </div>
  );
}
