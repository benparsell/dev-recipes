import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, locales } from '@/utilities/i18n'

const nonDefaultLocales = locales.filter((locale) => locale !== defaultLocale)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // The default locale is never visible in the URL. Guard against the
  // internal `/en` prefix being hit directly (e.g. a stale bookmark or a
  // crawler that guessed the pattern) by redirecting to the clean path.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped = pathname.slice(`/${defaultLocale}`.length) || '/'
    const url = request.nextUrl.clone()
    url.pathname = stripped
    return NextResponse.redirect(url, 308)
  }

  const hasLocalePrefix = nonDefaultLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocalePrefix) return NextResponse.next()

  // Default locale: rewrite internally to `[locale]` so the visible URL
  // stays unprefixed (preserves existing English URLs on this site).
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!_next|admin|api|next/preview|next/exit-preview|next/seed|.*-sitemap\\.xml|robots\\.txt|favicon|.*\\.(?:svg|png|jpg|jpeg|webp|ico|css|js)$).*)',
  ],
}
