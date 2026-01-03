'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';

import clsx from 'clsx';

export default function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onLanguageChange(nextLocale: string) {
    const currentSearchParams = searchParams.toString();
    const queryString = currentSearchParams ? `?${currentSearchParams}` : '';
    startTransition(() => {
      router.replace(`${pathname}${queryString}`, { locale: nextLocale });
    });
  }

  // Determine the next locale to toggle to (simple toggle for now)
  const nextLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <button
      onClick={() => onLanguageChange(nextLocale)}
      disabled={isPending}
      className={clsx(
        "cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
    >
      {t('switchLocale')}
    </button>
  );
}
