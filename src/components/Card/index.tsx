'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Recipe } from '@/payload-types'

import { Media } from '@/components/Media'
import { localizePath, type Locale } from '@/utilities/i18n'

export type CardRecipeData = Pick<
  Recipe,
  'slug' | 'categories' | 'meta' | 'title' | 'prepTime' | 'cookTime' | 'servings'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardRecipeData
  locale: Locale
  relationTo?: 'recipes'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, locale, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, prepTime, cookTime, servings } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = localizePath(locale, `/${relationTo}/${slug}`)

  const totalTime = (prepTime || 0) + (cookTime || 0)
  const hasRecipeMeta = totalTime > 0 || Boolean(servings)

  return (
    <article
      className={cn(
        'group overflow-hidden rounded-card border border-line-1 bg-card shadow-2 transition-[transform,box-shadow] duration-200 ease-standard hover:-translate-y-0.5 hover:shadow-3 hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-2">
        {!metaImage && (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-ink-400">
            No image
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="33vw"
            imgClassName="h-full w-full object-cover rounded-media"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-5">
        {showCategories && hasCategories && (
          <div className="kicker">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category

                const categoryTitle = titleFromCategory || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
        )}
        {titleToUse && (
          <h3 className="font-sans text-[21px] leading-[1.3] font-semibold text-foreground">
            <Link
              className="decoration-transparent underline-offset-[3px] group-hover:underline group-hover:decoration-current"
              href={href}
              ref={link.ref}
            >
              {titleToUse}
            </Link>
          </h3>
        )}
        {hasRecipeMeta && (
          <div className="flex gap-3 font-mono text-[13px] text-muted-foreground">
            {totalTime > 0 && <span>{totalTime} min</span>}
            {Boolean(servings) && <span>Serves {servings}</span>}
          </div>
        )}
        {description && (
          <p className="line-clamp-2 font-sans text-sm leading-relaxed text-ink-600">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
