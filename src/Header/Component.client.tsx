'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Header } from '@/payload-types'

import { Wordmark } from '@/components/Wordmark'
import { HeaderNav } from './Nav'
import { localizePath, type Locale } from '@/utilities/i18n'

interface HeaderClientProps {
  data: Header
  locale: Locale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // The header keeps its own translucent paper backdrop on every route (it
  // never goes fully dark), so it stays legible over any hero below it. We
  // still reset the shared headerTheme context per route since other
  // consumers (e.g. HighImpactHero) key off it for their own dark styling.
  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-line-1 bg-paper-1/90 backdrop-blur-[14px] backdrop-saturate-150">
      <div className="container flex h-16 items-center justify-between">
        <Link href={localizePath(locale, '/')} aria-label="Dev Recipes home">
          <Wordmark tone="ink" />
        </Link>
        <HeaderNav data={data} locale={locale} />
      </div>
    </header>
  )
}
