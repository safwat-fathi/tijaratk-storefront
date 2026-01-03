# Localization Implementation

This document outlines the localization (i18n) strategy and implementation details for the application.

## Technologies

-   **Framework**: [Next.js App Router](https://nextjs.org/docs/app)
-   **Library**: [next-intl](https://next-intl-docs.vercel.app/)

## Configuration

The core configuration is located in `i18n/config.ts`.

-   **Supported Locales**:
    -   `ar` (Arabic) - **Default**
    -   `en` (English)
-   **RTL Support**: Arabic (`ar`) is configured as an RTL language.
-   **Locale Prefix**: Configured as `always` (URLs will always start with `/{locale}`).

## Directory Structure

The application uses dynamic routing for localization:

-   `app/[locale]/`: The main route segment that handles localized pages.
-   `messages/`: Contains the translation JSON files.
-   `i18n/`: Contains configuration and helper files.
-   `middlewares/`: Contains the i18n middleware logic.

## Translation Management

Translations are stored in JSON files within the `messages/` directory:

-   `messages/ar.json`
-   `messages/en.json`

These files are structured as nested objects (e.g., `common.actions.save`).

### Loading Messages

Messages are loaded dynamically via `i18n/messages.ts` and provided to the request context in `i18n/request.ts`.

```typescript
// i18n/messages.ts
export async function getMessages(locale: Locale) {
  switch (locale) {
    case "ar": return (await import("../messages/ar.json")).default;
    case "en": return (await import("../messages/en.json")).default;
    // ...
  }
}
```

## Routing & Middleware

### Middleware

The middleware is implemented in `middlewares/i18n.middleware.ts` using `next-intl/middleware`. It handles:

1.  Locale detection.
2.  Redirection to localized paths (e.g., `/` -> `/ar`).
3.  Setting the `Content-Language` header.

It is integrated into the global middleware stack in `middleware.ts`.

### Navigation

Navigation helpers are exported from `i18n/navigation.ts`, which wraps Next.js navigation with locale awareness:

-   `Link`: Automatically prepends the current locale.
-   `usePathname`: Returns the pathname without the locale prefix.
-   `useRouter`: Handles navigation with locale context.

## Integration

### Root Layout

The application wraps the entire component tree with `NextIntlClientProvider` in `app/layout.tsx`. This ensures that translations are available to all Client Components.

```typescript
// app/layout.tsx
<NextIntlClientProvider locale={locale} messages={messages}>
  <Providers>
    {children}
  </Providers>
</NextIntlClientProvider>
```

### Components

-   **LocaleSwitcher**: Located at `components/LocaleSwitcher.tsx`. It allows users to switch between languages. It currently uses a manual logic to replace the locale segment in the URL and performs a full page reload (`window.location.href`).

## Usage Examples

### Server Components

```typescript
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('common');
  return <h1>{t('title')}</h1>;
}
```

### Client Components

```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function Button() {
  const t = useTranslations('common.actions');
  return <button>{t('save')}</button>;
}
```
