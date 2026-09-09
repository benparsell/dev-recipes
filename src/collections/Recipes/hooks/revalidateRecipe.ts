import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Recipe } from '../../../payload-types'
import { locales, localizePath } from '@/utilities/i18n'

/**
 * A publish can affect the rendered page in either locale (fallback content
 * included), so re-fetch the slug per locale and revalidate both paths.
 */
const revalidateAllLocalePaths = async ({
  payload,
  id,
}: {
  id: number | string
  payload: Payload
}) => {
  await Promise.all(
    locales.map(async (locale) => {
      const localizedDoc = await payload
        .findByID({
          id,
          collection: 'recipes',
          depth: 0,
          locale,
          select: { slug: true },
        })
        .catch(() => null)

      if (localizedDoc?.slug) {
        revalidatePath(localizePath(locale, `/recipes/${localizedDoc.slug}`))
      }
    }),
  )
}

export const revalidateRecipe: CollectionAfterChangeHook<Recipe> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating recipe ${doc.id} in all locales`)

      await revalidateAllLocalePaths({ payload, id: doc.id })
      revalidateTag('recipes-sitemap', 'max')
    }

    // If the recipe was previously published, we need to revalidate the old
    // path too. `previousDoc` only carries the locale the request used, so
    // this covers that locale rather than every locale's old slug.
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/recipes/${previousDoc.slug}`

      payload.logger.info(`Revalidating old recipe at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('recipes-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Recipe> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/recipes/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('recipes-sitemap', 'max')
  }

  return doc
}
