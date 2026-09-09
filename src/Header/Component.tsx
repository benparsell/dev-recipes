import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getRequestLocale } from '@/utilities/getRequestLocale'
import React from 'react'

export async function Header() {
  const locale = await getRequestLocale()
  const headerData = await getCachedGlobal('header', locale, 1)()

  return <HeaderClient data={headerData} locale={locale} />
}
