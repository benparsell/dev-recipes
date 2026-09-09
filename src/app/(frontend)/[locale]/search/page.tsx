import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardRecipeData } from '@/components/Card'
import type { Locale } from '@/utilities/i18n'

type Args = {
  params: Promise<{
    locale: Locale
  }>
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const { locale } = await paramsPromise
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const recipes = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16 text-center">
        <span className="kicker mb-3 block">Find a recipe</span>
        <h1 className="mb-8 font-serif text-4xl leading-[1.06] tracking-[-0.02em] text-foreground md:mb-12 md:text-5xl">
          Search
        </h1>

        <div className="mx-auto max-w-[50rem]">
          <Search />
        </div>
      </div>

      {recipes.totalDocs > 0 ? (
        <CollectionArchive locale={locale} recipes={recipes.docs as CardRecipeData[]} />
      ) : (
        <div className="container font-sans text-muted-foreground">Nothing matched that search — try another term.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Search`,
  }
}
