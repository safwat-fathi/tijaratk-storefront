import { StorefrontPreviewDesigner } from "@/components/preview/storefront-preview-designer";

export const metadata = {
  title: "Storefront Theme Preview",
  description: "Explore storefront layouts and palettes in real time.",
};

export default function PreviewPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-10">
      <h1 className="text-3xl font-semibold text-white">
        Storefront Theme Playground
      </h1>
      <p className="max-w-3xl text-sm text-white">
        Tweak palette tokens and layout selections below to see how a storefront would look before saving
        anything to the backend. All data is mocked so you can experiment safely.
      </p>
      <StorefrontPreviewDesigner />
    </main>
  );
}

