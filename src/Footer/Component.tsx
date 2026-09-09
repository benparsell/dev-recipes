import { getCachedGlobal } from '@/utilities/getGlobals'
import { getRequestLocale } from '@/utilities/getRequestLocale'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Wordmark } from '@/components/Wordmark'
import { localizePath } from '@/utilities/i18n'

export async function Footer() {
  const locale = await getRequestLocale()
  const footerData = await getCachedGlobal('footer', locale, 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-line-1 bg-paper-2">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <Link className="flex items-center" href={localizePath(locale, '/')}>
          <Wordmark />
        </Link>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col gap-4 md:flex-row md:items-center">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  className="font-sans text-sm font-medium text-ink-600 hover:text-ember-700"
                  key={i}
                  {...link}
                  locale={locale}
                />
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
