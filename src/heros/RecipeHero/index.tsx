import React from 'react'

import type { Recipe } from '@/payload-types'

import { Media } from '@/components/Media'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Stat } from '@/components/ui/stat'
import { formatAuthors } from '@/utilities/formatAuthors'
import { localizePath, type Locale } from '@/utilities/i18n'

export const RecipeHero: React.FC<{
  locale: Locale
  recipe: Recipe
}> = ({ locale, recipe }) => {
  const { categories, cookTime, heroImage, populatedAuthors, prepTime, servings, title } = recipe

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  const totalTime = (prepTime || 0) + (cookTime || 0)
  const categoryTitle =
    categories
      ?.map((category) => (typeof category === 'object' && category !== null ? category.title : null))
      .filter(Boolean)
      .join(', ') || null

  return (
    <div className="relative -mt-16 flex items-end" data-theme="dark">
      <div className="container z-10 relative pb-8 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]">
        <div className="col-span-1 col-start-1 md:col-span-2 md:col-start-2">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Recipes', href: localizePath(locale, '/recipes') },
              ...(categoryTitle ? [{ label: categoryTitle }] : []),
            ]}
          />

          <h1 className="mb-6 font-serif text-4xl leading-[1.06] tracking-[-0.02em] md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {hasAuthors && (
              <div className="flex flex-col items-start gap-1">
                <span className="kicker text-[rgba(253,251,247,.6)]">Recipe by</span>
                <span className="font-serif text-lg tracking-[-0.02em] text-white">
                  {formatAuthors(populatedAuthors)}
                </span>
              </div>
            )}
            {Boolean(prepTime) && <Stat label="Active time" value={prepTime} unit="min" />}
            {Boolean(cookTime) && <Stat label="Cook time" value={cookTime} unit="min" />}
            {totalTime > 0 && <Stat label="Total time" value={totalTime} unit="min" />}
            {Boolean(servings) && <Stat label="Servings" value={servings} />}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(20,17,9,.70)] via-[rgba(20,17,9,.15)] to-transparent" />
      </div>
    </div>
  )
}
