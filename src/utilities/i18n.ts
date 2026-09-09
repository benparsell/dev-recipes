export const locales = ['en', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

/**
 * Prefixes `path` with the locale segment, except for the default locale
 * which is served unprefixed at the root (see src/proxy.ts).
 */
export const localizePath = (locale: Locale, path: string): string => {
  if (locale === defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

export const otherLocale = (locale: Locale): Locale =>
  locales.find((candidate) => candidate !== locale) ?? defaultLocale
