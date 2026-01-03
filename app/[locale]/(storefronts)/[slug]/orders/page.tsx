import { OrdersLookup } from "@/components/orders/orders-lookup";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Storefront.Orders");
  return {
    title: t("title"),
  };
}

export default function OrdersPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-16">
      <OrdersLookup />
    </main>
  );
}
