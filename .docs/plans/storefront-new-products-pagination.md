# Summary
- `app/(storefronts)/[slug]/page.tsx` renders storefront shell (hero, highlights) and currently fetches a single page of featured products server-side.
- Products stay on the same route; pagination updates only the products section to avoid full page reloads.
- Suspense fallback should match either grid or list layout depending on current theme config.
- Default pagination size is 9 products per page, controlled via the `page` query parameter stored in the URL. We will use the existing `useQueryParams` hook to read/write `page` so navigation remains client-friendly and preserves state between interactions.

# Plan
1. **Data helpers**
   - Update `getStorefrontHomeData` to accept optional `page`/`limit` (default limit 9) for product fetching and ensure `productsMeta` includes pagination info. Provide a new helper (e.g., `getStorefrontProductsPage`) that fetches paginated products for a given slug/page using `storefrontApiService`.
2. **Server products section**
   - Refactor `[slug]/page.tsx` to read `page` from `searchParams` (default 1). Extract an async `StorefrontProductsSection` component that accepts slug/layout/page, fetches paginated products via helper, and renders `<ProductGrid>` plus pagination metadata. Wrap this component in `<Suspense>` with a key composed of slug/page/layout so React refreshes only the boundary.
3. **Client pagination controls**
   - Implement a `StorefrontPaginationControls` client component colocated with storefront components. It uses `useQueryParams` with `{ page: number }` schema, defaults to 1, disables prev/next at bounds, and triggers router updates without full reloads (toggle `refreshOnChange` only if needed). Buttons are discrete Prev/Next for MVP.
4. **Skeleton fallback**
   - Add a `ProductGridSkeleton` component that renders placeholders matching grid/list layout (9 placeholders). Use it as the `fallback` for the Suspense boundary so layout remains consistent during loading states.
5. **Integration & verification**
   - Wire pagination metadata and controls below the product grid. Ensure query param stays in URL and only the products section refetches. Run lint/type checks if feasible and document manual test steps.

# Questions / Risks
- None remaining; defaults confirmed (page=1, discrete Prev/Next).
