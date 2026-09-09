import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import type { Locale } from '@/utilities/i18n'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale: Locale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const recipes = await payload.find({
    collection: 'recipes',
    depth: 1,
    limit: 12,
    locale,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      prepTime: true,
      cookTime: true,
      servings: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-10">
        <span className="kicker mb-3 block">Discover</span>
        <h1 className="font-serif text-4xl leading-[1.06] tracking-[-0.02em] text-foreground md:text-5xl">
          Recipes
        </h1>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="recipes"
          currentPage={recipes.page}
          limit={12}
          totalDocs={recipes.totalDocs}
        />
      </div>

      <CollectionArchive locale={locale} recipes={recipes.docs} />

      <div className="container">
        {recipes.totalPages > 1 && recipes.page && (
          <Pagination locale={locale} page={recipes.page} totalPages={recipes.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Recipes`,
  }
}
