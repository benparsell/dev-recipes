import type React from 'react'
import type { Page, Recipe } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'
import { defaultLocale, localizePath, type Locale } from '@/utilities/i18n'

interface Props {
  disableNotFound?: boolean
  locale: Locale
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, locale, url }) => {
  const redirects = await getCachedRedirects()()

  // The `redirects` collection is not locale-aware (v1 limitation): `from`
  // values are stored unprefixed, so match against the unprefixed path and
  // re-apply the current locale's prefix to whatever we redirect to.
  const unprefixedUrl =
    locale === defaultLocale ? url : (url.replace(new RegExp(`^/${locale}`), '') || '/')

  const redirectItem = redirects.find((redirect) => redirect.from === unprefixedUrl)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(localizePath(locale, redirectItem.to.url))
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id, locale)()) as Page | Recipe
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        document?.slug
      }`
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`
    }

    if (redirectUrl) redirect(localizePath(locale, redirectUrl))
  }

  if (disableNotFound) return null

  notFound()
}
