import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { locales, localizePath } from '@/utilities/i18n'

const pagePath = (slug: string | undefined) => (slug === 'home' ? '/' : `/${slug}`)

/**
 * A publish can affect the rendered page in either locale (fallback content
 * included), so re-fetch the slug per locale and revalidate both paths.
 */
const revalidateAllLocalePaths = async ({ payload, id }: { id: number | string; payload: Payload }) => {
  await Promise.all(
    locales.map(async (locale) => {
      const localizedDoc = await payload
        .findByID({
          id,
          collection: 'pages',
          depth: 0,
          locale,
          select: { slug: true },
        })
        .catch(() => null)

      if (localizedDoc) {
        revalidatePath(localizePath(locale, pagePath(localizedDoc.slug)))
      }
    }),
  )
}

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating page ${doc.id} in all locales`)

      await revalidateAllLocalePaths({ payload, id: doc.id })
      revalidateTag('pages-sitemap', 'max')
    }

    // If the page was previously published, we need to revalidate the old
    // path too. `previousDoc` only carries the locale the request used, so
    // this covers that locale rather than every locale's old slug.
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = pagePath(previousDoc.slug)

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = pagePath(doc?.slug)
    revalidatePath(path)
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}
