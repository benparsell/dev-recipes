'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Locale } from '@/utilities/i18n'

export const HighImpactHero: React.FC<Page['hero'] & { locale: Locale }> = ({
  links,
  locale,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative -mt-16 flex items-center justify-center text-white" data-theme="dark">
      <div className="container z-10 relative mb-8 flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && (
            <RichText
              className="prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-[-0.02em] mb-6"
              data={richText}
              enableGutter={false}
              locale={locale}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} locale={locale} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(20,17,9,.70)] via-[rgba(20,17,9,.15)] to-transparent" />
      </div>
    </div>
  )
}
