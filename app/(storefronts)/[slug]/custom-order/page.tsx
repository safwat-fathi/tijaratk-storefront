"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { storefrontApiService } from "@/services/api/storefront.service";
import { Loader2, UploadCloud } from "lucide-react";
import Link from 'next/link';

export default function CustomOrderPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Todo: Implement Image Upload (Deferred)
  // For MVP we can just let them describe or skip images. 
  // CustomOrderRequest entity has images: string[]
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    
    // Simple validation
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const description = formData.get("description") as string;
    const budgetStr = formData.get("budget") as string;

    const payload = {
      buyer_name: name,
      buyer_phone: phone,
      description: description,
      budget: budgetStr ? parseFloat(budgetStr) : undefined,
      images: [], // No image upload for MVP yet
    };

    try {
      // NOTE: We calling service client-side directly which calls /public/... endpoint. 
      // Next.js actions are preferred but this is consistent with existing codebase pattern 
      // (storefrontApiService is client-side wrapper).
      const response = await storefrontApiService.createCustomRequest(slug, payload);

      if (!response.success) {
        setError(response.message || "Failed to submit request");
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      // Maybe redirect to a "Track your request" page if we had the ID.
      // response.data should have the ID?
      // const requestId = response.data?.id;
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (success) {
      return (
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
              <div className="rounded-full bg-green-100 p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">Request Received!</h1>
              <p className="text-gray-600 mb-8">
                  We have received your custom order request. The seller will review it and send you a quote soon.
              </p>
              <Link 
                href={`/${slug}`}
                className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
              >
                  Continue Shopping
              </Link>
          </div>
      );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold mb-2">Request Custom Order</h1>
      <p className="text-gray-500 mb-8">
          Can't find what you're looking for? Describe it below and we'll create it just for you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
          
          {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
              </div>
          )}

          <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What are you looking for?</label>
                  <textarea 
                      name="description" 
                      required 
                      rows={5}
                      placeholder="Describe the product, materials, colors, measurements, etc..."
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Budget (Optional)</label>
                  <input 
                      name="budget" 
                      type="number" 
                      min="0"
                      placeholder="EGP"
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                  />
              </div>

              {/* Upload Placeholder */}
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference Images (Optional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 hover:border-gray-300 transition cursor-pointer">
                      <UploadCloud className="mx-auto h-8 w-8 mb-2" />
                      <span className="text-sm">Image upload coming soon</span>
                  </div>
              </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-lg font-medium">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input 
                          name="name" 
                          required 
                          type="text" 
                          className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                          name="phone" 
                          required 
                          type="tel" 
                          placeholder="01xxxxxxxxx"
                          className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                      />
                  </div>
              </div>
          </div>

          <div className="pt-4">
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg shadow-black/5 text-sm font-semibold text-white bg-black hover:bg-gray-800 hover:-translate-y-0.5 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {isSubmitting ? (
                      <><Loader2 className="animate-spin h-5 w-5 mr-2" /> Sending Request...</>
                  ) : (
                      "Submit Request"
                  )}
              </button>
          </div>
      </form>
    </div>
  );
}
