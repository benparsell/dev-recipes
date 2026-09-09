'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { localizePath, type Locale } from '@/utilities/i18n'

export const HeaderNav: React.FC<{ data: HeaderType; locale: Locale }> = ({ data, locale }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-5">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            className="font-sans text-sm font-medium text-ink-700 hover:text-ember-700"
            key={i}
            {...link}
            appearance="link"
            locale={locale}
          />
        )
      })}
      <Link
        href={localizePath(locale, '/search')}
        className="text-ink-700 hover:text-ember-700"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-[18px]" strokeWidth={1.75} />
      </Link>
      <LocaleSwitcher
        className="font-sans text-sm font-medium text-ink-700 hover:text-ember-700"
        currentLocale={locale}
      />
    </nav>
  )
}
