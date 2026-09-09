import type { Metadata } from 'next'

import { RelatedRecipes } from '@/blocks/RelatedRecipes/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RecipeDetails } from '@/components/RecipeDetails'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Recipe } from '@/payload-types'

import { RecipeHero } from '@/heros/RecipeHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { defaultLocale, locales, localizePath, otherLocale, type Locale } from '@/utilities/i18n'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const params: { locale: Locale; slug: string }[] = []

  for (const locale of locales) {
    const recipes = await payload.find({
      collection: 'recipes',
      draft: false,
      limit: 1000,
      locale,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    recipes.docs.forEach(({ slug }) => {
      if (slug) params.push({ locale, slug })
    })
  }

  return params
}

type Args = {
  params: Promise<{
    locale: Locale
    slug?: string
  }>
}

export default async function Recipe({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = localizePath(locale, '/recipes/' + decodedSlug)
  const recipe = await queryRecipeBySlug({ slug: decodedSlug, locale })

  if (!recipe) return <PayloadRedirects locale={locale} url={url} />

  const other = otherLocale(locale)
  const otherSlug = await queryRecipeSlugInLocale({ id: recipe.id, locale: other })
  const otherLocalePath = otherSlug
    ? localizePath(other, '/recipes/' + otherSlug)
    : localizePath(other, '/recipes')

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound locale={locale} url={url} />

      {draft && <LivePreviewListener />}

      <div className="container flex justify-end pt-4">
        <LocaleSwitcher currentLocale={locale} targetPath={otherLocalePath} />
      </div>

      <RecipeStructuredData recipe={recipe} />

      <RecipeHero locale={locale} recipe={recipe} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="max-w-[48rem] mx-auto"
            data={recipe.content}
            enableGutter={false}
            locale={locale}
          />

          <RecipeDetails
            className="mt-12"
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
          />

          {recipe.relatedRecipes && recipe.relatedRecipes.length > 0 && (
            <RelatedRecipes
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={recipe.relatedRecipes.filter((recipe) => typeof recipe === 'object')}
              locale={locale}
            />
          )}
        </div>
      </div>
    </article>
  )
}

const RecipeStructuredData: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { cookTime, ingredients, instructions, prepTime, publishedAt, servings, title } = recipe
  const description = recipe.meta?.description

  const image =
    recipe.heroImage && typeof recipe.heroImage === 'object' ? recipe.heroImage.url : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    description: description || undefined,
    image: image ? `${getServerSideURL()}${image}` : undefined,
    datePublished: publishedAt || undefined,
    recipeYield: servings ? `${servings} servings` : undefined,
    prepTime: prepTime ? `PT${prepTime}M` : undefined,
    cookTime: cookTime ? `PT${cookTime}M` : undefined,
    totalTime: prepTime || cookTime ? `PT${(prepTime || 0) + (cookTime || 0)}M` : undefined,
    recipeIngredient: ingredients?.map(({ amount, unit, item }) =>
      [amount, unit, item].filter(Boolean).join(' '),
    ),
    recipeInstructions: instructions?.map(({ step }) => ({
      '@type': 'HowToStep',
      text: step,
    })),
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      type="application/ld+json"
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const recipe = await queryRecipeBySlug({ slug: decodedSlug, locale })

  return generateMeta({ doc: recipe })
}

const queryRecipeBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const findBySlug = (queryLocale: Locale) =>
    payload.find({
      collection: 'recipes',
      draft,
      limit: 1,
      locale: queryLocale,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

  const result = await findBySlug(locale)
  if (result.docs?.[0]) return result.docs[0]

  // `where` matches against the requested locale's slug column directly, so
  // an untranslated slug (fallback: true only applies once a doc is found,
  // not to query filtering) won't match here. Retry against the default
  // locale's slug — this is the slug a fallback-rendered link would use —
  // then re-fetch by id so the returned doc's fields resolve for `locale`.
  if (locale !== defaultLocale) {
    const fallbackResult = await findBySlug(defaultLocale)
    const fallbackDoc = fallbackResult.docs?.[0]
    if (fallbackDoc) {
      return payload.findByID({
        id: fallbackDoc.id,
        collection: 'recipes',
        draft,
        locale,
        overrideAccess: draft,
      })
    }
  }

  return null
})

const queryRecipeSlugInLocale = cache(
  async ({ id, locale }: { id: number | string; locale: Locale }) => {
    const payload = await getPayload({ config: configPromise })

    const doc = await payload.findByID({
      id,
      collection: 'recipes',
      depth: 0,
      locale,
      select: {
        slug: true,
      },
    })

    return doc?.slug || null
  },
)
