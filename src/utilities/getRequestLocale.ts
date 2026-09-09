import { locale } from 'next/root-params'
import { defaultLocale, isLocale, type Locale } from '@/utilities/i18n'

/**
 * Reads the `[locale]` root route param via `next/root-params`, for Server
 * Components that need the current locale without prop drilling. Falls back
 * to the default locale for any root layout that doesn't define `locale`
 * (e.g. the (payload)/admin tree).
 */
export async function getRequestLocale(): Promise<Locale> {
  const value = await locale()
  return value && isLocale(value) ? value : defaultLocale
}
