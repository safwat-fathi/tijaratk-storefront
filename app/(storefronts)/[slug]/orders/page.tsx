import { OrdersLookup } from "@/components/orders/orders-lookup";

export const metadata = {
  title: "Track your order",
};

export default function OrdersPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-16">
      <OrdersLookup />
    </main>
  );
}
