'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { defaultLocale, localizePath, otherLocale, type Locale } from '@/utilities/i18n'

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
}

interface Props {
  className?: string
  currentLocale: Locale
  /**
   * Path to the equivalent page in the other locale. When omitted, falls back
   * to a prefix swap of the current path — correct for routes where both
   * locales share the same slug (archive, search, home). Detail pages whose
   * slug can differ per locale (recipes, pages) should pass this explicitly.
   */
  targetPath?: string
}

export const LocaleSwitcher: React.FC<Props> = ({ className, currentLocale, targetPath }) => {
  const pathname = usePathname()
  const target = otherLocale(currentLocale)

  const href =
    targetPath ??
    localizePath(
      target,
      currentLocale === defaultLocale
        ? pathname
        : pathname.replace(new RegExp(`^/${currentLocale}`), '') || '/',
    )

  return (
    <Link className={className} href={href}>
      {localeLabels[target]}
    </Link>
  )
}
