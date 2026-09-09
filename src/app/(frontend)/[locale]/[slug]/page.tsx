import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { defaultLocale, locales, localizePath, type Locale } from '@/utilities/i18n'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const params: { locale: Locale; slug: string }[] = []

  for (const locale of locales) {
    const pages = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      locale,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    pages.docs
      ?.filter((doc) => doc.slug !== 'home')
      .forEach(({ slug }) => {
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

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = localizePath(locale, '/' + decodedSlug)
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects locale={locale} url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound locale={locale} url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const findBySlug = (queryLocale: Locale) =>
    payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      locale: queryLocale,
      pagination: false,
      overrideAccess: draft,
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
        collection: 'pages',
        draft,
        locale,
        overrideAccess: draft,
      })
    }
  }

  return null
})
