import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { defaultLocale, type Locale } from '@/utilities/i18n'

type LowImpactHeroType = { locale?: Locale } & (
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })
)

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  locale = defaultLocale,
  richText,
}) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children ||
          (richText && <RichText data={richText} enableGutter={false} locale={locale} />)}
      </div>
    </div>
  )
}
