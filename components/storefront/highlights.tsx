import type { PublicStorefront } from "@/types/services/storefront";

const icons = {
  spark: (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-(--store-accent)"
      aria-hidden
    >
      <path
        d="M12 3v6m0 6v6m9-9h-6m-6 0H3m12.5-5.5-4 4m0 0-4 4m4-4 4 4m-4-4-4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-(--store-accent)"
      aria-hidden
    >
      <path
        d="M12 3 4 6v5c0 4.418 3.134 8.418 8 10 4.866-1.582 8-5.582 8-10V6l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12.5 11 14l4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  smile: (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-(--store-accent)"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M15.5 14.5a4 4 0 0 1-7 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="9" cy="10" r=".75" fill="currentColor" />
      <circle cx="15" cy="10" r=".75" fill="currentColor" />
    </svg>
  ),
};

export function StorefrontHighlights({
  storefront,
}: {
  storefront: PublicStorefront;
}) {
  const cards = [
    {
      title: "Built for guests",
      body:
        "Anonymous checkout keeps friction low—orders are tracked with a single token instead of forcing logins.",
      icon: icons.spark,
    },
    {
      title: "Trusted fulfillment",
      body:
        "Every order flows into Tijaratk's fulfillment stack so status updates stay transparent for buyers.",
      icon: icons.shield,
    },
    {
      title: `${storefront.name} support`,
      body:
        "Real humans monitor each order. Share your phone or email and we’ll keep you informed at every step.",
      icon: icons.smile,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.title}
          className="animate-fade-up space-y-4 rounded-3xl border border-(--store-border) bg-(--store-surface-muted)/60 p-6 shadow-sm"
        >
          <div className="inline-flex items-center justify-center rounded-2xl bg-(--store-accent-soft)/60 p-3">
            {card.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-(--store-text)">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-(--store-text-muted)">
              {card.body}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
