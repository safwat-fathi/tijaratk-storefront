"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { placeOrder } from "@/app/actions/orders";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

// Hydration-safe mounted check using useSyncExternalStore
const emptySubscribe = () => () => {};
function useMounted() {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);
}

export default function CheckoutPage() {
  const t = useTranslations("Storefront.Checkout");
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  
  const { items, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydration check
  const mounted = useMounted();

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">{t("emptyCart")}</h1>
        <Link href={`/${slug}`} className="text-blue-600 hover:underline">
          {t("goBack")}
        </Link>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    
    // Prepare items for API
    const orderItems = items.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const payload = {
      buyer_name: formData.get("name") as string,
      buyer_phone: formData.get("phone") as string,
      buyer_email: (formData.get("email") as string) || undefined,
      shipping_address_line1: formData.get("address") as string,
      shipping_city: formData.get("city") as string,
      shipping_state: (formData.get("state") as string) || undefined,
      notes: (formData.get("notes") as string) || undefined,
      items: orderItems,
    };

    try {
      const result = await placeOrder(slug, payload);

      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
        return;
      }

      // Success
      clearCart();
      
      // Redirect to success/tracking page. Assuming result.data.id or order_id is returned.
      // The API response for createOrder defined in service type is CreateStorefrontOrderResponse
      // which has order_id: string.
      const orderId = result.data?.order_id;
      
      if (orderId) {
          router.push(`/${slug}/orders?id=${orderId}&new=true`);
      } else {
          // Fallback if no ID
          setError(t("errors.missingId"));
      }
    } catch (err) {
      setError(t("errors.generic"));
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="md:order-2">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="text-lg font-semibold mb-4">{t("summary")}</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 text-sm">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">{t("noImg")}</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                     <span className="font-medium">{item.name}</span>
                     <span className="text-gray-500">{t("qty")} {item.quantity}</span>
                  </div>
                  <div className="font-medium">
                    {(item.price * item.quantity).toLocaleString()} EGP
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
               <div className="flex justify-between font-medium text-lg">
                  <span>{t("total")}</span>
                  <span>{totalPrice().toLocaleString()} EGP</span>
               </div>
               <p className="text-xs text-gray-500">{t("shippingNote")}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <h2 className="text-lg font-medium">{t("contactInfo")}</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t("fields.fullName")}</label>
                        <input 
                            name="name" 
                            required 
                            type="text" 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t("fields.phone")}</label>
                        <input 
                            name="phone" 
                            required 
                            type="tel" 
                            placeholder={t("fields.placeholderPhone")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t("fields.email")}</label>
                        <input 
                            name="email" 
                            type="email" 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                        />
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                    <h2 className="text-lg font-medium">{t("shippingAddress")}</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t("fields.address")}</label>
                        <textarea 
                            name="address" 
                            required 
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-gray-700">{t("fields.city")}</label>
                             <input 
                                name="city" 
                                required 
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                             />
                        </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700">{t("fields.state")}</label>
                             <input 
                                name="state" 
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                             />
                        </div>
                    </div>
                </div>

                 <div className="space-y-4 pt-4 border-t">
                    <h2 className="text-lg font-medium">{t("additionalNotes")}</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t("fields.notes")}</label>
                        <textarea 
                            name="notes" 
                            rows={2}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <><Loader2 className="animate-spin h-5 w-5 mr-2" /> {t("processing")}</>
                        ) : (
                            t("submit")
                        )}
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        {t("paymentNote")}
                    </p>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
