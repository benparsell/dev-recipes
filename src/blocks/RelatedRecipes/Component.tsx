import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Recipe } from '@/payload-types'

import { Card } from '../../components/Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Locale } from '@/utilities/i18n'

export type RelatedRecipesProps = {
  className?: string
  docs?: Recipe[]
  introContent?: DefaultTypedEditorState
  locale: Locale
}

export const RelatedRecipes: React.FC<RelatedRecipesProps> = (props) => {
  const { className, docs, introContent, locale } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} locale={locale} />}

      <div className="grid grid-cols-1 items-stretch gap-x-5 gap-y-8 md:grid-cols-2">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} locale={locale} relationTo="recipes" showCategories />
        })}
      </div>
    </div>
  )
}
