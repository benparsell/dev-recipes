import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/utilities/i18n'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: Locale
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale, pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const recipes = await payload.find({
    collection: 'recipes',
    depth: 1,
    limit: 12,
    locale,
    page: sanitizedPageNumber,
    overrideAccess: false,
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
        {recipes?.page && recipes?.totalPages > 1 && (
          <Pagination locale={locale} page={recipes.page} totalPages={recipes.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Recipes Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'recipes',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { locale: Locale; pageNumber: string }[] = []

  for (const locale of locales) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push({ locale, pageNumber: String(i) })
    }
  }

  return pages
}
